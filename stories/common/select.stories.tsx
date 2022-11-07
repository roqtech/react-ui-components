import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Select } from "../../src";

export default {
  title: "Roq Components/Common/Select",
  component: Select,
  argTypes: {
    onChange: { action: "onChange" },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: [
    { val: "option-1", label: "option-1" },
    { val: "option-2", label: "option-2" },
    { val: "option-3", label: "option-3" },
    { val: "option-4", label: "option-4" },
  ],
};

export const SelectedValue = Template.bind({});
SelectedValue.args = {
  value: { value: "option-2", label: "option-2" },
  options: [
    { value: "option-1", label: "option-1" },
    { value: "option-2", label: "option-2" },
    { value: "option-3", label: "option-3" },
    { value: "option-4", label: "option-4" },
  ],
};
