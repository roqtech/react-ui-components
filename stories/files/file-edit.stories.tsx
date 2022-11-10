import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { FileEditComponent, FileEditPropsInterface } from 'src/components/files/file-edit';
import { RoqProvider } from '../../src';

export default {
    title: 'Roq Components/Files/File Edit',
    component: FileEditComponent,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof FileEditComponent>;
const hostConfig = {
    host: process.env.STORYBOOK_PLATFORM_GRAPHQL ?? '',
    token: process.env.STORYBOOK_PLATFORM_TOKEN ?? '',
    userToken: process.env.STORYBOOK_USER_TOKEN ?? '',
};


const Template: ComponentStory<typeof FileEditComponent> = (args) => (
    <RoqProvider config={hostConfig}>
        <FileEditComponent {...args} />
    </RoqProvider>
);

export const Default = Template.bind({});
const defaultArgs: FileEditPropsInterface = {
    fileId: '285769e3-86c0-479e-b980-a475225d076a',
    drawer: {
        isVisible: true,
    },
    showCopyUrlButton: true,
    onCopyUrl: (url) => console.log(`URL Copied`, url),
    onFileUpdateSuccess: (file) => console.log('(onFileUpdateSuccess)', file),
    onFileUpdateError: (err) => console.error('(onFileUpdateError)', err),

    onMakeFilePublicSuccess: (file) => console.log('(onMakeFilePublicSuccess)', file),
    onMakeFilePublicError: (err) => console.error('(onMakeFilePrivateError)', err),

    onMakeFilePrivateSuccess: (file) => console.log('(onMakeFilePrivateSuccess)', file),
    onMakeFilePrivateError: (err) => console.error('(onMakeFilePrivateError)', err),

    onClose: () => {
        console.log('On Closed called!')
    },
}

Default.args = {
    ...defaultArgs,
}


const WithoutVisibilityChangeActionsTemplate: ComponentStory<typeof FileEditComponent> = (args) => (
    <RoqProvider config={hostConfig}>
        <FileEditComponent {...args} />
    </RoqProvider>
);

export const WithoutVisibilityChangeActions = WithoutVisibilityChangeActionsTemplate.bind({});

WithoutVisibilityChangeActions.args = {
    ...defaultArgs,
    showCopyUrlButton: false,
    showMakeFilePublicButton: false,
    showMakeFilePrivateButton: false,
};
