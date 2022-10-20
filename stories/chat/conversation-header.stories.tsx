import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ChatConversationHeader } from "../../src";

export default {
  title: "Roq Components/Chat/Conversation Header",
  component: ChatConversationHeader,
  argTypes: {},
} as ComponentMeta<typeof ChatConversationHeader>;

const Template: ComponentStory<typeof ChatConversationHeader> = (args) => (
  <div style={{ width: 520 }}>
    <ChatConversationHeader {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: "Group chat",
  members: [
    { name: "Mose Ewald", src: "https://i.pravatar.cc/60?img=15" },
    { name: "Susan Gomez", src: "https://i.pravatar.cc/60?img=1" },
    { name: "Piper Wong", src: "https://i.pravatar.cc/60?img=14" },
    { name: "Jared Brewer", src: "https://i.pravatar.cc/60?img=12" },
  ],
};
