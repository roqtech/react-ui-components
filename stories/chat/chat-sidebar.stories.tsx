import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChatSidebar } from "../../src";
import { ChatDecorator, chatArgTypes } from "../utils/chat.decorator";

export default {
  title: "Roq Components/Chat/ChatSidebar",
  component: ChatSidebar,
  argTypes: {},
  decorators: [ChatDecorator],
} as ComponentMeta<typeof ChatSidebar>;

const Template: ComponentStory<typeof ChatSidebar> = (args) => (
  <div style={{ width: 418, height: 420 }}>
    <ChatSidebar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};

export const CustomMessage = Template.bind({});
CustomMessage.args = {};
