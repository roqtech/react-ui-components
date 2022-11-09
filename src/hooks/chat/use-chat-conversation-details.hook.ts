import { useChatApi } from "src/components";
import { ChatApiContextInterface } from "src/components/chat/chat-provider/chat-provider";

export interface UseChatGetConversationDetailsHookInterface
  extends Pick<ChatApiContextInterface, "getConversationDetails"> {}

export const useChatGetCoversationDetails =
  (): UseChatGetConversationDetailsHookInterface => {
    const api = useChatApi();

    const { getConversationDetails } = api;

    return { getConversationDetails };
  };
