import { useContext } from "react";
import { useChatApi, useChatState } from "src/components";
import {
  ChatApiContext,
  ChatApiContextInterface,
  ChatStateContext,
  ChatStateContextInterface,
} from "src/components/chat/chat-provider/chat-provider";

export interface UseChatUpdateHookInterface
  extends Pick<
    ChatApiContextInterface,
    "resetEditableConversation" | "setEditableConversation"
  > {}

export const useChatUpdateConversation =
  (): UseChatUpdateHookInterface => {
    const api = useChatApi();

    const { resetEditableConversation, setEditableConversation } = api;

    return { resetEditableConversation, setEditableConversation };
  };
