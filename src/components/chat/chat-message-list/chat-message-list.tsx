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
    thresholdBottom = 300,
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
  } = props;

  const [initialized, setInitialized] = useState(false);

  const Container = components?.Container ?? "div";
  const List = components?.List ?? ChatMessageHistory;
  const Loader = components?.Loader ?? "div";

  useEffect(() => {
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

  const readMessages = useCallback(() => {
    console.log("bottom!");
  }, []);

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

    if (!hasMore) {
      readMessages();
    }
  }, [conversationId]);

  // We keep the scroll position when new items are added etc.
  useEffect(() => {
    console.log("heehe");
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToBottom =
      lastScrollDistanceToBottomRef.current ?? 0;
    if (scrollableRoot) {
      scrollableRoot.scrollTop =
        scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
    }

    if (lastScrollDistanceToBottom <= thresholdBottom) {
      readMessages();
    }
  }, [loadedTotal, rootRef]);

  const rootRefSetter = React.useCallback(
    (node: HTMLDivElement) => {
      debugger;
      rootRef(node);
      scrollableRootRef.current = node;
    },
    [rootRef]
  );

  const handleRootScroll = React.useCallback(() => {
    console.log("ok!");
    const rootNode = scrollableRootRef.current;
    if (rootNode) {
      const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop;
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

export default withChatApi(({ fetchMessageList, selectConversation }) => ({
  onLoadMore: fetchMessageList,
}))(
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
