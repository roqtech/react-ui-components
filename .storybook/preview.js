import React, { useEffect } from "react";
import { RoqProvider } from "../src/components/core/roq-provider/roq-provider";
import { authorizeServiceAccount } from "../src/utils/authorize-service-account";
import "../stories/assets/custom.css";
import "../src/styles/styles.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "light",
    values: [
      {
        name: "light",
        value: "#FFFFFF",
      },
      {
        name: "dark",
        value: "#1F2B48",
      },
    ],
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
          "Typography",
          "Common",
          [
            "Presence",
            "Panel",
            "Avatar",
            "AvatarGroup",
            "Badge",
            "ActionButton",
            "StackedText",
            "TimeAgo",
          ],
          "Chat",
          [
            "ChatSidebar",
            ["ChatSearchField", "ChatConversationList"],
            "ChatWindow",
            "ChatNotificationBell",
            "ChatMembersPanel",
            "ChatMemberList",
            ["ChatMembers", ["ChatMember"]],
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
            "ChatConversationNotSelectedPanel",
          ],
          "Locale",
          ["LocaleSettings"[("LocaleTimezoneSelect", "LocaleLanguageSelect")]],
        ],
      ],
    },
  },
};

const hostConfig = {
  host: process.env.STORYBOOK_PLATFORM_GRAPHQL ?? "",
  token: process.env.STORYBOOK_PLATFORM_TOKEN ?? "",
  socket: true,
  tenantId: process.env.STORYBOOK_PLATFOMR_SERVICE_TENANT_ID ?? "",
  apiKey: process.env.STORYBOOK_PLATFOMR_SERVICE_API_KEY ?? "",
  serviceAccount: process.env.STORYBOOK_PLATFOMR_SERVICE_ACCOUNT ?? "",
};

const DEMO_STORY = [
  // notifications
  "roq-components-notification-list",
  "roq-components-notification-bell",
  // chat
  "roq-components-chat",
  "roq-components-chat-chatsidebar",
  "roq-components-chat-chatwindow",
  "roq-components-chat-chatmemberspanel",
  "roq-components-chat-chatmemberspanel-chatmemberlist",
  "roq-components-chat-chatwindow-chatmessagelist",
  "roq-components-chat-chatconversationlist",
  "roq-components-chat-chatnotificationbell",
  //
];

const themes = parameters.backgrounds.values.reduce(
  (acc, background) => ({
    ...acc,
    [background.value]: background.name,
  }),
  {}
);

export const decorators = [
  (Story, context) => {
    const color = context.globals?.backgrounds?.value;
    const themeName = !!color ? themes[color] : "light";

    useEffect(() => {
      document.documentElement.classList.add(`rc-${themeName}`);

      return function cleanup() {
        document.documentElement.classList.remove(`rc-${themeName}`);
      };
    }, [themeName]);

    return <Story />;
  },
  (Story, context) => {
    if (DEMO_STORY.includes(context.componentId)) {
      return <>{Story()}</>;
    }

    const { host, tenantId, apiKey, serviceAccount } = hostConfig;

    const getToken = async () => {
      const token = await authorizeServiceAccount({
        platformUrl: host + "v01/",
        tenantId,
        apiKey,
        serviceAccount,
      });

      return token;
    };

    const config = {
      host,
      getToken,
      socket: true,
    };

    return <RoqProvider config={config}>{Story()}</RoqProvider>;
  },
];
