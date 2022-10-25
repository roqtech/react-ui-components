import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

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
    platformUrl: { control: "string" },
    platformToken: { control: "string" },
    userId: { control: "string" },
  },
} as ComponentMeta<typeof ChatConversations>;

const Template: ComponentStory<typeof ChatConversations> = ({
  secure,
  platformUrl,
  platformToken,
  userId,
  ...args
}) => (
  <ChatProvider
    secure
    platformUrl={platformUrl}
    platformToken={platformToken}
    userId={userId}
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
          marginTop: 20,
          gap: "14px",
          height: "100%",
          maxHeight: 788,
          display: "flex",
          boxSizing: "border-box",
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

export const Default = Template.bind({});
Default.args = {
  secure: true,
  platformUrl: process.env.PLATFORM_HOST,
  platformToken: process.env.PLATFORM_TOKEN,
  userId: process.env.ROQ_USER_ID ?? "",
};
