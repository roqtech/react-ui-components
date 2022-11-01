import { useContext } from "react";
import { useChatApi, useChatState } from "src/components";
import {
  ChatApiContext,
  ChatApiContextInterface,
  ChatStateContext,
  ChatStateContextInterface,
} from "src/components/chat/chat-provider/chat-provider";

export interface UseLeaveConversation
  extends Pick<ChatApiContextInterface, "leaveConversation"> {}

export const useLeaveConversationMembers = (): UseLeaveConversation => {
  const api = useChatApi();

  const { leaveConversation } = api;

  return { leaveConversation };
};
