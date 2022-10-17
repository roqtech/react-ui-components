import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { MessageBubble } from "../../src";

export default {
  title: 'Roq Widgets/Message Center/Message Bubble',
  component: MessageBubble,
  argTypes: {
    isSent: { control: 'boolean' },
    showCorner: { control: 'boolean' },
  },
} as ComponentMeta<typeof MessageBubble>;

const Template: ComponentStory<typeof MessageBubble> = (args) => (
  <div style={{ width: 200 }}>
    <MessageBubble {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  date: '2 minutes ago',
  message: `Hi! How it's going?`,
};

export const Sent = Template.bind({});
Sent.args = {
  message: 'All good, thanks!',
  date: '2 minutes ago',
  isSent: true,
};

export const WithCorner = Template.bind({});
WithCorner.args = {
  message: 'All good, thanks!',
  date: '2 minutes ago',
  showCorner: true,
};
