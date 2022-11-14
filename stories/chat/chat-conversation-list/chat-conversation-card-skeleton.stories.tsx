import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChatConversationCardSkeleton } from "../../../src";

export default {
  title:
    "Roq Components/Chat/ChatSidebar/ChatConversationList/ChatConversations/ChatConversationCard/ChatConversationCardSkeleton",
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
