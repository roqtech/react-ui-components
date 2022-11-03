import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { ActionButton, Menu, MenuItem } from "../../src";

export default {
  title: "Roq Components/Common/ActionButton",
  component: ActionButton,
  argTypes: {},
} as ComponentMeta<typeof ActionButton>;

const Template: ComponentStory<typeof ActionButton> = (args) => (
  <div style={{ width: 280, display: "flex", justifyContent: "flex-end" }}>
    <ActionButton {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  components: {
    Dropdown: (props) => (
      <Menu {...props}>
        <div>dropdown content</div>
      </Menu>
    ),
  },
};

export const WithAction = Template.bind({});
WithAction.args = {
  components: {
    Dropdown: (props) => (
      <Menu {...props}>
        <MenuItem>action 1</MenuItem>
        <MenuItem>action 2</MenuItem>
      </Menu>
    ),
  },
};
