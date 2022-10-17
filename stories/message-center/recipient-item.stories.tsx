import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Recipient } from "../../src";

export default {
  title: 'Roq Widgets/Message Center/Recipient',
  component: Recipient,
  argTypes: {
    lastMessage: { control: 'string' },
  },
} as ComponentMeta<typeof Recipient>;

const Template: ComponentStory<typeof Recipient> = (args) => (
  <div style={{ width: 320 }}>
    <Recipient {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  recipient: { name: 'Mose Ewald', src: 'https://i.pravatar.cc/60?img=15' },
};

export const Selected = Template.bind({});
Selected.args = {
  selected: true,
  recipient: { name: 'Mose Ewald', src: 'https://i.pravatar.cc/60?img=15' },
};
