import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ChatConversationHeader } from "../../src";

export default {
  title: "Roq Components/Chat/Conversation Header",
  component: ChatConversationHeader,
  argTypes: {},
} as ComponentMeta<typeof ChatConversationHeader>;

const Template: ComponentStory<typeof ChatConversationHeader> = (args) => (
  <div style={{ width: 690 }}>
    <ChatConversationHeader {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: "Group chat",
  members: [
    { fullName: "Mose Ewald", avatar: "https://i.pravatar.cc/60?img=15" },
    { fullName: "Susan Gomez", avatar: "https://i.pravatar.cc/60?img=1" },
    { fullName: "Piper Wong", avatar: "https://i.pravatar.cc/60?img=14" },
    { fullName: "Jared Brewer", avatar: "https://i.pravatar.cc/60?img=12" },
  ],
};
