import React from "react";
import { RoqProvider } from "../src/components/Provider/Provider";
import "../stories/assets/custom.css";
import "../src/styles/global.scss";
import "../src/styles/styles.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        "Roq Components",
        [
          "Introduction",
          "Getting started",
          "Usage",
          "Styling",
          "Common",
          ["Avatar", "Avatar Group", "Badge", "Action Button"],
          "Chat",
          [
            "Message Center",
            "Chat",
            "Panel",
            "Message Bubble",
            "Message",
            "Formatted Message",
            "Message History",
            "Message List",
            "Conversation Card",
            "Conversations",
            "Conversation List",
            "Conversation Header",
            "Message Editor",
            "Message Input",
            "Notification Bell",
          ],
          "Typography",
        ],
      ],
    },
  },
};

const hostConfig = {
  host: process.env.STORYBOOK_PLATFORM_GRAPHQL ?? "",
  token: process.env.STORYBOOK_PLATFORM_TOKEN ?? "",
};

export const decorators = [
  (Story) => (
    <RoqProvider
      config={{
        host: process.env.PLATFORM_GRAPHQL ?? "",
        token: process.env.PLATFORM_TOKEN ?? "",
      }}
    >
      <Story />
    </RoqProvider>
  ),
];
