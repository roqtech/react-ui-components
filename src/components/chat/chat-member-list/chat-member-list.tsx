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
import { ChatUserInterface, InfiniteListInterface } from "src/types";
import { ChatConversationListRequestPayloadInterface } from "src/utils/chat-socket.util";
import { ChatMembersProps } from "../chat-members";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-member-list";

export interface ChatMemberListProps
  extends Pick<ChatMembersProps, "members" | "selectedIds" | "onMemberSelect">,
    Omit<InfiniteListInterface<ChatUserInterface>, "data"> {
  initialLoad?: boolean;
  disabled?: boolean;
  onLoadMore: (query: ChatConversationListRequestPayloadInterface) => void;
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
    List?: ComponentType<ChatMemberListProps>;
    Loader?: ComponentType<any>;
  };
}

const ChatMemberList = (props: ChatMemberListProps) => {
  const { style, className, classNames, components } = props;
  const {
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

    void onLoadMore?.({
      offset: loadedTotal,
      limit,
      filter: "",
    });
  }, [onLoadMore, isLoading, hasMore, limit]);

  const handleReset = useCallback(() => onReset?.(), [onReset]);

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
  })
)(
  withChatApi(
    (
      { fetchRecipientList, resetSelectedRecipients, setSelectedRecipients },
      { selectedIds }
    ) => ({
      onLoadMore: fetchRecipientList,
      onReset: resetSelectedRecipients,
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
