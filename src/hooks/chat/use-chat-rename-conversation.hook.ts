import { useChatApi, useChatState } from "src/components";
import { ChatApiContextInterface } from "src/components/chat/chat-provider/chat-provider";
import { ChatConversationInterface } from "src/interfaces";

export interface UseRenameConversationHookInterface
  extends Pick<
    ChatApiContextInterface,
    "resetEditableConversation" | "renameConversation"
  > {
  editableConversationId: ChatConversationInterface["id"] | null;
}

export const useRenameConversation = (): UseRenameConversationHookInterface => {
  const api = useChatApi();
  const state = useChatState();

  const { resetEditableConversation, renameConversation } = api;
  const {
    conversations: { editableId },
  } = state;

  return {
    resetEditableConversation,
    renameConversation,
    editableConversationId: editableId,
  };
};
