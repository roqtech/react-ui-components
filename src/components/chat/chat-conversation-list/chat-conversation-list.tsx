import "./chat-conversation-list.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  useCallback,
  useMemo,
  useEffect,
  useState,
  HTMLAttributes,
  Ref,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { withChatApi, withChatState } from "../chat-provider";
import { useInfiniteScroll } from "src/hooks";
import {
  ChatConversationCardSkeleton,
  ChatConversations,
  Panel,
} from "src/index";
import { ChatConversationsPropsInterface } from "../chat-conversations";
import {
  ChatConversationInterface,
  InfiniteListInterface,
} from "src/interfaces";
import { ChatConversationListRequestPayloadInterface } from "src/interfaces/chat.interface";
import { ChatConversationMenuPropsInterface } from "../chat-conversation-menu";
import { ChatConversationCardSkeletonPropsInterface } from "../chat-conversation-card-skeleton";
import { useRoqTranslation } from "src/components/core/roq-provider";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-list";

export interface ChatConversationListPropsInterface
  extends Pick<
      ChatConversationsPropsInterface,
      "conversations" | "selectedConversationId" | "onConversationSelect"
    >,
    Omit<InfiniteListInterface<ChatConversationInterface>, "data"> {
  conversations: InfiniteListInterface<ChatConversationInterface>["data"];
  currentConversationId?: string;
  initialLoad?: boolean;
  disabled?: boolean;
  onLoadMore: (query: ChatConversationListRequestPayloadInterface) => void;
  loadingLabel?: string;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    list?: string;
    loader?: string;
  };
  components?: {
    Container?: ComponentType<
      Pick<HTMLAttributes<HTMLDivElement>, "style" | "className">
    >;
    List?: ComponentType<
      Pick<
        ChatConversationsPropsInterface,
        | "className"
        | "conversations"
        | "selectedConversationId"
        | "onConversationSelect"
        | "components"
        | "children"
      >
    >;
    Loader?: ComponentType<
      Pick<
        ChatConversationCardSkeletonPropsInterface,
        "className" | "children"
      > & {
        ref: Ref<HTMLElement>;
      }
    >;
    ConversationMenu?: ComponentType<ChatConversationMenuPropsInterface>;
  };
}

const ChatConversationList = (props: ChatConversationListPropsInterface) => {
  const { t } = useRoqTranslation();
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
    loadingLabel,
  } = props;

  const [initialized, setInitialized] = useState(false);

  const Container = components?.Container ?? "div";
  const List = components?.List ?? ChatConversations;
  const Loader = components?.Loader ?? ChatConversationCardSkeleton;

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
          {loadingLabel ?? t("chat.conversation-list.loading")}
        </span>
      </Loader>
    );
  }, [Loader, infiniteRef, loadingLabel, t]);

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

export default withChatApi<ChatConversationListPropsInterface>(
  ({ fetchConversationList, selectConversation }) => ({
    onLoadMore: fetchConversationList,
    onConversationSelect: selectConversation,
  })
)(
  withChatState<ChatConversationListPropsInterface>(
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
