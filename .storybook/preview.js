import React, { useState, useEffect } from "react";
import { RoqProvider } from "../src/components/core/roq-provider/roq-provider";
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
          ["Avatar", "AvatarGroup", "Badge", "ActionButton", "Panel"],
          "Chat",
          [
            "Widget",
            [
              "MessageCenter",
              "Chat",
              "ChatConversationList",
              "ChatMessageList",
              "ChatMemberList",
              "ChatNotificationBell",
              "ChatMembersPanel",
              "ChatConversationNotSelectedPanel",
            ],
            "ChatMessageBubble",
            "ChatMessage",
            "ChatFormatted Message",
            "ChatMessageHistory",
            "ChatMessageHistoryLine",
            "ChatMessageList",
            "ChatConversationCard",
            "ChatConversationCardSkeleton",
            "ChatConversations",
            "ChatConversationList",
            "ChatConversationMenu",
            "ChatConversationHeader",
            "ChatMessageEditor",
            "ChatMessageInput",
            "ChatMessageMenu",
          ],
          "Locale",
          [
            "Widget",
            ["LocaleSettings"],
            "LocaleTimezoneSelect",
            "LocaleLanguageSelect",
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
  "roq-components-chat-widget-chat-messagecenter",
  "roq-components-chat-widget-chat",
  "roq-components-chat-widget-chat-conversationlist",
  "roq-components-chat-widget-chat-messagelist",
  "roq-components-chat-widget-chat-memberlist",
  "roq-components-chat-widget-chat-notificationbell",
];

export const decorators = [
  (Story, context) => {
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
