import React, { useState, useEffect } from "react";
import { RoqProvider, SocketProvider, ChatProvider } from "../../src";

export const chatArgTypes = {
  secure: { control: "boolean" },
  host: { control: "text" },
  token: { control: "text" },
  platformUrl: { control: "text" },
  userId: { control: "text" },
};

export const chatDefaultArgs = {
  userId: process.env.CHAT_USER_ID,
  userToken: process.env.CHAT_USER_TOKEN,
  host: process.env.CHAT_PLATFORM_URL,
  token: process.env.CHAT_PLATFORM_TOKEN,
  socketUrl: process.env.CHAT_SOCKET_URL,
};

export const ChatDecorator = (Story, context) => {
  const {
    args: { secure, host, token, socketUrl, userToken, userId },
  } = context;

  const [initialized, setInitialized] = useState(true);

  useEffect(() => {
    if (initialized) {
      setInitialized(false);
    }

    let t = setTimeout(() => {
      setInitialized(true);
    }, 300);

    return () => {
      clearTimeout(t);
    };
  }, [secure, host, token, socketUrl, userToken, userId]);

  if (!initialized) {
    return "Initializing...";
  }

  const config = {
    host,
    token,
    userToken,
  };

  return (
    <RoqProvider config={config}>
      <SocketProvider
        secure={secure}
        platformUrl={socketUrl}
        platformToken={config.token}
      >
        <ChatProvider userId={userId}>
          <Story />
        </ChatProvider>
      </SocketProvider>
    </RoqProvider>
  );
};
