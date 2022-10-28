import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { Menu, MenuItem } from "../../src";

export default {
  title: "Roq Components/Chat/Menu",
  component: Menu,
  argTypes: {},
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
  <div style={{ width: 400 }}>
    <Menu {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  children: (
    <>
      <MenuItem>copy</MenuItem>
      <MenuItem>delete</MenuItem>
      <MenuItem>edit</MenuItem>
    </>
  ),
};

export const WithTrigger = Template.bind({});
WithTrigger.args = {
  open: true,
  children: (
    <>
      <MenuItem>copy</MenuItem>
      <MenuItem>delete</MenuItem>
      <MenuItem>edit</MenuItem>
    </>
  ),
};
