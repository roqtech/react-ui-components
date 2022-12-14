import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChatMessageList } from "../../../../src";
import { ChatDecorator, chatArgTypes } from "../../../utils/chat.decorator";

export default {
  title: "Roq Components/Chat/ChatWindow/ChatMessageList",
  component: ChatMessageList,
  argTypes: {
    ...chatArgTypes,
  },
  decorators: [
    ChatDecorator,
    (Story) => (
      <div
        style={{
          width: 400,
          height: 400,
        }}
      >
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ChatMessageList>;

const Template: ComponentStory<typeof ChatMessageList> = (args) => (
  <ChatMessageList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  conversationId: "b767aa7a-9dd4-483c-b6b6-eb16824327d4",
};
