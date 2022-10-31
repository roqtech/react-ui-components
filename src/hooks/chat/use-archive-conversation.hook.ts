import { useContext } from "react";
import { useChatApi, useChatState } from "src/components";
import {
  ChatApiContext,
  ChatApiContextInterface,
  ChatStateContext,
  ChatStateContextInterface,
} from "src/components/chat/chat-provider/chat-provider";

export interface UseCurrentConversationHookInterface
  extends Pick<ChatApiContextInterface, "archiveConversation"> {}

export const useArchiveConversation =
  (): UseCurrentConversationHookInterface => {
    const api = useChatApi();

    const { archiveConversation } = api;

    return { archiveConversation };
  };
