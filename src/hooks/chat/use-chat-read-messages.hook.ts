import { useChatApi, useChatState } from "src/components";
import { ChatApiContextInterface } from "src/components/chat/chat-provider/chat-provider";
import { ChatMessageListInterface } from "src/interfaces";

export interface UseChatReadMessagesHookInterface
  extends Pick<ChatApiContextInterface, "markAsReadUnreadConversationMessages">,
    Pick<ChatMessageListInterface, "lastTimestamp"> {}

export const useChatReadMessages = (): UseChatReadMessagesHookInterface => {
  const api = useChatApi();
  const state = useChatState();

  const { markAsReadUnreadConversationMessages } = api;
  const {
    messages: { lastTimestamp },
  } = state;

  return {
    markAsReadUnreadConversationMessages,
    lastTimestamp,
  };
};
