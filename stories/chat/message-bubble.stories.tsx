import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ChatMessageBubble } from "../../src";

export default {
  title: 'Roq Components/Chat/Message Bubble',
  component: ChatMessageBubble,
  argTypes: {
    isSent: { control: 'boolean' },
    showCorner: { control: 'boolean' },
  },
} as ComponentMeta<typeof ChatMessageBubble>;

const Template: ComponentStory<typeof ChatMessageBubble> = (args) => (
  <div style={{ width: 200 }}>
    <ChatMessageBubble {...args} />
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
