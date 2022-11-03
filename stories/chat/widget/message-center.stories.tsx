import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ChatConversations, MessageCenter } from "../../../src";
import {
  ChatDecorator,
  chatArgTypes,
  chatDefaultArgs,
} from "../../utils/chat.decorator";

export default {
  title: "Roq Components/Chat/Widget/MessageCenter",
  component: ChatConversations,
  argTypes: {
    ...chatArgTypes,
  },
  decorators: [
    ChatDecorator,
    (Story) => (
      <div
        style={{
          backgroundColor: "#E5E5E5",
          height: "calc(100vh - 40px)",
          minHeight: "700px",
          boxSizing: "border-box",
          padding: 24,
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ChatConversations>;

const Template: ComponentStory<typeof ChatConversations> = ({ ...args }) => {
  return <MessageCenter {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...chatDefaultArgs,
};
