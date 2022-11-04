import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ChatMessageBubble } from "../../src";

export default {
  title: "Roq Components/Chat/ChatMessageBubble",
  component: ChatMessageBubble,
  argTypes: {
    message: { control: "text" },
    isSent: { control: "boolean" },
    showCorner: { control: "boolean" },
  },
} as ComponentMeta<typeof ChatMessageBubble>;

const Template: ComponentStory<typeof ChatMessageBubble> = (args) => (
  <div style={{ width: 200 }}>
    <ChatMessageBubble {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  message: `Hi! How it's going?`,
};

export const Sent = Template.bind({});
Sent.args = {
  message: "All good, thanks!",
  isSent: true,
};

export const WithCorner = Template.bind({});
WithCorner.args = {
  message: "All good, thanks!",
  showCorner: true,
};
