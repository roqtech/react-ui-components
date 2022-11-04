import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ChatMemberList } from "../../../src";
import {
  ChatDecorator,
  chatDefaultArgs,
  chatArgTypes,
} from "../../utils/chat.decorator";

export default {
  title: "Roq Components/Chat/Widget/ChatMemberList",
  component: ChatMemberList,
  argTypes: {
    ...chatArgTypes,
  },
  decorators: [
    ChatDecorator,
    (Story) => (
      <div style={{ width: 400, height: 500 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ChatMemberList>;

const Template: ComponentStory<typeof ChatMemberList> = (args) => (
  <ChatMemberList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...chatDefaultArgs,
};
