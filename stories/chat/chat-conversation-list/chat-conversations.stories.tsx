import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChatConversations } from "../../../src";

export default {
  title: "Roq Components/Chat/ChatConversationList/ChatConversations",
  component: ChatConversations,
  argTypes: {},
} as ComponentMeta<typeof ChatConversations>;

const Template: ComponentStory<typeof ChatConversations> = (args) => (
  <div style={{ width: 400 }}>
    <ChatConversations {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  selectedConversationId: "7d6483f9-7708-456e-9550-e0fc4596ad89",
  conversations: [
    {
      id: "7d6483f9-7708-456e-9550-e0fc4596ad89",
      title: "Marketing Chat Group",
      timestamp: new Date(),
      message: `Hi! How it's going?`,
      members: [
        { fullName: "Mose Ewald", avatar: "https://i.pravatar.cc/60?img=15" },
        { fullName: "Susan Gomez", avatar: "https://i.pravatar.cc/60?img=1" },
        { fullName: "Piper Wong", avatar: "https://i.pravatar.cc/60?img=14" },
      ],
    },
    {
      id: "c00ea876-8e99-4e8e-8867-b1d148cf5199",
      title: "Susan Gomez",
      timestamp: new Date(),
      unreadCount: 10,
      message: `Hi! How it's going?`,
      members: [
        { fullName: "Susan Gomez", avatar: "https://i.pravatar.cc/60?img=1" },
        { fullName: "Piper Wong", avatar: "https://i.pravatar.cc/60?img=14" },
      ],
    },
    {
      id: "98ab14be-30fb-40e7-8cc0-bd6578d53fb8",
      title: "Release Discsusion",
      timestamp: new Date(),
      message: `Hi! How it's going?`,
      members: [
        { fullName: "Piper Wong", avatar: "https://i.pravatar.cc/60?img=14" },
        { fullName: "Susan Gomez", avatar: "https://i.pravatar.cc/60?img=1" },
        { fullName: "Jared Brewer", avatar: "https://i.pravatar.cc/60?img=12" },
      ],
    },
  ],
};
