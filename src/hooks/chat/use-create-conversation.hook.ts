import { useContext } from "react";
import { useChatApi, useChatState } from "src/components";
import {
  ChatApiContext,
  ChatApiContextInterface,
  ChatStateContext,
  ChatStateContextInterface,
} from "src/components/chat/chat-provider/chat-provider";

export interface UseCreateConversationHookInterface
  extends Pick<ChatApiContextInterface, "createConversation"> {}

export const useCreateConversation =
  (): UseCreateConversationHookInterface => {
    const api = useChatApi();

    const { createConversation } = api;

    return { createConversation };
  };
