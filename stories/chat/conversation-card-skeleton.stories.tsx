import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { ChatConversationCardSkeleton } from "../../src";

export default {
  title: "Roq Components/Chat/ConversationCardSkeleton",
  component: ChatConversationCardSkeleton,
  argTypes: {
    lastMessage: { control: "text" },
  },
} as ComponentMeta<typeof ChatConversationCardSkeleton>;

const Template: ComponentStory<typeof ChatConversationCardSkeleton> = (
  args
) => (
  <div style={{ width: 400 }}>
    <ChatConversationCardSkeleton {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
