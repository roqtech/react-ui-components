import { FileUploadDropZone, FileUploadDropZonePropsInterface } from '../../src/components/files/file-upload-drop-zone';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { RoqProvider } from '../../src';
import { getFileType } from '../../src/utils';
import { createFileUploadUrlMutation, updateFileStatusMutation } from '../../src/lib/graphql/files';

export default {
    title: 'Roq Components/Files/File Upload Dropzone',
    component: FileUploadDropZone,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof FileUploadDropZone>;

const hostConfig = {
    host: process.env.STORYBOOK_PLATFORM_GRAPHQL ?? '',
    token: process.env.STORYBOOK_PLATFORM_TOKEN ?? '',
    userToken: process.env.STORYBOOK_USER_TOKEN ?? '',
};

const Template: ComponentStory<typeof FileUploadDropZone> = (args) => (
    <RoqProvider config={hostConfig}>
        <FileUploadDropZone {...args} />
    </RoqProvider>
);

export const Default = Template.bind({});

Default.args = {
    accept: ['image/jpeg'],
    onUploadSuccess: (file) => console.log('File was uploaded successfully', file),
    onUploadFail: (err) => console.log('Error occurred during file upload', err),
} as FileUploadDropZonePropsInterface;
