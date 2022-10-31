import { useContext } from "react";
import { useChatApi, useChatState } from "src/components";
import {
  ChatApiContext,
  ChatApiContextInterface,
  ChatStateContext,
  ChatStateContextInterface,
} from "src/components/chat/chat-provider/chat-provider";

export interface UseCurrentConversationHookInterface
  extends Pick<
      ChatStateContextInterface,
      "currentConversationId" | "currentConversation"
    >,
    Pick<ChatApiContextInterface, "selectConversation"> {}

export const useCurrentConversation =
  (): UseCurrentConversationHookInterface => {
    const api = useChatApi();
    const state = useChatState();

    const { selectConversation } = api;
    const { currentConversationId, currentConversation } = state;

    return { currentConversationId, currentConversation, selectConversation };
  };
