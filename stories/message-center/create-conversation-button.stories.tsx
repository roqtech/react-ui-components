import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { CreateConversationButton } from "../../src";

export default {
  title: 'Roq Widgets/Message Center/Create Conversation Button',
  component: CreateConversationButton,
  argTypes: {
    lastMessage: { control: 'string' },
  },
} as ComponentMeta<typeof CreateConversationButton>;

const Template: ComponentStory<typeof CreateConversationButton> = (args) => (
  <div style={{ width: 320 }}>
    <CreateConversationButton {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
