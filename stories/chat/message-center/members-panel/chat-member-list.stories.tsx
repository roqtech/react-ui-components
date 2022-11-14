import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChatMemberList } from "../../../../src";
import { ChatDecorator, chatArgTypes } from "../../../utils/chat.decorator";

export default {
  title: "Roq Components/Chat/ChatMembersPanel/ChatMemberList",
  component: ChatMemberList,
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
          background: "var(--rc-color-border)",
        }}
      >
        {Story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ChatMemberList>;

const Template: ComponentStory<typeof ChatMemberList> = (args) => (
  <ChatMemberList {...args} />
);

export const Default = Template.bind({});
Default.args = {};
