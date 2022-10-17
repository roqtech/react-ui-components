import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { StackedText } from './stacked-text';

export default {
  title: 'Roq Widgets/Typography/StackedText',
  component: StackedText,
  argTypes: {
    primaryText: { control: 'string' },
    secondaryText: { control: 'string' },
    secondaryText: { control: 'string' },
  },
} as ComponentMeta<typeof StackedText>;

const Template: ComponentStory<typeof StackedText> = (args) => <StackedText {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Hello World!',
};

export const PrimaryText = Template.bind({});
PrimaryText.args = {
  primaryText: 'Title',
};

export const WithSecondaryText = Template.bind({});
WithSecondaryText.args = {
  primaryText: 'Primary text',
  secondaryText: 'Secondary text',
};

export const WithSecondaryTertiaryText = Template.bind({});
WithSecondaryTertiaryText.args = {
  primaryText: 'Primary text',
  secondaryText: 'Secondary text',
  tertiaryText: 'Tertiary text',
};
