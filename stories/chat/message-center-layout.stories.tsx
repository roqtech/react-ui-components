import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import {
  ChatConversationHeader,
  ChatConversations,
  ChatMessageHistory,
  ChatMessageInput,
  ChatProvider,
  ChatNotificationBell,
} from "../../src";

export default {
  title: "Roq Components/Chat/Examples/Message Center",
  component: ChatConversations,
  argTypes: {},
} as ComponentMeta<typeof ChatConversations>;

const Template: ComponentStory<typeof ChatConversations> = (args) => (
  <section>
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
        maxHeight: 400,
        display: "flex",
        boxSizing: "border-box",
        alignItems: "stretch",
        flexDirection: "row",
      }}
    >
      <div style={{ width: 300 }}>
        <ChatConversations />
      </div>
      <div
        style={{
          flexGrow: 1,
          minWidth: 0,
          border: `1px solid #e2e8f0`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatConversationHeader />
        <div
          style={{
            flexGrow: 1,
            minHeight: 1,
          }}
        >
          <ChatMessageHistory />
        </div>
        <ChatMessageInput />
      </div>
    </div>
  </section>
);

export const Default = Template.bind({});
Default.args = {};
