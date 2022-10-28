import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { ChatMembers } from "../../src";

export default {
  title: "Roq Components/Chat/Members",
  component: ChatMembers,
  argTypes: {},
} as ComponentMeta<typeof ChatMembers>;

const Template: ComponentStory<typeof ChatMembers> = (args) => (
  <div style={{ width: 400 }}>
    <ChatMembers {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  members: [
    {
      id: "7d6483f9-7708-456e-9550-e0fc4596ad89",
      fullName: "Piper Wong",
      avatar: "https://i.pravatar.cc/60?img=14",
    },
    {
      id: "c00ea876-8e99-4e8e-8867-b1d148cf5199",
      fullName: "Jared Brewer",
      avatar: "https://i.pravatar.cc/60?img=12",
    },
    {
      id: "98ab14be-30fb-40e7-8cc0-bd6578d53fb8",
      fullName: "Mose Ewald",
      avatar: "https://i.pravatar.cc/60?img=15",
    },
    {
      id: "98ab14be-20fb-40e7-8cc0-bd6578d53fb8",
      fullName: "Susan Gomez",
      avatar: "https://i.pravatar.cc/60?img=1",
    },
  ],
};

export const Selected = Template.bind({});
Selected.args = {
  selectedIds: [
    "7d6483f9-7708-456e-9550-e0fc4596ad89",
    "98ab14be-30fb-40e7-8cc0-bd6578d53fb8",
  ],
  members: [
    {
      id: "7d6483f9-7708-456e-9550-e0fc4596ad89",
      fullName: "Piper Wong",
      avatar: "https://i.pravatar.cc/60?img=14",
    },
    {
      id: "c00ea876-8e99-4e8e-8867-b1d148cf5199",
      fullName: "Jared Brewer",
      avatar: "https://i.pravatar.cc/60?img=12",
    },
    {
      id: "98ab14be-30fb-40e7-8cc0-bd6578d53fb8",
      fullName: "Mose Ewald",
      avatar: "https://i.pravatar.cc/60?img=15",
    },
    {
      id: "98ab14be-20fb-40e7-8cc0-bd6578d53fb8",
      fullName: "Susan Gomez",
      avatar: "https://i.pravatar.cc/60?img=1",
    },
  ],
};
