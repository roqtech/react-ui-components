import { ComponentMeta, ComponentStory } from "@storybook/react";
import uniqueId from "lodash/uniqueId";
import React from "react";

import { ChatMessageHistory } from "../../src";

export default {
  title: "Roq Components/Chat/Message History",
  component: ChatMessageHistory,
  argTypes: {},
} as ComponentMeta<typeof ChatMessageHistory>;

const Template: ComponentStory<typeof ChatMessageHistory> = (args) => (
  <div
    style={{ width: 520, height: 600, padding: 20, backgroundColor: "#f1f5f8" }}
  >
    <ChatMessageHistory {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  messages: [
    {
      id: uniqueId(),
      body: "Hello",
      createdAt: new Date(),
      user: {
        fullName: "Mose Ewald",
        avatar: "https://i.pravatar.cc/60?img=15",
      },
      isSent: true,
    },
    {
      id: uniqueId(),
      body: "Hi. Is there an updates?",
      createdAt: new Date(),
      user: {
        fullName: "Susan Gomez",
        avatar: "https://i.pravatar.cc/60?img=1",
      },
    },
    {
      id: uniqueId(),
      body: "Yeah, let`s sync up in 10m",
      createdAt: new Date(),
      user: {
        fullName: "Piper Wong",
        avatar: "https://i.pravatar.cc/60?img=14",
      },
      isSent: true,
    },
    {
      id: uniqueId(),
      body: "Sounds good",
      createdAt: new Date(),
      user: {
        fullName: "Jared Brewer",
        avatar: "https://i.pravatar.cc/60?img=12",
      },
    },
    {
      id: uniqueId(),
      body: "I'll let you know",
      createdAt: new Date(),
      user: {
        fullName: "Jared Brewer",
        avatar: "https://i.pravatar.cc/60?img=12",
      },
    },
  ],
};
