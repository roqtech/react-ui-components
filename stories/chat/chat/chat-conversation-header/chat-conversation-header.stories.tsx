import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChatConversationHeader } from "../../../../src";

export default {
  title: "Roq Components/Chat/ChatWindow/ChatConversationHeader",
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
    { fullName: "Olivia Emma", avatar: "/img/avatar1.png" },
    { fullName: "Susan Gomez", avatar: "/img/avatar2.png" },
    { fullName: "Piper Wong", avatar: "/img/avatar3.png" },
  ],
};

export const Chat = Template.bind({});
Chat.args = {
  title: "Olivia Emma",
  members: [{ fullName: "Piper Wong", avatar: "/img/avatar3.png" }],
};

export const CustomMemberFormat = Template.bind({});
CustomMemberFormat.args = {
  title: "Group chat",
  members: [
    { fullName: "Olivia Emma", avatar: "/img/avatar1.png" },
    { fullName: "Susan Gomez", avatar: "/img/avatar2.png" },
    { fullName: "Piper Wong", avatar: "/img/avatar3.png" },
  ],
  formatMembers: (members) =>
    members.map((member) => member.initials).join("/"),
};
