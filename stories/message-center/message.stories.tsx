import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { Message } from "../../src";

export default {
  title: "Roq Widgets/Message Center/Message",
  component: Message,
  argTypes: {},
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args) => (
  <div style={{ width: 320 }}>
    <Message {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  timestamp: 1666169576672,
  message: `Hi! How it's going?`,
  author: { name: "Mose Ewald", src: "https://i.pravatar.cc/60?img=15" },
};
