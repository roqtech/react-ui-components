import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppDecorators from '../../../.storybook/decorators'
import { Card } from './Card';

export default {
  title: 'ROQ/Card',
  component: Card,
  argTypes: {
    title: {
      defaultValue: 'Card title',
      control: {
        type: 'text'
      }
    },
    subTitle: {
      defaultValue: '',
      control: {
        type: 'text'
      }
    },
    headerExtraContent: {
      defaultValue: '',
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
  decorators: [AppDecorators]
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
