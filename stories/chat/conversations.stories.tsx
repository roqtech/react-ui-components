import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { ChatConversations } from "../../src";

export default {
  title: "Roq Components/Chat/Conversations",
  component: ChatConversations,
  argTypes: {},
} as ComponentMeta<typeof ChatConversations>;

const Template: ComponentStory<typeof ChatConversations> = (args) => (
  <div style={{ width: 320 }}>
    <ChatConversations {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  conversations: [
    {
      title: "Marketing Chat Group",
      date: "2 minutes ago",
      message: `Hi! How it's going?`,
      members: [
        { name: "Mose Ewald", src: "https://i.pravatar.cc/60?img=15" },
        { name: "Susan Gomez", src: "https://i.pravatar.cc/60?img=1" },
        { name: "Piper Wong", src: "https://i.pravatar.cc/60?img=14" },
      ],
    },
    {
      title: "Susan Gomez",
      date: "2 minutes ago",
      message: `Hi! How it's going?`,
      members: [
        { name: "Susan Gomez", src: "https://i.pravatar.cc/60?img=1" },
        { name: "Piper Wong", src: "https://i.pravatar.cc/60?img=14" },
      ],
    },
    {
      title: "Release Discsusion",
      date: "2 minutes ago",
      message: `Hi! How it's going?`,
      members: [
        { name: "Piper Wong", src: "https://i.pravatar.cc/60?img=14" },
        { name: "Susan Gomez", src: "https://i.pravatar.cc/60?img=1" },
        { name: "Jared Brewer", src: "https://i.pravatar.cc/60?img=12" },
      ],
    },
  ],
};
