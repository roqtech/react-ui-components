import { useChatApi } from "src/components";
import { ChatApiContextInterface } from "src/components/chat/chat-provider/chat-provider";

export interface UseChatSendMessageHookInterface
  extends Pick<ChatApiContextInterface, "sendMessage"> {}

export const useChatSendMessage =
  (): UseChatSendMessageHookInterface => {
    const api = useChatApi();

    const { sendMessage } = api;

    return { sendMessage };
  };
