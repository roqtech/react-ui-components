import "./chat-conversation-list.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  useCallback,
  useMemo,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import {
  ChatConversationCard,
  ChatConversationCardProps,
} from "../chat-conversation-card";
import { withChatApi, withChatState } from "../chat-provider";
import { useInfiniteScroll } from "src/hooks";
import { ChatConversations } from "src/index";
import { ChatConversationsProps } from "../chat-conversations";
import { ChatConversationInterface, InfiniteListInterface } from "src/types";
import {
  ChatConversationListRequestPayloadInterface,
  ChatFetchMessagesRequestPayloadInterface,
} from "src/utils/chat-socket.util";
import { ChatConversationMenuProps } from "../chat-conversation-menu";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-list";

export interface ChatConversationListProps
  extends Pick<
      ChatConversationsProps,
      "conversations" | "selectedConversationId" | "onConversationSelect"
    >,
    Omit<InfiniteListInterface<ChatConversationInterface>, "data"> {
  conversations: InfiniteListInterface<ChatConversationInterface>["data"];
  currentConversationId: string;
  initialLoad?: boolean;
  disabled?: boolean;
  onLoadMore: (query: ChatConversationListRequestPayloadInterface) => void;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    list?: string;
    loader?: string;
  };
  components?: {
    Container?: ComponentType<any>;
    List?: ComponentType<ChatConversationsProps>;
    Loader?: ComponentType<any>;
    ConversationMenu?: ComponentType<ChatConversationMenuProps>;
  };
}

const ChatConversationList = (props: ChatConversationListProps) => {
  const { style, className, classNames, components } = props;
  const {
    initialLoad = true,
    disabled = true,
    conversations,
    currentConversationId,
    error,
    isLoading,
    hasMore,
    offset,
    limit,
    totalCount,
    loadedTotal,
    onLoadMore,
    onConversationSelect,
  } = props;

  const [initialized, setInitialized] = useState(false);

  const Container = components?.Container ?? "div";
  const List = components?.List ?? ChatConversations;
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
        conversations={conversations}
        selectedConversationId={currentConversationId}
        onConversationSelect={onConversationSelect}
        components={{
          ConversationMenu: components?.ConversationMenu,
        }}
      >
        {showLoader && renderLoader()}
      </List>
    </Container>
  );
};
export default withChatApi<ChatConversationListProps>(
  ({ fetchConversationList, selectConversation }) => ({
    onLoadMore: fetchConversationList,
    onConversationSelect: selectConversation,
  })
)(
  withChatState(
    ({
      online,
      conversations: {
        error,
        isLoading,
        hasMore,
        offset,
        limit,
        totalCount,
        loadedTotal,
        data,
      } = {},
      currentConversationId,
    }) => ({
      disabled: !online,
      error,
      isLoading,
      hasMore,
      offset,
      limit,
      totalCount,
      loadedTotal,
      conversations: data,
      currentConversationId,
    })
  )(ChatConversationList)
);
