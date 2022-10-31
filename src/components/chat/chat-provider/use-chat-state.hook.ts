import React from "react";
import { ChatStateContext } from "./chat-provider";

export const useChatState = () => {
  const ctx = React.useContext(ChatStateContext);

  if (!ctx) {
    throw new Error("useChatState must be used within the ChatStateContext");
  }

  return ctx;
};
