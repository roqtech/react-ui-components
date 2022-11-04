import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ChatMembersPanel } from "../../../src";
import {
  ChatDecorator,
  chatDefaultArgs,
  chatArgTypes,
} from "../../utils/chat.decorator";

export default {
  title: "Roq Components/Chat/Widget/ChatMembersPanel",
  component: ChatMembersPanel,
  argTypes: {
    ...chatArgTypes,
  },
  decorators: [
    ChatDecorator,
    (Story) => (
      <div style={{ width: 500, height: 700 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ChatMembersPanel>;

const Template: ComponentStory<typeof ChatMembersPanel> = (args) => (
  <ChatMembersPanel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...chatDefaultArgs,
};
