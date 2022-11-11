import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChatSidebar } from "../../../src";

export default {
  title: "Roq Components/ChatSidebar",
  component: ChatSidebar,
  argTypes: {},
} as ComponentMeta<typeof ChatSidebar>;

const Template: ComponentStory<typeof ChatSidebar> = (args) => (
  <div style={{ width: 690, height: 400 }}>
    <ChatSidebar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};

export const CustomMessage = Template.bind({});
CustomMessage.args = {};
