import { useChatApi, useChatState } from "src/components";
import {
  ChatApiContextInterface,
  INITIAL_CONVERSATIONS_STATE,
} from "src/components/chat/chat-provider/chat-provider";
import { ChatConversationListInterface } from "src/interfaces";

export interface UseChatFetchConversationsHookInterface
  extends Pick<ChatApiContextInterface, "fetchConversationList">,
    Omit<ChatConversationListInterface, "editableId"> {}

export const useChatFetchConversations = (): UseChatFetchConversationsHookInterface => {
  const api = useChatApi();
  const state = useChatState();

  const { fetchConversationList } = api;
  const {
    conversations: {
      error,
      isLoading,
      hasMore,
      offset,
      limit,
      totalCount,
      loadedTotal,
      data,
    } = INITIAL_CONVERSATIONS_STATE,
  } = state;

  return {
    fetchConversationList,
    error,
    isLoading,
    hasMore,
    offset,
    limit,
    totalCount,
    loadedTotal,
    data,
  };
};
