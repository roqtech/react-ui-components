import { useMemo } from "react";
import { useChatApi } from "src/components";
import { ChatUserPresenceInterface } from "src/interfaces";

export const useChatUserPresence = (
  userId: string
): ChatUserPresenceInterface["isOnline"] => {
  const api = useChatApi();

  const { getUserPresence } = api;

  const isOnline = useMemo(
    () => getUserPresence(userId),
    [userId, getUserPresence]
  );

  return isOnline;
};
