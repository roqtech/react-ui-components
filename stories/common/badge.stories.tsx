import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Badge } from '../../src';

export default {
  title: 'Roq Components/Common/Badge',
  component: Badge,
  argTypes: {
    maxValue: { control: 'number' },
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 2,
};

export const MaxValue = Template.bind({});
MaxValue.args = {
  children: 521,
  maxValue: 500,
};
