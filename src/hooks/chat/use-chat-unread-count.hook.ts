import { useChatState } from "src/components";
import { ChatStateContextInterface } from "src/components/chat/chat-provider/chat-provider";

export const useChatUnreadCount =
  (): ChatStateContextInterface["unreadCount"] => {
    const state = useChatState();

    const { unreadCount } = state;

    return unreadCount;
  };
