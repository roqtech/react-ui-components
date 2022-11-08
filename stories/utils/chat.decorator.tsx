import React from "react";
import { RoqProvider, ChatProvider } from "../../src";

import { authorizeServiceAccount } from "../../src/utils";

export const chatArgTypes = {
  secure: { control: "boolean" },
  host: { control: "text" },
  token: { control: "text" },
  platformUrl: { control: "text" },
  userId: { control: "text" },
};

const MOCKED_CHAT_USER_ID = "48a82c03-3fac-4c4f-9663-b040b9320d24";
const MOCKED_CHAT_USER_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZGFhMzU3LWQ4OWMtNGQ0ZS1iNWQ1LTRhZjU0ODk4MDNkMiIsInJvcUlkZW50aWZpZXIiOiI0OGE4MmMwMy0zZmFjLTRjNGYtOTY2My1iMDQwYjkzMjBkMjQiLCJpYXQiOjE2Njc1NjkwMzgsImV4cCI6MTY2NzU3MjYzOH0.5dyh8ybvyPCPHiebvATOkaITZkxwfnbl0l66GUQrOTs";

export const chatDefaultArgs: {
  userId: string;
  userToken;
  host: string;
  tenantId: string;
  apiKey: string;
  serviceAccount: string;
} = {
  userId: process.env.CHAT_USER_ID ?? MOCKED_CHAT_USER_ID,
  userToken: process.env.CHAT_USER_TOKEN ?? MOCKED_CHAT_USER_TOKEN,
  host: process.env.STORYBOOK_PLATFORM_GRAPHQL ?? "",
  tenantId: process.env.STORYBOOK_PLATFOMR_SERVICE_TENANT_ID ?? "",
  apiKey: process.env.STORYBOOK_PLATFOMR_SERVICE_API_KEY ?? "",
  serviceAccount: process.env.STORYBOOK_PLATFOMR_SERVICE_ACCOUNT ?? "",
};

export const ChatDecorator = (Story, context) => {
  const { userId, host, tenantId, apiKey, serviceAccount } = chatDefaultArgs;

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

  return (
    <RoqProvider config={config}>
      <ChatProvider userId={userId}>{Story()}</ChatProvider>
    </RoqProvider>
  );
};
