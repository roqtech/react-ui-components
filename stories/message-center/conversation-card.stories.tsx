import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ConversationCard } from "../../src";

export default {
  title: "Roq Widgets/Message Center/Conversation Card",
  component: ConversationCard,
  argTypes: {
    lastMessage: { control: "string" },
  },
} as ComponentMeta<typeof ConversationCard>;

const Template: ComponentStory<typeof ConversationCard> = (args) => (
  <div style={{ width: 320 }}>
    <ConversationCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: "Chat",
  date: "2 minutes ago",
  message: `Hi! How it's going?`,
  members: [
    { name: "Mose Ewald", src: "https://i.pravatar.cc/60?img=15" },
    { name: "Susan Gomez", src: "https://i.pravatar.cc/60?img=1" },
    { name: "Piper Wong", src: "https://i.pravatar.cc/60?img=14" },
    { name: "Jared Brewer", src: "https://i.pravatar.cc/60?img=12" },
  ],
};
