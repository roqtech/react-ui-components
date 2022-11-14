import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChatConversationMenu } from "../../../src";

export default {
  title:
    "Roq Components/Chat/ChatSidebar/ChatConversationList/ChatConversations/ChatConversationCard/ChatConversationMenu",
  component: ChatConversationMenu,
  argTypes: {
    conversationId: { control: "text" },
    isOwner: { control: "boolean" },
    showRename: { control: "boolean" },
    showArchive: { control: "boolean" },
    showInvite: { control: "boolean" },
    showRemove: { control: "boolean" },
    showLeave: { control: "boolean" },
    renameLabel: { control: "text" },
    archiveLabel: { control: "text" },
    inviteLabel: { control: "text" },
    removeLabel: { control: "text" },
    leaveLabel: { control: "text" },
  },
  parameters: {
    actions: {
      // onRename
      // onArchive
      // onInvite
      // onRemove
      // onLeave
    },
  },
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
        {Story()}
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
