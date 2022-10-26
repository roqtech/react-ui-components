import { ComponentMeta, ComponentStory } from "@storybook/react";
import uniqueId from "lodash/uniqueId";
import React from "react";

import { ChatMessageHistory } from "../../src";

export default {
  title: "Roq Components/Chat/Message History",
  component: ChatMessageHistory,
  argTypes: {
    isEmpty: { control: "boolean" },
    emptyMessage: { control: "text" },
  },
} as ComponentMeta<typeof ChatMessageHistory>;

const Template: ComponentStory<typeof ChatMessageHistory> = (args) => (
  <div style={{ width: 520, height: 600 }}>
    <ChatMessageHistory {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  isEmpty: false,
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

export const Empty = Template.bind({});
Empty.args = {
  isEmpty: true,
  emptyMessage: "This is the very beginning of your messaging",
  messages: [],
};

const EmptyIcon = (props) => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <style>
        {
          ".cls-1{fill:none;stroke:#94a3b8;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
        }
      </style>
    </defs>
    <title />
    <g data-name="23-chat" id="_23-chat">
      <path className="cls-1" d="M23 2H1v16h5v4l4-4h13V2z" />
      <path className="cls-1" d="M13 22v4h5v4l4-4h9V10h-4" />
    </g>
  </svg>
);

export const EmptyComponent = Template.bind({});
EmptyComponent.args = {
  isEmpty: true,
  components: {
    Empty: ({ emptyMessage, children, ...rest }) => (
      <div {...rest}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "48px auto",
            textAlign: "center",
            maxWidth: "464px",
          }}
        >
          <div style={{ width: 80, height: 80 }}>
            <EmptyIcon />
          </div>
          <h4>{children}</h4>
        </div>
      </div>
    ),
  },
  emptyMessage: "This is the very beginning of your messaging",
  messages: [],
};
