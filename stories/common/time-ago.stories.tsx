import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { TimeAgo } from "../../src";

export default {
  title: "Roq Components/Typography/TimeAgo",
  component: TimeAgo,
  argTypes: {
    timestamp: { control: "date" },
    disabled: { control: "boolean" },
    primaryText: { control: "text" },
    secondaryText: { control: "text" },
    tertiaryText: { control: "text" },
  },
} as ComponentMeta<typeof TimeAgo>;

const Template: ComponentStory<typeof TimeAgo> = (args) => (
  <TimeAgo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  timestamp: new Date(),
};
