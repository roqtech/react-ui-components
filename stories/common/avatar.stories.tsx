import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Avatar } from '../../src';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Roq Components/Common/Avatar',
  component: Avatar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    rounded: { control: 'boolean' },
    square: { control: 'boolean' },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
  },
} as ComponentMeta<typeof Avatar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Initials = Template.bind({});
Initials.args = {
  initials: 'AB',
  size: 'medium',
};

export const FullName = Template.bind({});
FullName.args = {
  name: 'Mose Ewald',
};

export const Image = Template.bind({});
Image.args = {
  src: 'https://i.pravatar.cc/40?img=15',
};

export const Size = Template.bind({});
Size.args = {
  size: 'large',
};
