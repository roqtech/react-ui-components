import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Drawer } from 'src/components/common/drawer';

export default {
    title: 'Roq Components/Common/Drawer',
    component: Drawer,
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => {
    return (
        <Drawer {...args}>
            <div style={{ backgroundColor: 'white' }}>
                <h1>Hello</h1>
            </div>
        </Drawer>
    )
};

export const Default = Template.bind({});

Default.args = {
    isVisible: true,
};
