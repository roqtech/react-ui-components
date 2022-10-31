import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { ChatMemberList } from "../../src";

export default {
  title: "Roq Components/Chat/MemberList",
  component: ChatMemberList,
  argTypes: {},
} as ComponentMeta<typeof ChatMemberList>;

const Template: ComponentStory<typeof ChatMemberList> = (args) => (
  <div style={{ width: 400 }}>
    <ChatMemberList {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  
};
