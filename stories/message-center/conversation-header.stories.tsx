import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ConversationHeader } from "../../src";

export default {
  title: 'Roq Widgets/Message Center/Conversation Header',
  component: ConversationHeader,
  argTypes: {},
} as ComponentMeta<typeof ConversationHeader>;

const Template: ComponentStory<typeof ConversationHeader> = (args) => (
  <div style={{ width: 520 }}>
    <ConversationHeader {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Group chat',
  members: [
    { name: 'Mose Ewald', src: 'https://i.pravatar.cc/60?img=15' },
    { name: 'Susan Gomez', src: 'https://i.pravatar.cc/60?img=1' },
    { name: 'Piper Wong', src: 'https://i.pravatar.cc/60?img=14' },
    { name: 'Jared Brewer', src: 'https://i.pravatar.cc/60?img=12' },
  ],
};
