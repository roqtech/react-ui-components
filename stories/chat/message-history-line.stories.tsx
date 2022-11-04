import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { ChatMessageHistoryLine } from "../../src";

export default {
  title: "Roq Components/Chat/ChatMessageHistoryLine",
  component: ChatMessageHistoryLine,
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ChatMessageHistoryLine>;

const Template: ComponentStory<typeof ChatMessageHistoryLine> = (args) => (
  <ChatMessageHistoryLine {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isSent: true,
  children: <>message line (right click on me!)</>,
};
