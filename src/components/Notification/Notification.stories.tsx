import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppDecorators from '../../../.storybook/decorators'
import { Notification } from './Notification';

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
      }
    },
  }
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => (
  <Notification
    {...args}
  />
)

export const Primary = Template.bind({});

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
