import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChatConversations, MessageCenter } from "../../../src";
import { ChatDecorator, chatArgTypes } from "../../utils/chat.decorator";

export default {
  title: "Roq Components/Chat",
  component: ChatConversations,
  argTypes: {
    title: { control: "text" },
    actionButtonLabel: { control: "text" },
    showActionButton: { control: "boolean" },
    conversationTitle: { control: "text" },
    groupConverstionTitle: { control: "text" },
    addMemberTitle: { control: "text" },
    removeMemberTitle: { control: "text" },
    conversationNotSelectedMessage: { control: "text" },
    ...chatArgTypes,
  },
  decorators: [
    ChatDecorator,
    (Story) => (
      <div
        style={{
          backgroundColor: "white",
          height: "calc(100vh - 80px)",
          minHeight: "700px",
          boxSizing: "border-box",
          margin: 24,
        }}
      >
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ChatConversations>;

const Template: ComponentStory<typeof ChatConversations> = ({ ...args }) => {
  return <MessageCenter {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  showActionButton: true,
  actionButtonLabel: "Create new chat",
  conversationTitle: "Chat",
  groupConverstionTitle: "Group Chat",
  addMemberTitle: "Add users to the group",
  removeMemberTitle: "Remove users from the group",
  conversationNotSelectedMessage: "Break the ice and start a conversation",
};

export const CustomLabels = Template.bind({});
CustomLabels.args = {
  title: "Messenger",
  actionButtonLabel: "Start chat",
  showActionButton: true,
  conversationTitle: "Direct Message",
  groupConverstionTitle: "Channel",
  addMemberTitle: "Add user",
  removeMemberTitle: "Remove user",
  conversationNotSelectedMessage: "Channel is not selected",
};
