import { MessageFilled as AntdMessageIcon } from '@ant-design/icons';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button as AntdButton, Badge as AntdBadge } from 'antd';
import React from 'react';

import { MessagesNotificationBell } from "../../src";

export default {
  title: 'Roq Widgets/Message Center/Messages Notification Bell',
  component: MessagesNotificationBell,
  argTypes: {
    isSent: { control: 'boolean' },
    showCorner: { control: 'boolean' },
  },
} as ComponentMeta<typeof MessagesNotificationBell>;

const Template: ComponentStory<typeof MessagesNotificationBell> = (args) => (
  <div style={{ width: 200 }}>
    <MessagesNotificationBell {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  unreadCount: 2,
};

export const WithMaxCount = Template.bind({});
WithMaxCount.args = {
  unreadCount: 16,
  maxUnreadCount: 15,
};

const CustomNotificationIcon = (props) => (
  <svg viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="currentColor" fillRule="evenodd">
      <path d="M20 3H4C1.8 3 0 4.8 0 7v10c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V7c0-2.2-1.8-4-4-4zm1.6 5.8-7.9 5.3c-.5.3-1.1.5-1.7.5s-1.2-.2-1.7-.5L2.4 8.8c-.4-.3-.5-.9-.2-1.4.3-.4.9-.5 1.4-.2l7.9 5.3c.3.2.8.2 1.1 0l7.9-5.3c.5-.3 1.1-.2 1.4.3.2.4.1 1-.3 1.3z" />
    </g>
  </svg>
);

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  unreadCount: 100,
  components: {
    Icon: CustomNotificationIcon,
  },
};
