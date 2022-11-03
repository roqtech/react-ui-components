import React, { useState, useEffect } from "react";
import { RoqProvider } from "../src/components/Provider/Provider";
import "../stories/assets/custom.css";
import "../src/styles/global.scss";
import "../src/styles/styles.scss";
import { config } from "process";
import { SocketProvider, ChatProvider, MessageCenter } from "../src";

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
          ["Avatar", "AvatarGroup", "Badge", "ActionButton"],
          "Chat",
          [
            "Widget",
            [
              "MessageCenter",
              "Chat",
              "ConversationList",
              "MessageList",
              "MemberList",
              "NotificationBell",
              "MembersPanel",
              "ConversationNotSelectedPanel"
            ],
            "MessageCenter",
            "Chat",
            "Panel",
            "MessageBubble",
            "Message",
            "Formatted Message",
            "MessageHistory",
            "MessageHistoryLine",
            "MessageList",
            "ConversationCard",
            "ConversationCardSkeleton",
            "Conversations",
            "ConversationList",
            "ConversationMenu",
            "ConversationHeader",
            "MessageEditor",
            "MessageInput",
            "MessageMenu",
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

const CHAT_PREVIEW_COMPONENT = [
  "roq-components-chat-widget-messagecenter",
  "roq-components-chat-widget-chat",
  "roq-components-chat-widget-conversationlist",
  "roq-components-chat-widget-messagelist",
  "roq-components-chat-widget-memberlist",
  "roq-components-chat-widget-notificationbell",
];

export const decorators = [
  (Story, context) => {
    console.dir(context);

    if (CHAT_PREVIEW_COMPONENT.includes(context.componentId)) {
      return <Story />;
    }

    return (
      <RoqProvider config={hostConfig}>
        <Story />
      </RoqProvider>
    );
  },
];
