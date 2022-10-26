import { ComponentMeta, ComponentStory } from "@storybook/react";
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
} from "../../src";

export default {
  title: "Roq Components/Chat/Examples/Message Center",
  component: ChatConversations,
  argTypes: {
    secure: { control: "boolean" },
    platformUrl: { control: "text" },
    platformToken: { control: "text" },
    userId: { control: "text" },
  },
} as ComponentMeta<typeof ChatConversations>;

const Template: ComponentStory<typeof ChatConversations> = ({
  secure,
  platformUrl,
  platformToken,
  userId,
  ...args
}) => {
  const [_secure, setSecure] = useState(secure);
  const [_platformUrl, setPlatformUrl] = useState(platformUrl);
  const [_platformToken, setPlatformToken] = useState(platformToken);
  const [_userId, setUserId] = useState(userId);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    console.log("update args");
    if (initialized) {
      setInitialized(false);
    }

    setSecure(secure);
    setPlatformUrl(platformUrl);
    setPlatformToken(platformToken);
    setUserId(userId);

    let t = setTimeout(() => {
      debugger;
      setInitialized(true);
    }, 300);

    return () => {
      clearTimeout(t);
    };
  }, [secure, platformUrl, platformToken, userId]);

  if (!initialized) {
    return "Initializing...";
  }

  return (
    <ChatProvider
      secure
      platformUrl={_platformUrl}
      platformToken={_platformToken}
      userId={_userId}
    >
      <section
        style={{
          backgroundColor: "#f1f5f8",
        }}
      >
        <div
          style={{
            height: "60px",
            background: "rgb(250, 250, 250)",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "4px 12px",
          }}
        >
          <ChatNotificationBell />
        </div>
        <div
          style={{
            gap: "24px",
            height: "calc(100vh - 250px)",
            display: "flex",
            boxSizing: "border-box",
            marginTop: "24px",
            alignItems: "stretch",
            flexDirection: "row",
            padding: 20,
          }}
        >
          <div style={{ width: 400 }}>
            <ChatConversationList />
          </div>
          <ChatPanel>
            <ChatConversationHeader />
            <div
              style={{
                flexGrow: 1,
                minHeight: 1,
              }}
            >
              <ChatMessageList />
            </div>
            <ChatMessageInput />
          </ChatPanel>
        </div>
      </section>
    </ChatProvider>
  );
};

const MOCKED_PLATFORM_HOST =
  "https://roq-core-snapshot-gateway.roq-platform.com/v01/";
const MOCKED_PLATFORM_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6IkNIQU5HRV9NRV8yIiwidXNlcklkIjoiNDhhODJjMDMtM2ZhYy00YzRmLTk2NjMtYjA0MGI5MzIwZDI0IiwiaWF0IjoxNjY2Njk5NTE2LCJleHAiOjE2NjY3ODU5MTZ9.DZrLQ1Ltq2Ez9j3cpowqAwc7vzK10E-gMLKsB-aBiFY";
const MOCKED_ROQ_USER_ID = "48a82c03-3fac-4c4f-9663-b040b9320d24";

export const Default = Template.bind({});
Default.args = {
  secure: true,
  platformUrl: process.env.PLATFORM_HOST ?? MOCKED_PLATFORM_HOST,
  platformToken: process.env.PLATFORM_TOKEN ?? MOCKED_PLATFORM_TOKEN,
  userId: process.env.ROQ_USER_ID ?? MOCKED_ROQ_USER_ID,
};
