import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { ChatMessageEditor } from "../../src";

export default {
  title: "Roq Components/Chat/Message Editor",
  component: ChatMessageEditor,
  argTypes: {},
} as ComponentMeta<typeof ChatMessageEditor>;

const Template: ComponentStory<typeof ChatMessageEditor> = (args) => (
  <div style={{ width: 600 }}>
    <ChatMessageEditor {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "Type your message...",
  defaltValue: "<p></p>",
  hideSendButton: false,
};
