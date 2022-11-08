import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChatMessage } from "../../../../src";

export default {
  title:
    "Roq Components/Chat/ChatConversation/ChatMessageList/ChatMessageHistory/ChatMessage",
  component: ChatMessage,
  argTypes: {
    isSent: { control: "boolean" },
    showCorner: { control: "boolean" },
    showTime: { control: "boolean" },
    showUser: { control: "boolean" },
  },
} as ComponentMeta<typeof ChatMessage>;

const Template: ComponentStory<typeof ChatMessage> = (args) => (
  <div style={{ width: 320 }}>
    <ChatMessage {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  timestamp: 1666169576672,
  message: `Hi! How it's going?`,
  user: { fullName: "Mose Ewald", avatar: "https://i.pravatar.cc/60?img=15" },
  isSent: false,
  showCorner: false,
  showTime: true,
  showUser: true,
};

export const NoTime = Template.bind({});
NoTime.args = {
  timestamp: 1666169576672,
  message: `Hi! How it's going?`,
  user: { fullName: "Mose Ewald", avatar: "https://i.pravatar.cc/60?img=15" },
  isSent: false,
  showCorner: false,
  showTime: false,
  showUser: true,
};

export const NoUser = Template.bind({});
NoUser.args = {
  timestamp: 1666169576672,
  message: `Hi! How it's going?`,
  user: { fullName: "Mose Ewald", avatar: "https://i.pravatar.cc/60?img=15" },
  isSent: false,
  showCorner: false,
  showTime: true,
  showUser: false,
};

export const Sent = Template.bind({});
Sent.args = {
  timestamp: 1666169576672,
  message: `Hi! How it's going?`,
  user: { fullName: "Mose Ewald", avatar: "https://i.pravatar.cc/60?img=15" },
  isSent: true,
  showCorner: false,
  showTime: true,
  showUser: true,
};

export const Deleted = Template.bind({});
Deleted.args = {
  timestamp: 1666169576672,
  message: `Hi! How it's going?`,
  user: { fullName: "Mose Ewald", avatar: "https://i.pravatar.cc/60?img=15" },
  isDeleted: true,
  showCorner: false,
  showTime: true,
  showUser: true,
};
