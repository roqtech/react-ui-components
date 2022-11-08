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
            "MessageCenter",
            [
              "ChatConversationNotSelected",
              "ChatMembersPanel",
              "ChatMemberList",
              ["ChatMembers", ["ChatMember"]],
            ],
            "ChatConversation",
            [
              "ChatConversationHeader",
              "ChatMessageList",
              [
                "ChatMessageHistory",
                [
                  "ChatMessageHistoryLine",
                  "ChatMessage",
                  [
                    "ChatMessageMenu",
                    "ChatMessageBubble",
                    "ChatFormattedMessage",
                  ],
                ],
              ],
              "ChatMessageInput",
              ["ChatMessageEditor"],
            ],
            "ChatNotificationBell",
            "ChatConversationList",
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
  "roq-components-chat-messagecenter--widget",
  "roq-components-chat-messagecenter-chat--widget",
  "roq-components-chat-chatconversationlist",
  "roq-components-chat-messagecenter-chat-chatmessagelist",
  "roq-components-chat-messagecenter-chatmemberspanel",
  "roq-components-chat-messagecenter-chatmemberspanel-chatmemberlist",
  "roq-components-chat-chatnotificationbell",
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
