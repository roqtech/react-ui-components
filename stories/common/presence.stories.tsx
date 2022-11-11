import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Presence } from "../../src";

export default {
  title: "Roq Components/Common/Presence",
  component: Presence,
  argTypes: {
    online: { control: "boolean" },
    size: {
      control: { type: "select", options: ["small", "medium", "large"] },
    },
  },
} as ComponentMeta<typeof Presence>;

const Template: ComponentStory<typeof Presence> = (args) => (
  <Presence {...args} />
);

export const Default = Template.bind({});
Default.args = {
  online: true,
};

export const DifferentSize = Template.bind({});
DifferentSize.args = {
  online: true,
  size: "large",
};
