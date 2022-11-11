import { FileDropZone } from '../../src/components/files/file-drop-zone';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { RoqProvider } from '../../src';

export default {
    title: 'Roq Components/Files/File Upload Dropzone',
    component: FileDropZone,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof FileDropZone>;

const hostConfig = {
    host: process.env.STORYBOOK_PLATFORM_GRAPHQL ?? '',
    token: process.env.STORYBOOK_PLATFORM_TOKEN ?? '',
    userToken: process.env.STORYBOOK_USER_TOKEN ?? '',
};

const Template: ComponentStory<typeof FileDropZone> = (args) => (
    <RoqProvider config={hostConfig}>
        <FileDropZone {...args} />
    </RoqProvider>
);

export const Default = Template.bind({});

Default.args = {
    accept: ['image/jpeg'],
    fileCategory: 'USER_FILES',
    fileAssociationOptions:[],
    onUploadSuccess: (file) => console.log('File was uploaded successfully', file),
    onUploadFail: (err) => console.log('Error occurred during file upload', err),
};
