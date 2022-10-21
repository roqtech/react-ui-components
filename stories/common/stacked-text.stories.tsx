import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { StackedText } from "../../src";

export default {
  title: "Roq Components/Typography/StackedText",
  component: StackedText,
  argTypes: {
    disabled: { control: "boolean" },
    primaryText: { control: "string" },
    secondaryText: { control: "string" },
    tertiaryText: { control: "string" },
  },
} as ComponentMeta<typeof StackedText>;

const Template: ComponentStory<typeof StackedText> = (args) => (
  <StackedText {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Hello World!",
};

export const PrimaryText = Template.bind({});
PrimaryText.args = {
  primaryText: "Title",
};

export const WithSecondaryText = Template.bind({});
WithSecondaryText.args = {
  primaryText: "Primary text",
  secondaryText: "Secondary text",
};

export const WithSecondaryTertiaryText = Template.bind({});
WithSecondaryTertiaryText.args = {
  primaryText: "Primary text",
  secondaryText: "Secondary text",
  tertiaryText: "Tertiary text",
};

export const Dsabled = Template.bind({});
Dsabled.args = {
  text: "Disabled.",
  disabled: true,
};

