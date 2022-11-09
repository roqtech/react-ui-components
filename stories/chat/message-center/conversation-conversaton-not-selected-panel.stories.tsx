import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChatConversationNotSelectedPanel } from "../../../src";

export default {
  title: "Roq Components/Chat/MessageCenter/ChatConversationNotSelectedPanel",
  component: ChatConversationNotSelectedPanel,
  argTypes: {},
} as ComponentMeta<typeof ChatConversationNotSelectedPanel>;

const Template: ComponentStory<typeof ChatConversationNotSelectedPanel> = (
  args
) => (
  <div style={{ width: 690, height: 400 }}>
    <ChatConversationNotSelectedPanel {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  message: "Break the ice and start a conversation",
};

export const CustomMessage = Template.bind({});
CustomMessage.args = {
  message: "Select conversation to start chat",
};
