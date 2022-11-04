import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { ChatPanel } from "../../src";

export default {
  title: "Roq Components/Chat/ChatPanel",
  component: ChatPanel,
  argTypes: {},
} as ComponentMeta<typeof ChatPanel>;

const Template: ComponentStory<typeof ChatPanel> = (args) => (
  <div
    style={{ width: 600, height: 400, padding: 10, backgroundColor: "#f1f5f8" }}
  >
    <ChatPanel {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: <div style={{}}>Inner content</div>,
};
