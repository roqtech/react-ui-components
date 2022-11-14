import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChatDateSeparator } from "../../../../src";

export default {
  title:
    "Roq Components/Chat/ChatWindow/ChatMessageList/ChatMessageHistory/ChatDateSeparator",
  component: ChatDateSeparator,
  argTypes: {},
  decorators: [(Story) => <div style={{ width: 100 }}>{Story()}</div>],
} as ComponentMeta<typeof ChatDateSeparator>;

const Template: ComponentStory<typeof ChatDateSeparator> = (args) => (
  <ChatDateSeparator {...args} />
);

export const Default = Template.bind({});
Default.args = {
  timestamp: new Date(),
};
