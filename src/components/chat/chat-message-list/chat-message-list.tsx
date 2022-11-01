import "./chat-message-list.scss";

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
import { useInfiniteScroll, useScrollControl } from "src/hooks";
import { ChatConversations } from "src/index";
import { ChatConversationsProps } from "../chat-conversations";
import {
  ChatConversationInterface,
  ChatMessageInterface,
  InfiniteListInterface,
} from "src/types";
import {
  ChatConversationListRequestPayloadInterface,
  ChatFetchMessagesRequestPayloadInterface,
} from "src/utils/chat-socket.util";
import {
  ChatMessageHistory,
  ChatMessageHistoryProps,
} from "../chat-message-history";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message-list";

export interface ChatMessageListProps
  extends Pick<ChatMessageHistoryProps, "conversationId" | "messages">,
    Omit<InfiniteListInterface<ChatMessageInterface>, "data"> {
  initialLoad?: boolean;
  disabled?: boolean;
  thresholdBottom?: number;
  onLoadMore?: (query: ChatFetchMessagesRequestPayloadInterface) => void;
  onReset?: () => void;
  onScrollBottom?: () => void;
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
  };
}

const ChatMessageList = (props: ChatMessageListProps) => {
  const { style, className, classNames, components } = props;
  const {
    initialLoad = true,
    disabled = true,
    thresholdBottom = 200,
    messages,
    conversationId,
    error,
    isLoading,
    hasMore,
    offset,
    limit,
    totalCount,
    loadedTotal,
    onLoadMore,
    onReset,
    onScrollBottom,
  } = props;

  const Container = components?.Container ?? "div";
  const List = components?.List ?? ChatMessageHistory;
  const Loader = components?.Loader ?? "div";

  const handleReadMessages = useCallback(() => {
    console.log("handleReadMessages");
    if (loadedTotal === 0) {
      return;
    }

    onScrollBottom?.();
  }, [onScrollBottom, loadedTotal]);

  useEffect(() => {
    onReset?.();
    loadMore(true);
  }, [conversationId]);

  const loadMore = useCallback(
    (reset?: boolean) => {
      if (isLoading && !hasMore) {
        return;
      }

      void onLoadMore?.({
        offset: loadedTotal,
        limit,
        conversationId,
        reset,
      });
    },
    [onLoadMore, isLoading, hasMore, limit, conversationId]
  );

  const showLoader = useMemo(() => hasMore && !isLoading, [isLoading, hasMore]);

  const {
    refs: [infiniteRef, { rootRef }],
  } = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasMore,
    onLoadMore: loadMore,
    disabled: !!error || disabled,
    rootMargin: `${thresholdBottom}px 0px 0px 0px`,
  });

  const scrollableRootRef = React.useRef<HTMLDivElement | null>(null);
  const lastScrollDistanceToBottomRef = React.useRef<number>();

  useEffect(() => {
    lastScrollDistanceToBottomRef.current = 0;

    const rootNode = scrollableRootRef.current;
    if (rootNode) {
      rootNode.scrollTop = 0;
    }

    if (!hasMore) {
      handleReadMessages();
    }
  }, [conversationId]);

  // We keep the scroll position when new items are added etc.
  useEffect(() => {
    const scrollableRoot = scrollableRootRef.current;

    if (!scrollableRoot) {
      return;
    }

    const lastScrollDistanceToBottom =
      lastScrollDistanceToBottomRef.current ?? 0;

    if (scrollableRoot) {
      const height = scrollableRoot.scrollHeight - scrollableRoot.clientHeight;
      scrollableRoot.scrollTop = height - lastScrollDistanceToBottom;
    }

    if (lastScrollDistanceToBottom <= thresholdBottom) {
      handleReadMessages();
    }
  }, [loadedTotal, rootRef]);

  const rootRefSetter = React.useCallback(
    (node: HTMLDivElement) => {
      if (scrollableRootRef.current) {
        return;
      }

      rootRef(node);
      scrollableRootRef.current = node;
    },
    [rootRef]
  );

  const handleRootScroll = React.useCallback(() => {
    const rootNode = scrollableRootRef.current;
    if (rootNode) {
      const height = rootNode.scrollHeight - rootNode.clientHeight;

      const scrollDistanceToBottom = height - rootNode.scrollTop;
      lastScrollDistanceToBottomRef.current = scrollDistanceToBottom;
    }
  }, []);

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
        messages={messages}
        selectedConversationId={conversationId}
        ref={rootRefSetter}
        onScroll={handleRootScroll}
      >
        {showLoader && renderLoader()}
      </List>
    </Container>
  );
};

export default withChatApi(
  ({
    fetchMessageList,
    resetMessageList,
    markAsReadUnreadConversationMessages,
  }) => ({
    onLoadMore: fetchMessageList,
    onReset: resetMessageList,
    onScrollBottom: markAsReadUnreadConversationMessages,
  })
)(
  withChatState(
    ({
      online,
      messages: {
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
      messages: data,
      conversationId: currentConversationId,
    })
  )(ChatMessageList)
);
