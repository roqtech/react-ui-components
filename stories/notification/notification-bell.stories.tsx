import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppDecorators from '../../.storybook/decorators'
import { NotificationBell } from '../../src';

export default {
  title: 'Roq Components/NotificationBell',
  component: NotificationBell,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: {
        type: null
      },
      description: 'Callback render when loading'
    },
    dotView: {
      control: {
        type: null
      },
      description: 'Callback render when loading'
    },
  }
} as ComponentMeta<typeof NotificationBell>;

const Template: ComponentStory<typeof NotificationBell> = (args) => (
  <NotificationBell
    {...args}
  />
)

export const Primary = Template.bind({});
Primary.args = {
  host: undefined,
  token: undefined,
}

export const Secondary = (args) => (
  <NotificationBell
    bellIcon={
      <svg
        width='24'
        height='24'
        viewBox='0 0 15 15'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{marginRight: 4}}
      >
        <path
          d='M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z'
          fill='currentColor'
          fill-rule='evenodd'
          clip-rule='evenodd'
        ></path>
      </svg>
    }
  />
)
Secondary.args = {
  host: undefined,
  token: undefined,
}
