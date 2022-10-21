import React from "react";
import { ChatApiContext } from "./chat-provider";

export const useChatApi = () => {
  const ctx = React.useContext(ChatApiContext);

  if (!ctx) {
    throw new Error("useChatApi must be used within the ChatApiContext");
  }

  return ctx;
};
