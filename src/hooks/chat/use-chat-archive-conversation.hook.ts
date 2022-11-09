import { useChatApi } from "src/components";
import { ChatApiContextInterface } from "src/components/chat/chat-provider/chat-provider";

export interface UseChatArchiveConversationHookInterface
  extends Pick<ChatApiContextInterface, "archiveConversation"> {}

export const useChatArchiveConversation =
  (): UseChatArchiveConversationHookInterface => {
    const api = useChatApi();

    const { archiveConversation } = api;

    return { archiveConversation };
  };
