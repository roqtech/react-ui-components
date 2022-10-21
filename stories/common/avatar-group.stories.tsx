import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { AvatarGroup } from "../../src";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Roq Components/Common/Avatar Group",
  component: AvatarGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    rounded: { control: "boolean" },
    square: { control: "boolean" },
    size: {
      control: { type: "select", options: ["small", "medium", "large"] },
    },
  },
} as ComponentMeta<typeof AvatarGroup>;

const Template: ComponentStory<typeof AvatarGroup> = (args) => (
  <AvatarGroup {...args} />
);

export const Default = Template.bind({});
Default.args = {
  users: [
    { fullName: "Mose Ewald", avatar: "https://i.pravatar.cc/60?img=15" },
    { fullName: "Susan Gomez", avatar: "https://i.pravatar.cc/60?img=1" },
    { fullName: "Piper Wong", avatar: "https://i.pravatar.cc/60?img=14" },
    { fullName: "Jared Brewer", avatar: "https://i.pravatar.cc/60?img=12" },
  ],
};
