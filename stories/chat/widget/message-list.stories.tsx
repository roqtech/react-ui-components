import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ChatMessageList } from "../../../src";
import {
  ChatDecorator,
  chatDefaultArgs,
  chatArgTypes,
} from "../../utils/chat.decorator";

export default {
  title: "Roq Components/Chat/Widget/MessageList",
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
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ChatMessageList>;

const Template: ComponentStory<typeof ChatMessageList> = (args) => (
  <ChatMessageList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...chatDefaultArgs,
  conversationId: "b767aa7a-9dd4-483c-b6b6-eb16824327d4",
};
