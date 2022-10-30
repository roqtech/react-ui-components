import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useEffect, useState } from "react";

import { Chat, ChatProvider, SocketProvider } from "../../src";

export default {
  title: "Roq Components/Chat/Chat",
  component: Chat,
  argTypes: {
    secure: { control: "boolean" },
    platformUrl: { control: "text" },
    platformToken: { control: "text" },
    userId: { control: "text" },
  },
} as ComponentMeta<typeof Chat>;

const Template: ComponentStory<typeof Chat> = ({
  secure,
  platformUrl,
  platformToken,
  userId,
  conversationId,
  ...args
}) => {
  const [_secure, setSecure] = useState(secure);
  const [_platformUrl, setPlatformUrl] = useState(platformUrl);
  const [_platformToken, setPlatformToken] = useState(platformToken);
  const [_userId, setUserId] = useState(userId);
  const [initialized, setInitialized] = useState(true);

  useEffect(() => {
    if (initialized) {
      setInitialized(false);
    }

    setSecure(secure);
    setPlatformUrl(platformUrl);
    setPlatformToken(platformToken);
    setUserId(userId);

    let t = setTimeout(() => {
      setInitialized(true);
    }, 300);

    return () => {
      clearTimeout(t);
    };
  }, [secure, platformUrl, platformToken, userId]);

  if (!initialized) {
    return "Initializing...";
  }

  return (
    <SocketProvider
      secure
      platformUrl={_platformUrl}
      platformToken={_platformToken}
    >
      <ChatProvider userId={_userId}>
        <div style={{ height: "calc(70vh)", minHeight: "700px" }}>
          <Chat />
        </div>
      </ChatProvider>
    </SocketProvider>
  );
};

const MOCKED_PLATFORM_HOST =
  "https://roq-core-snapshot-gateway.roq-platform.com/v01/";
const MOCKED_PLATFORM_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6IkNIQU5HRV9NRV8yIiwidXNlcklkIjoiNDhhODJjMDMtM2ZhYy00YzRmLTk2NjMtYjA0MGI5MzIwZDI0IiwiaWF0IjoxNjY2ODczNTEzLCJleHAiOjE2NjY5NTk5MTN9.ONWRlLjmQBEnJ2yh1hoffPyKwo4tkFGPC22bOPDSCoc";
const MOCKED_ROQ_USER_ID = "48a82c03-3fac-4c4f-9663-b040b9320d24";

export const Default = Template.bind({});
Default.args = {
  secure: true,
  platformUrl: process.env.PLATFORM_HOST ?? MOCKED_PLATFORM_HOST,
  platformToken: process.env.PLATFORM_TOKEN ?? MOCKED_PLATFORM_TOKEN,
  userId: process.env.ROQ_USER_ID ?? MOCKED_ROQ_USER_ID,
};
