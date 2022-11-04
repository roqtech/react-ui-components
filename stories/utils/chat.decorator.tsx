import React, { useState, useEffect } from "react";
import { RoqProvider, SocketProvider, ChatProvider } from "../../src";

export const chatArgTypes = {
  secure: { control: "boolean" },
  host: { control: "text" },
  token: { control: "text" },
  platformUrl: { control: "text" },
  userId: { control: "text" },
};

const MOCKED_CHAT_USER_ID = "48a82c03-3fac-4c4f-9663-b040b9320d24";
const MOCKED_CHAT_USER_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZGFhMzU3LWQ4OWMtNGQ0ZS1iNWQ1LTRhZjU0ODk4MDNkMiIsInJvcUlkZW50aWZpZXIiOiI0OGE4MmMwMy0zZmFjLTRjNGYtOTY2My1iMDQwYjkzMjBkMjQiLCJpYXQiOjE2Njc1NjkwMzgsImV4cCI6MTY2NzU3MjYzOH0.5dyh8ybvyPCPHiebvATOkaITZkxwfnbl0l66GUQrOTs";
const MOCKED_CHAT_PLATFORM_URL =
  "https://roq-core-snapshot-backend.roq-one.com/graphql";
const MOCKED_CHAT_PLATFORM_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6IkNIQU5HRV9NRV8yIiwidXNlcklkIjoiNDhhODJjMDMtM2ZhYy00YzRmLTk2NjMtYjA0MGI5MzIwZDI0IiwiaWF0IjoxNjY3NTY0NTY5LCJleHAiOjE2Njc2NTA5Njl9.AoOcVgQQy1xGth5BeJ-MBm1QGK_FOA9ZltOHin_4Nt8";
const MOCKED_CHAT_SOCKET_URL =
  "https://roq-core-snapshot-gateway.roq-platform.com/v01/";

export const chatDefaultArgs = {
  userId: process.env.CHAT_USER_ID ?? MOCKED_CHAT_USER_ID,
  userToken: process.env.CHAT_USER_TOKEN ?? MOCKED_CHAT_USER_TOKEN,
  host: process.env.CHAT_PLATFORM_URL ?? MOCKED_CHAT_PLATFORM_URL,
  token: process.env.CHAT_PLATFORM_TOKEN ?? MOCKED_CHAT_PLATFORM_TOKEN,
  socketUrl: process.env.CHAT_SOCKET_URL ?? MOCKED_CHAT_SOCKET_URL,
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
