import React from "react";
import { RoqProvider } from "../src/components/Provider/Provider";
import "../stories/assets/custom.css";

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
    <div style={{ margin: "3em" }}>
      <RoqProvider
        config={{
          host: process.env.PLATFORM_GRAPHQL ?? "",
          token: process.env.PLATFORM_TOKEN ?? "",
        }}
      >
        <Story />
      </RoqProvider>
    </div>
  ),
];
