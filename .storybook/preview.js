import React from "react";
import { RoqProvider } from "../src/components/Provider/Provider";
import "../stories/assets/custom.css";
import "../src/styles/global.scss";
import { ChatProvider } from "../src";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <RoqProvider
      config={{
        host: process.env.PLATFORM_GRAPHQL ?? "",
        token: process.env.PLATFORM_TOKEN ?? "",
      }}
    >
      <ChatProvider
        platformUrl={process.env.PLATFORM_HOST}
        platformToken={process.env.PLATFORM_TOKEN}
        userId={process.env.ROQ_USER_ID}
      >
        <Story />
      </ChatProvider>
    </RoqProvider>
  ),
];
