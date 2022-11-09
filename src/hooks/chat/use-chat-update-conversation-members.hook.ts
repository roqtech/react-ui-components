import { useChatApi } from "src/components";
import { ChatApiContextInterface } from "src/components/chat/chat-provider/chat-provider";

export interface UseChatUpdateConversationHookInterface
  extends Pick<ChatApiContextInterface, "updateConversationMembers"> {}

export const useChatUpdateConversationMembers =
  (): UseChatUpdateConversationHookInterface => {
    const api = useChatApi();

    const { updateConversationMembers } = api;

    return { updateConversationMembers };
  };
