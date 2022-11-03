import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ChatConversationNotSelectedPanel } from "../../src";

export default {
  title: "Roq Components/Chat/Widget/ConversationNotSelectedPanel",
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
Default.args = {};

export const CustomMessage = Template.bind({});
CustomMessage.args = {
  message: "Select conversation to start chat",
};
