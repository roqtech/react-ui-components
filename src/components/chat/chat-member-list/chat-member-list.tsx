import "./chat-member-list.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { withChatApi, withChatState } from "../chat-provider";
import { useInfiniteScroll } from "src/hooks";
import { ChatMembers } from "src/index";
import { ChatUserInterface, InfiniteListInterface } from "src/interfaces";
import { ChatMembersProps } from "../chat-members";
import { ChatFetchRecipientsVariablesInterface } from "src/interfaces/chat.interface";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-member-list";

export interface ChatMemberListPropsInterface
  extends Pick<ChatMembersProps, "members" | "selectedIds" | "onMemberSelect">,
    Omit<InfiniteListInterface<ChatUserInterface>, "data"> {
  filter: Pick<
    ChatFetchRecipientsVariablesInterface,
    "filter" | "ids" | "excludeIds" | "includeIds"
  >;
  initialLoad?: boolean;
  disabled?: boolean;
  onLoadMore: (query: ChatFetchRecipientsVariablesInterface) => void;
  onReset: () => void;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    list?: string;
    loader?: string;
  };
  components?: {
    Container?: ComponentType<any>;
    List?: ComponentType<ChatMemberListPropsInterface>;
    Loader?: ComponentType<any>;
  };
}

const ChatMemberList = (props: ChatMemberListPropsInterface) => {
  const { style, className, classNames, components } = props;
  const {
    filter,
    initialLoad = true,
    disabled = true,
    members,
    selectedIds,
    onMemberSelect,
    error,
    isLoading,
    hasMore,
    offset,
    limit,
    totalCount,
    loadedTotal,
    onLoadMore,
    onReset,
  } = props;

  const [initialized, setInitialized] = useState(false);

  const Container = components?.Container ?? "div";
  const List = components?.List ?? ChatMembers;
  const Loader = components?.Loader ?? "div";

  const handleReset = useCallback(() => onReset?.(), [onReset]);

  useEffect(
    function fetchInitialData() {
      if (disabled) {
        return;
      }

      if (!initialLoad) {
        return;
      }

      if (initialized) {
        return;
      }

      setInitialized(true);
      loadMore();
    },
    [disabled]
  );

  const loadMore = useCallback(() => {
    if (isLoading && !hasMore) {
      return;
    }

    if (!initialized) {
      return;
    }

    void onLoadMore?.({
      offset: loadedTotal,
      limit,
      ...filter,
    });
  }, [
    onLoadMore,
    isLoading,
    hasMore,
    limit,
    initialized,

    filter?.filter,
    filter?.ids,
    filter?.excludeIds,
    filter?.includeIds,
  ]);

  useEffect(function handleUnmount() {
    return () => {
      handleReset();
    };
  }, []);

  const showLoader = useMemo(() => isLoading || hasMore, [isLoading, hasMore]);

  const {
    refs: [infiniteRef, { rootRef }],
  } = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasMore,
    onLoadMore: loadMore,
    disabled: !!error || disabled,
  });

  const renderLoader = useCallback(() => {
    return (
      <Loader
        ref={infiniteRef}
        className={clsx(_CLASS_IS + "__list__loader", classNames?.loader)}
      >
        <span
          className={clsx(
            _CLASS_IS + "__list__loader__text",
            classNames?.loader
          )}
        >
          Loading...
        </span>
      </Loader>
    );
  }, [Loader, infiniteRef]);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
      ref={rootRef}
    >
      <List
        className={clsx(_CLASS_IS + "__list", classNames?.list)}
        members={members}
        selectedIds={selectedIds}
        onMemberSelect={onMemberSelect}
      >
        {showLoader && renderLoader()}
      </List>
    </Container>
  );
};

export default withChatState(
  ({
    online,
    recipients: {
      error,
      isLoading,
      hasMore,
      offset,
      limit,
      totalCount,
      loadedTotal,
      data,
      selectedIds,
      filter,
    } = {},
  }) => ({
    disabled: !online,
    error,
    isLoading,
    hasMore,
    offset,
    limit,
    totalCount,
    loadedTotal,
    members: data,
    selectedIds,
    filter,
  })
)(
  withChatApi(
    (
      { fetchRecipientList, resetRecipientList, setSelectedRecipients },
      { selectedIds }
    ) => ({
      onLoadMore: fetchRecipientList,
      onReset: resetRecipientList,
      onMemberSelect: (memberId) => {
        const isSelected = selectedIds.includes(memberId);
        const nextSelectedIds = isSelected
          ? selectedIds.filter((id) => id !== memberId)
          : [...selectedIds, memberId];

        setSelectedRecipients(nextSelectedIds);
      },
    })
  )(ChatMemberList)
);
