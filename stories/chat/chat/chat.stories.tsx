import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Chat } from "../../../src";
import {
  ChatDecorator,
  chatDefaultArgs,
  chatArgTypes,
} from "../../utils/chat.decorator";

export default {
  title: "Roq Components/Chat/ChatConversation",
  component: Chat,
  argTypes: {
    ...chatArgTypes,
  },
  decorators: [
    ChatDecorator,
    (Story) => (
      <div
        style={{
          width: 600,
          height: 600,
        }}
      >
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof Chat>;

const Template: ComponentStory<typeof Chat> = ({ ...args }) => {
  return <Chat {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...chatDefaultArgs,
  conversationId: "90e7d00c-0031-494f-9111-15238da33065",
};
