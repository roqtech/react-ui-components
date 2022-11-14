import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ChatFormattedMessage } from "../../../../src";

export default {
  title:
    "Roq Components/Chat/ChatWindow/ChatMessageList/ChatMessageHistory/ChatMessage/ChatFormattedMessage",
  component: ChatFormattedMessage,
  argTypes: {
    content: { control: "text" },
  },
} as ComponentMeta<typeof ChatFormattedMessage>;
const Template: ComponentStory<typeof ChatFormattedMessage> = (args) => (
  <div style={{ width: 400 }}>
    <ChatFormattedMessage {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  content: "<p>Hello world!</p>",
};

export const WithFormatting = Template.bind({});
WithFormatting.args = {
  content: "<p><b>Hello</b> <i>world<i><u>!<u></p>",
};

export const WithMention = Template.bind({});
WithMention.args = {
  preview: true,
  content:
    '<p><a href="user:fd002eaa-25bc-47ec-b06f-3afb49bae3e5">@[fd002eaa-25bc-47ec-b06f-3afb49bae3e5:Mentioned User]</a> hello</p>',
};

export const WithLink = Template.bind({});
WithLink.args = {
  preview: true,
  content:
    '<p>Biult with <a href="https://roq.tech/">ROQ Tech</a> technology</p>',
};
