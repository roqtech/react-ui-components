import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import uniqueId from "lodash/uniqueId";

import { ChatMessageHistory } from "../../../../src";

export default {
  title: "Roq Components/Chat/ChatWindow/ChatMessageList/ChatMessageHistory",
  component: ChatMessageHistory,
  argTypes: {
    isEmpty: { control: "boolean" },
    emptyMessage: { control: "text" },
  },
} as ComponentMeta<typeof ChatMessageHistory>;

const Template: ComponentStory<typeof ChatMessageHistory> = (args) => (
  <div style={{ width: 520, height: 600 }}>
    <ChatMessageHistory {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  isEmpty: false,
  messages: [
    {
      id: uniqueId(),
      body: "Hello",
      createdAt: new Date(),
      user: {
        fullName: "Mose Ewald",
        avatar: "https://i.pravatar.cc/60?img=15",
      },
      isSent: true,
    },
    {
      id: uniqueId(),
      body: "Hi. Is there an updates?",
      createdAt: new Date(),
      user: {
        fullName: "Susan Gomez",
        avatar: "https://i.pravatar.cc/60?img=1",
      },
    },
    {
      id: uniqueId(),
      body: "Yeah, let`s sync up in 10m",
      createdAt: new Date(),
      user: {
        fullName: "Piper Wong",
        avatar: "https://i.pravatar.cc/60?img=14",
      },
      isSent: true,
    },
    {
      id: uniqueId(),
      body: "Sounds good",
      createdAt: new Date(),
      user: {
        fullName: "Jared Brewer",
        avatar: "https://i.pravatar.cc/60?img=12",
      },
    },
    {
      id: uniqueId(),
      body: "I'll let you know",
      createdAt: new Date(),
      user: {
        fullName: "Jared Brewer",
        avatar: "https://i.pravatar.cc/60?img=12",
      },
    },
    {
      id: uniqueId(),
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      createdAt: new Date(),
      user: {
        fullName: "Jared Brewer",
        avatar: "https://i.pravatar.cc/60?img=12",
      },
    },
  ],
};

export const Empty = Template.bind({});
Empty.args = {
  isEmpty: true,
  emptyMessage: "You have no messages right now",
  messages: [],
};
