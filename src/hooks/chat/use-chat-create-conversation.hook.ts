import { useChatApi } from "src/components";
import { ChatApiContextInterface } from "src/components/chat/chat-provider/chat-provider";

export interface UseChatCreateConversationHookInterface
  extends Pick<ChatApiContextInterface, "createConversation"> {}

export const useChatCreateConversation = (): UseChatCreateConversationHookInterface => {
  const api = useChatApi();

  const { createConversation } = api;

  return { createConversation };
};
