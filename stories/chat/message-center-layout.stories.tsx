import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import {
  ChatConversationHeader,
  ChatConversations,
  ChatMessageHistory,
  ChatMessageInput,
  ChatProvider,
} from "../../src";

export default {
  title: "Roq Components/Chat/Examples/Message Center",
  component: ChatConversations,
  argTypes: {},
} as ComponentMeta<typeof ChatConversations>;

const Template: ComponentStory<typeof ChatConversations> = (args) => (
  <ChatProvider>
    <div
      style={{
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
  </ChatProvider>
);

export const Default = Template.bind({});
Default.args = {};
