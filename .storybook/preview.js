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
            "Avatar",
            "AvatarGroup",
            "Badge",
            "ActionButton",
            "Panel",
            "StackedText",
            "TimeAgo",
          ],
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

const CHAT_PREVIEW_COMPONENT = [
  "roq-components-chat-messagecenter",
  "roq-components-chat-messagecenter-chat",
  "roq-components-chat-chatconversationlist",
  "roq-components-chat-messagecenter-chat-chatmessagelist",
  "roq-components-chat-messagecenter-chatmemberspanel",
  "roq-components-chat-messagecenter-chatmemberspanel-chatmemberlist",
  "roq-components-chat-chatnotificationbell",
];

const themes = parameters.backgrounds.values.reduce(
  (acc, background) => ({
    ...acc,
    [background.name]: background.value,
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
    const { host, tenantId, apiKey, serviceAccount } = hostConfig;

    if (CHAT_PREVIEW_COMPONENT.includes(context.componentId)) {
      return <>{Story()}</>;
    }

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
