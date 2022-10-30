import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { ChatMenu, ChatMenuItem } from "../../src";

export default {
  title: "Roq Components/Chat/Menu",
  component: ChatMenu,
  argTypes: {},
} as ComponentMeta<typeof ChatMenu>;

const Template: ComponentStory<typeof ChatMenu> = (args) => (
  <div style={{ width: 400 }}>
    <ChatMenu {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  children: (
    <>
      <ChatMenuItem>copy</ChatMenuItem>
      <ChatMenuItem>delete</ChatMenuItem>
      <ChatMenuItem>edit</ChatMenuItem>
    </>
  ),
};

export const WithTrigger = Template.bind({});
WithTrigger.args = {
  open: true,
  children: (
    <>
      <ChatMenuItem>copy</ChatMenuItem>
      <ChatMenuItem>delete</ChatMenuItem>
      <ChatMenuItem>edit</ChatMenuItem>
    </>
  ),
};
