import { useContext } from "react";
import { useChatApi, useChatState } from "src/components";
import {
  ChatApiContext,
  ChatApiContextInterface,
  ChatStateContext,
  ChatStateContextInterface,
} from "src/components/chat/chat-provider/chat-provider";

export interface UseArchiveConversationHookInterface
  extends Pick<ChatApiContextInterface, "archiveConversation"> {}

export const useArchiveConversation =
  (): UseArchiveConversationHookInterface => {
    const api = useChatApi();

    const { archiveConversation } = api;

    return { archiveConversation };
  };
