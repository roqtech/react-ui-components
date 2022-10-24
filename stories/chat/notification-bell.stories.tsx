import { MessageFilled as AntdMessageIcon } from "@ant-design/icons";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button as AntdButton, Badge as AntdBadge } from "antd";
import React from "react";

import { ChatNotificationBell, ChatProvider } from "../../src";

export default {
  title: "Roq Components/Chat/Notification Bell",
  component: ChatNotificationBell,
  argTypes: {
    unreadCount: { control: "number" },
    maxUnreadCount: { control: "number" },
    showZero: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <ChatProvider
        secure
        platformUrl={process.env.PLATFORM_HOST}
        platformToken={process.env.PLATFORM_TOKEN}
        userId={process.env.ROQ_USER_ID}
      >
        <Story />
      </ChatProvider>
    ),
  ],
} as ComponentMeta<typeof ChatNotificationBell>;

const Template: ComponentStory<typeof ChatNotificationBell> = (args) => (
  <div style={{ width: 200 }}>
    <ChatNotificationBell {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  showZero: true,
};

export const WithMaxCount = Template.bind({});
WithMaxCount.args = {
  maxUnreadCount: 5,
  showZero: true,
};

const CustomNotificationIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="currentColor" fillRule="evenodd">
      <path d="M20 3H4C1.8 3 0 4.8 0 7v10c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V7c0-2.2-1.8-4-4-4zm1.6 5.8-7.9 5.3c-.5.3-1.1.5-1.7.5s-1.2-.2-1.7-.5L2.4 8.8c-.4-.3-.5-.9-.2-1.4.3-.4.9-.5 1.4-.2l7.9 5.3c.3.2.8.2 1.1 0l7.9-5.3c.5-.3 1.1-.2 1.4.3.2.4.1 1-.3 1.3z" />
    </g>
  </svg>
);

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  unreadCount: 100,
  showZero: true,
  components: {
    Icon: CustomNotificationIcon,
  },
};
