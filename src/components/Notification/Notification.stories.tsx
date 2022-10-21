import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppDecorators from '../../../.storybook/decorators'
import { Notification } from './Notification';
import { NotificationBadge as RNotificationBadge } from './NotificationBadge';

export default {
  title: 'ROQ/Notification',
  component: Notification,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  argTypes: {
    host: {
      defaultValue: 'https://roq-core-snapshot-gateway.roq-platform.com/v01/graphql',
      control: {
        type: 'text'
      }
    },
    token: {
      control: {
        type: 'text'
      },
      description: 'Token to access the API'
    },
    loadingView: {
      control: {
        type: null
      },
      description: 'Callback render when loading'
    },
    contentView: {
      control: {
        type: null
      },
      description: 'Callback render of notification items'
    },
  }
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => (
  <Notification
    {...args}
  />
)

export const Primary = Template.bind({});
Primary.args = {
  host: undefined
}

export const CustomCss = (args) => (
  <Notification
    {...args}
    titleProps={{
      css: {
        span: {
          backgroundColor: "var(--colors-green9)"
        }
      }
    }}
    typeToggleProps={{
      css: {
        'button[data-state="on"]': {
          backgroundColor: "var(--colors-green9)"
        }
      }
    }}
  />
)
CustomCss.args = {
  host: undefined
}

export const NotificationBadge = (args) => (
  <RNotificationBadge {...args} />
)
NotificationBadge.args = {
  count: 4,
  host: undefined,
  css: {
    backgroundColor: 'var(--colors-blue9)',
    color: 'var(--colors-red11)'
  }
}
