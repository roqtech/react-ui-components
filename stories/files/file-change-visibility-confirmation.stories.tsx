import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FileChangeVisibilityConfirmation } from 'src/components/files/file-change-visibility-confirmation';
import { FileVisibilityStatusEnum } from '../../src/enums';

export default {
    title: 'Roq Components/Files/File Change Visibility Confirmation',
    component: FileChangeVisibilityConfirmation,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof FileChangeVisibilityConfirmation>;

const Template: ComponentStory<typeof FileChangeVisibilityConfirmation> = (args) => (
    <FileChangeVisibilityConfirmation {...args} />
);

export const Default = Template.bind({});
Default.args = {
    visibilityStatus: FileVisibilityStatusEnum.public,
};
