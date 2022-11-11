import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { AvatarGroup } from "../../src";

export default {
  title: "Roq Components/Common/AvatarGroup",
  component: AvatarGroup,
  argTypes: {
    max: { control: "number" },
    rounded: { control: "boolean" },
    square: { control: "boolean" },
    size: {
      control: {
        type: "select",
        options: ["extra-small", "small", "medium", "large", "extra-large"],
      },
    },
  },
} as ComponentMeta<typeof AvatarGroup>;

const Template: ComponentStory<typeof AvatarGroup> = (args) => (
  <AvatarGroup {...args} />
);

export const Default = Template.bind({});
Default.args = {
  users: [
    { fullName: "Olivia Emma", avatar: "/img/avatar1.png" },
    { fullName: "Susan Gomez", avatar: "/img/avatar2.png" },
    { fullName: "Piper Wong", avatar: "/img/avatar3.png" },
    { fullName: "Jared Brewer" },
  ],
};

export const Single = Template.bind({});
Single.args = {
  users: [
    { fullName: "Olivia Emma", avatar: "/img/avatar1.png" },
  ],
};

export const Max = Template.bind({});
Max.args = {
  maxCount: 1,
  size: "extra-large",
  users: [
    { fullName: "Olivia Emma", avatar: "/img/avatar1.png" },
    { fullName: "Susan Gomez", avatar: "/img/avatar2.png" },
    { fullName: "Piper Wong", avatar: "/img/avatar3.png" },
    { fullName: "Jovani Fox" },
    { fullName: "Jared Brewer" },
  ],
};
