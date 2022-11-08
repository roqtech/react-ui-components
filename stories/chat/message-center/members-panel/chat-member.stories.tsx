import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChatMember } from "../../../../src";

export default {
  title:
    "Roq Components/Chat/MessageCenter/ChatMembersPanel/ChatMemberList/ChatMembers/ChatMember",
  component: ChatMember,
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ChatMember>;

const Template: ComponentStory<typeof ChatMember> = (args) => (
  <ChatMember {...args} />
);

export const Default = Template.bind({});
Default.args = {
  memberId: "7d6483f9-7708-456e-9550-e0fc4596ad89",
  fullName: "Piper Wong",
  avatar: "https://i.pravatar.cc/60?img=14",
};

export const Selected = Template.bind({});
Selected.args = {
  selected: true,
  memberId: "7d6483f9-7708-456e-9550-e0fc4596ad89",
  fullName: "Piper Wong",
  avatar: "https://i.pravatar.cc/60?img=14",
};
