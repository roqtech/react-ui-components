import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ChatMessageMenu } from "../../src";

export default {
  title: "Roq Components/Chat/MessageMenu",
  component: ChatMessageMenu,
  argTypes: {
    
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 400,
          height: 20,
          padding: 10,
          backgroundColor: "#f1f5f8",
          position: "relative",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ChatMessageMenu>;

const Template: ComponentStory<typeof ChatMessageMenu> = (args) => (
  <ChatMessageMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  isAuthor: true,
  messageId: "b767aa7a-9dd4-483c-b6b6-eb16824327d2"
};
