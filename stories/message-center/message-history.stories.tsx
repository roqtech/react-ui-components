import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { MessageHistory } from "../../src";

export default {
  title: 'Roq Widgets/Message Center/Message History',
  component: MessageHistory,
  argTypes: {},
} as ComponentMeta<typeof MessageHistory>;

const Template: ComponentStory<typeof MessageHistory> = (args) => (
  <div style={{ width: 520, height: 600 }}>
    <MessageHistory {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Group chat',
  messages: [
    { message: 'Hello', showCorner: true, author: { name: 'Mose Ewald', src: 'https://i.pravatar.cc/60?img=15' }, isSent: true },
    { message: 'Hi. Is there an updates?', showCorner: true, author: { name: 'Susan Gomez', src: 'https://i.pravatar.cc/60?img=1' } },
    { message: 'Yeah, let`s sync up in 10m', showCorner: true, author: { name: 'Piper Wong', src: 'https://i.pravatar.cc/60?img=14' }, isSent: true },
    { message: 'Sounds good', showCorner: true, author: { name: 'Jared Brewer', src: 'https://i.pravatar.cc/60?img=12' } },
  ],
};
