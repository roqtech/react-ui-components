import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ChatMessageHistory } from "../../src";

export default {
  title: "Roq Components/Chat/Message History",
  component: ChatMessageHistory,
  argTypes: {},
} as ComponentMeta<typeof ChatMessageHistory>;

const Template: ComponentStory<typeof ChatMessageHistory> = (args) => (
  <div style={{ width: 520, height: 600 }}>
    <ChatMessageHistory {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  messages: [
    {
      message: "Hello",
      showCorner: true,
      timestamp: new Date(),
      user: {
        name: "Mose Ewald",
        src: "https://i.pravatar.cc/60?img=15",
      },
      isSent: true,
    },
    {
      message: "Hi. Is there an updates?",
      showCorner: true,
      timestamp: new Date(),
      user: {
        name: "Susan Gomez",
        src: "https://i.pravatar.cc/60?img=1",
      },
    },
    {
      message: "Yeah, let`s sync up in 10m",
      showCorner: true,
      timestamp: new Date(),
      user: {
        name: "Piper Wong",
        src: "https://i.pravatar.cc/60?img=14",
      },
      isSent: true,
    },
    {
      message: "Sounds good",
      showCorner: true,
      showUser: false,
      timestamp: new Date(),
      user: {
        name: "Jared Brewer",
        src: "https://i.pravatar.cc/60?img=12",
      },
    },
    {
      message: "I'll let you know",
      showCorner: true,
      showUser: true,
      timestamp: new Date(),
      user: {
        name: "Jared Brewer",
        src: "https://i.pravatar.cc/60?img=12",
      },
    },
  ],
};
