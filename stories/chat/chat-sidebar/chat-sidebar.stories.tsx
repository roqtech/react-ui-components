import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChatSearchField } from "../../../src";
import { ChatDecorator, chatArgTypes } from "../../utils/chat.decorator";

export default {
  title: "Roq Components/Chat/ChatSidebar/ChatSearchField",
  component: ChatSearchField,
  argTypes: {},
  decorators: [ChatDecorator],
} as ComponentMeta<typeof ChatSearchField>;

const Template: ComponentStory<typeof ChatSearchField> = (args) => (
  <div style={{ width: 418, height: 420 }}>
    <ChatSearchField {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
