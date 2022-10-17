import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppDecorators from '../../../.storybook/decorators'
import { Card } from './Card';

export default {
  title: 'Roq Widgets/Card',
  component: Card,
  argTypes: {
    title: {
      defaultValue: 'Card title',
      control: {
        type: 'text'
      }
    },
    subTitle: {
      control: {
        type: 'text'
      }
    },
    headerExtraContent: {
      control: {
        type: 'text'
      }
    },
    children: {
      defaultValue: 'Description of card',
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => {
  return <Card {...args} />
};

export const Primary = Template.bind({});