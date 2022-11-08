import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChatConversationList } from "../../../src";
import {
  chatArgTypes,
  ChatDecorator,
  chatDefaultArgs,
} from "../../utils/chat.decorator";

export default {
  title:
    "Roq Components/Chat/ChatConversationList",
  component: ChatConversationList,
  argTypes: {
    ...chatArgTypes,
  },
  decorators: [
    ChatDecorator,
    (Story) => (
      <div
        style={{
          width: 400,
          height: 500,
        }}
      >
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ChatConversationList>;

const Template: ComponentStory<typeof ChatConversationList> = ({ ...args }) => {
  return <ChatConversationList {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...chatDefaultArgs,
};
