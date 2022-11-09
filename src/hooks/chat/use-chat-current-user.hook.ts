import { useChatState } from "src/components";
import { ChatStateContextInterface } from "src/components/chat/chat-provider/chat-provider";

export const useChatCurrentUser = (): ChatStateContextInterface["userId"] => {
  const state = useChatState();

  const { userId } = state;

  return userId;
};
