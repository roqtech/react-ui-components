import { useChatApi, useChatState } from "src/components";
import {
  ChatApiContextInterface,
  ChatStateContextInterface,
} from "src/components/chat/chat-provider/chat-provider";

export interface UseChatCurrentConversationHookInterface
  extends Pick<ChatApiContextInterface, "selectConversation">,
    Pick<
      ChatStateContextInterface,
      "currentConversation" | "currentConversationId"
    > {}

export const useChatCurrentConversation =
  (): UseChatCurrentConversationHookInterface => {
    const api = useChatApi();
    const state = useChatState();

    const { selectConversation } = api;
    const { currentConversation, currentConversationId } = state;

    return { selectConversation, currentConversation, currentConversationId };
  };
