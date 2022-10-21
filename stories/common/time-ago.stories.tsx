import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { TimeAgo } from "../../src";

export default {
  title: "Roq Components/Typography/TimeAgo",
  component: TimeAgo,
  argTypes: {
    disabled: { control: "boolean" },
    primaryText: { control: "string" },
    secondaryText: { control: "string" },
    tertiaryText: { control: "string" },
  },
} as ComponentMeta<typeof TimeAgo>;

const Template: ComponentStory<typeof TimeAgo> = (args) => (
  <TimeAgo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Hello World!",
  date: new Date(),
};
