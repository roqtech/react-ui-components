import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Token } from "graphql";
import React, { useEffect, useState } from "react";

import {
  ChatConversationHeader,
  ChatConversations,
  ChatMessageInput,
  ChatProvider,
  ChatNotificationBell,
  ChatConversationList,
  ChatMessageList,
  ChatPanel,
  MessageCenter,
  SocketProvider,
  RoqProvider,
} from "../../src";

export default {
  title: "Roq Components/Chat/Message Center",
  component: ChatConversations,
  argTypes: {
    secure: { control: "boolean" },
    host: { control: "text" },
    token: { control: "text" },
    platformUrl: { control: "text" },
    userId: { control: "text" },
  },
} as ComponentMeta<typeof ChatConversations>;

const Template: ComponentStory<typeof ChatConversations> = ({
  secure,
  host,
  token,
  socketUrl,
  userToken,
  userId,
  ...args
}) => {
  const [initialized, setInitialized] = useState(false);

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
          <div
            style={{
              backgroundColor: "#E5E5E5",
              height: "calc(100vh - 40px)",
              minHeight: "700px",
              boxSizing: "border-box",
              padding: 24,
            }}
          >
            <MessageCenter />
          </div>
        </ChatProvider>
      </SocketProvider>
    </RoqProvider>
  );
};

const MOCKED_USER_ID = "48a82c03-3fac-4c4f-9663-b040b9320d24";
const MOCKED_PLATFORM_URL =
  "https://roq-core-snapshot-gateway.roq-platform.com/v01/";
const MOCKED_PLATFORM_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6IkNIQU5HRV9NRV8yIiwidXNlcklkIjoiNGZmZjNhY2EtMDEyNS00ZWJhLThiYWYtODY2ZWZmMzYwNGNjIiwiaWF0IjoxNjY3Mjk1NjY1LCJleHAiOjE2NjczODIwNjV9.6ClV9JYxskFsAeXIXwG6AEICj7TH8Xu7yS9SiH9Ktdw";

const MOCKED_USER_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2ODc2MjU2LTg0NjItNDljZC1hNzk4LTRlZTVhYWNkMmI5OCIsInJvcUlkZW50aWZpZXIiOiI0ZmZmM2FjYS0wMTI1LTRlYmEtOGJhZi04NjZlZmYzNjA0Y2MiLCJpYXQiOjE2NjczMDgxMzQsImV4cCI6MTY2NzMxMTczNH0.o0w4254pLXTxuBIvG9FZaHfOqnE6twGCoGjTlJsHb94";

export const Default = Template.bind({});
Default.args = {
  secure: true,
  host: (process.env.STORYBOOK_PLATFORM_GRAPHQL ?? "").replace(
    "v01/server",
    ""
  ),
  token: process.env.STORYBOOK_PLATFORM_TOKEN ?? MOCKED_PLATFORM_TOKEN,
  socketUrl: (process.env.PLATFORM_HOST ?? MOCKED_PLATFORM_URL).replace(
    "graphql",
    "v01/"
  ),
  userToken: MOCKED_USER_TOKEN ?? "",
  userId: process.env.ROQ_USER_ID ?? MOCKED_USER_ID,
};
