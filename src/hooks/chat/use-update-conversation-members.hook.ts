import { useContext } from "react";
import { useChatApi, useChatState } from "src/components";
import {
  ChatApiContext,
  ChatApiContextInterface,
  ChatStateContext,
  ChatStateContextInterface,
} from "src/components/chat/chat-provider/chat-provider";

export interface UseUpdateConversationHookInterface
  extends Pick<ChatApiContextInterface, "updateConversationMembers"> {}

export const useUpdateConversationMembers =
  (): UseUpdateConversationHookInterface => {
    const api = useChatApi();

    const { updateConversationMembers } = api;

    return { updateConversationMembers };
  };
