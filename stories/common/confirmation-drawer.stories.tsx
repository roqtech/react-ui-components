import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ConfirmationDrawer } from 'src/components/common/confirmation-drawer';

export default {
    title: 'Roq Components/Common/ConfirmationDrawer',
    component: ConfirmationDrawer,
} as ComponentMeta<typeof ConfirmationDrawer>;

const Template: ComponentStory<typeof ConfirmationDrawer> = (args) => {
    return (
        <ConfirmationDrawer
            {...args}
        />
    )
};

export const Default = Template.bind({});

Default.args = {
    isVisible: true,
    title: 'Confirmation Title',
    message: 'orem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate a justo in suscipit. Donec pellentesque justo non dolor interdum varius. Nam elementum sapien tincidunt tortor molestie tempus. Cras justo sem',
    confirmButtonProps: {
        children: 'Confirm'
    },
    cancelButtonProps: {
        children: 'Cancel'
    }
};

const TemplateWithActionHandlers: ComponentStory<typeof ConfirmationDrawer> = (args) => {
    const [isVisible, setVisibility] = useState<boolean>(true);
    return (
        <ConfirmationDrawer
            {...args}
            isVisible={isVisible}
            onClose={() => setVisibility(false)}
            cancelButtonProps={{ ...args.cancelButtonProps, onClick: () => setVisibility(false) }}
            confirmButtonProps={{ ...args.confirmButtonProps, onClick: () => setVisibility(false) }}
        />
    )
};

export const WithActionHandlers = TemplateWithActionHandlers.bind({});

const { isVisible, ...rest } = Default.args;
WithActionHandlers.args = rest;
