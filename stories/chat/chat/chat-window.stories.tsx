import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ChatWindow } from "../../../src";
import { ChatDecorator, chatArgTypes } from "../../utils/chat.decorator";

export default {
  title: "Roq Components/Chat/ChatWindow",
  component: ChatWindow,
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
} as ComponentMeta<typeof ChatWindow>;

const Template: ComponentStory<typeof ChatWindow> = ({ ...args }) => {
  return <ChatWindow {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  conversationId: "90e7d00c-0031-494f-9111-15238da33065",
};
