import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChatMessageInput } from "../../../../src";

export default {
  title: "Roq Components/Chat/ChatWindow/ChatMessageInput",
  component: ChatMessageInput,
  argTypes: {
    value: { control: "text" },
    defaultValue: { control: "text" },
    placeholder: { control: "text" },
    hideSendButton: { control: "boolean" },
    sendLabel: { control: "text" },
    edit: { control: "boolean" },
  },
} as ComponentMeta<typeof ChatMessageInput>;

const Template: ComponentStory<typeof ChatMessageInput> = (args) => (
  <div style={{ width: 600 }}>
    <ChatMessageInput {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "Type your message...",
  hideSendButton: false,
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholder: "Start chating",
  hideSendButton: false,
};

export const CustomDefaultValue = Template.bind({});
CustomDefaultValue.args = {
  value: "<p>Send message</p>",
  defaultValue: "<p><b>Message Template</b><p>",
};

export const WithoutSendButton = Template.bind({});
WithoutSendButton.args = {
  hideSendButton: true,
};
