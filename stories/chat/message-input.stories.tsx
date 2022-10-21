import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { ChatMessageInput } from "../../src";

export default {
  title: "Roq Components/Chat/Message Input",
  component: ChatMessageInput,
  argTypes: {},
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
