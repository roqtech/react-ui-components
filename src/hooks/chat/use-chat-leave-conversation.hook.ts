import { useChatApi } from "src/components";
import { ChatApiContextInterface } from "src/components/chat/chat-provider/chat-provider";

export interface UseChatLeaveConversationHook
  extends Pick<ChatApiContextInterface, "leaveConversation"> {}

export const useChatLeaveConversation = (): UseChatLeaveConversationHook => {
  const api = useChatApi();

  const { leaveConversation } = api;

  return { leaveConversation };
};
