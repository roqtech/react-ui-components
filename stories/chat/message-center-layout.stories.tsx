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
        <ChatConversations conversations={args.conversations} />
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
        <ChatConversationHeader {...args.conversation} />
        <div
          style={{
            flexGrow: 1,
            minHeight: 1,
          }}
        >
          <ChatMessageHistory {...args.conversation} />
        </div>
        <ChatMessageInput />
      </div>
    </div>
  </ChatProvider>
);

export const Default = Template.bind({});
Default.args = {
  conversation: {
    title: "Marketing Chat Group",
    date: "2 minutes ago",
    message: `Hi! How it's going?`,
    members: [
      { name: "Mose Ewald", src: "https://i.pravatar.cc/60?img=15" },
      { name: "Susan Gomez", src: "https://i.pravatar.cc/60?img=1" },
      { name: "Piper Wong", src: "https://i.pravatar.cc/60?img=14" },
    ],
    messages: [
      {
        message: "Hello",
        showCorner: true,
        timestamp: new Date(),
        user: {
          name: "Mose Ewald",
          src: "https://i.pravatar.cc/60?img=15",
        },
        isSent: true,
      },
      {
        message: "Hi. Is there an updates?",
        showCorner: true,
        timestamp: new Date(),
        user: {
          name: "Susan Gomez",
          src: "https://i.pravatar.cc/60?img=1",
        },
      },
      {
        message: "Yeah, let`s sync up in 10m",
        showCorner: true,
        timestamp: new Date(),
        user: {
          name: "Piper Wong",
          src: "https://i.pravatar.cc/60?img=14",
        },
        isSent: true,
      },
      {
        message: "Sounds good",
        showCorner: true,
        showUser: false,
        timestamp: new Date(),
        user: {
          name: "Jared Brewer",
          src: "https://i.pravatar.cc/60?img=12",
        },
      },
      {
        message: "I'll let you know",
        showCorner: true,
        showUser: true,
        timestamp: new Date(),
        user: {
          name: "Jared Brewer",
          src: "https://i.pravatar.cc/60?img=12",
        },
      },
      {
        isSent: true,
        message: "haha!",
        showCorner: true,
        timestamp: new Date(),
        user: {
          name: "Susan Gomez",
          src: "https://i.pravatar.cc/60?img=1",
        },
      },
      {
        message: "Works well",
        showCorner: true,
        timestamp: new Date(),
        user: {
          name: "Piper Wong",
          src: "https://i.pravatar.cc/60?img=14",
        },
        isSent: true,
      },
    ],
  },
  conversations: [
    {
      title: "Marketing Chat Group",
      date: "2 minutes ago",
      message: `Hi! How it's going?`,
      members: [
        { name: "Mose Ewald", src: "https://i.pravatar.cc/60?img=15" },
        { name: "Susan Gomez", src: "https://i.pravatar.cc/60?img=1" },
        { name: "Piper Wong", src: "https://i.pravatar.cc/60?img=14" },
      ],
    },
    {
      title: "Susan Gomez",
      date: "2 minutes ago",
      message: `Hi! How it's going?`,
      members: [
        { name: "Susan Gomez", src: "https://i.pravatar.cc/60?img=1" },
        { name: "Piper Wong", src: "https://i.pravatar.cc/60?img=14" },
      ],
    },
    {
      title: "Release Discsusion",
      date: "2 minutes ago",
      message: `Hi! How it's going?`,
      members: [
        { name: "Piper Wong", src: "https://i.pravatar.cc/60?img=14" },
        { name: "Susan Gomez", src: "https://i.pravatar.cc/60?img=1" },
        { name: "Jared Brewer", src: "https://i.pravatar.cc/60?img=12" },
      ],
    },
  ],
};
