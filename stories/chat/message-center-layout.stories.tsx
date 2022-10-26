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

export const Default = Template.bind({});
Default.args = {
  secure: true,
  platformUrl: process.env.PLATFORM_HOST,
  platformToken: process.env.PLATFORM_TOKEN,
  userId: process.env.ROQ_USER_ID ?? "",
};
