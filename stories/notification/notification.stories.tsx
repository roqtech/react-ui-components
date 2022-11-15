import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NotificationDecorator } from './notification.decorator'
import { Notification } from '../../src';

export default {
  title: 'Roq Components/Notification/List',
  component: Notification,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
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
  },
  decorators: [
    NotificationDecorator,
    (Story) => <div style={{padding: '1rem'}}>{Story()}</div>
  ],
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => (
  <Notification
    {...args}
  />
)

export const Primary = Template.bind({});
