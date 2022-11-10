import { useChatApi, useChatState } from "src/components";
import {
  ChatApiContextInterface,
  ChatStateContextInterface,
} from "src/components/chat/chat-provider/chat-provider";
import { ChatMessageInterface } from "src/interfaces";

export interface UseChatEditMessageHookInterface
  extends Pick<ChatApiContextInterface, "setEditableMessage" | "editMessage">,
    Pick<ChatStateContextInterface, "editableMessage"> {
  editableMessageId: ChatMessageInterface["id"] | null;
}

export const useChatEditMessage = (): UseChatEditMessageHookInterface => {
  const api = useChatApi();
  const state = useChatState();

  const { setEditableMessage, editMessage } = api;
  const {
    editableMessage,
    messages: { editableId },
  } = state;

  return {
    setEditableMessage,
    editMessage,
    editableMessage,
    editableMessageId: editableId,
  };
};
