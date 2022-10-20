import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { ChatMessage } from "../../src";

export default {
  title: "Roq Components/Chat/Message",
  component: ChatMessage,
  argTypes: {},
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
};
