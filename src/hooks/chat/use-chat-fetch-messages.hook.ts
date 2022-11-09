import { useChatApi, useChatState } from "src/components";
import {
  ChatApiContextInterface,
  ChatStateContextInterface,
  INITIAL_CONVERSATIONS_STATE,
  INITIAL_MESSAGES_STATE,
} from "src/components/chat/chat-provider/chat-provider";
import { ChatMessageListInterface } from "src/interfaces";

export interface UseChatFetchMessagesHookInterface
  extends Pick<ChatApiContextInterface, "fetchMessageList">,
    Omit<ChatMessageListInterface, "editableId" | "lastTimestamp"> {}

export const useChatFetchMessages = (): UseChatFetchMessagesHookInterface => {
  const api = useChatApi();
  const state = useChatState();

  const { fetchMessageList } = api;
  const {
    messages: {
      error,
      isLoading,
      hasMore,
      offset,
      limit,
      totalCount,
      loadedTotal,
      data,
    } = INITIAL_MESSAGES_STATE,
  } = state;

  return {
    fetchMessageList,
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
