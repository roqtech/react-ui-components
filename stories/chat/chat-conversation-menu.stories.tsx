import { ComponentMeta, ComponentStory } from "@storybook/react";
import { relative } from "path";
import React, { useState, useEffect } from "react";
import { ChatConversationMenu } from "../../src";

export default {
  title: "Roq Components/Chat/ConversationMenu",
  component: ChatConversationMenu,
  argTypes: {},
  decorators: [
    (Story) => (
      <div
        style={{
          width: 400,
          height: 20,
          padding: 10,
          backgroundColor: "#f1f5f8",
          position: "relative",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ChatConversationMenu>;

const Template: ComponentStory<typeof ChatConversationMenu> = (args) => (
  <ChatConversationMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  isOwner: true,
};

export const Member = Template.bind({});
Member.args = {
  open: true,
  isOwner: false,
};
