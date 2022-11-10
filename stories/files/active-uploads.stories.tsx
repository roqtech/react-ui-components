import React, { useCallback, useEffect, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ActiveUploads } from 'src/components/files/active-uploads';
import { ActiveUploadStatusEnum } from 'src/enums';
import { ActiveUploadsPropsInterface } from '../../src/components/files/active-uploads/active-uploads-props.interface';
import { CancelIcon, CancelRoundedIcon, CheckIcon } from '../../src/components/icons';
import { FileListActiveUploadsInterface } from '../../src/hooks/files';

export default {
    title: 'Roq Components/Files/Active Uploads',
    component: ActiveUploads,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof ActiveUploads>;

let Template: ComponentStory<typeof ActiveUploads> = (args) => (
    <ActiveUploads {...args} />
);

const files = [
    {
        name: 'Test File',
        status: ActiveUploadStatusEnum.UPLOADING,
        percentage: 80,
        temporaryId: 'uploading',
        uploadUrl: '',
        abortController: new AbortController(),
        size: 8000,
    },
    {
        name: 'Completed',
        status: ActiveUploadStatusEnum.SUCCESS,
        percentage: 100,
        temporaryId: 'success',
        uploadUrl: '',
        abortController: new AbortController(),
        size: 8000,
    },
    {
        name: 'Failed',
        status: ActiveUploadStatusEnum.FAILED,
        percentage: 0,
        temporaryId: 'failed',
        uploadUrl: '',
        abortController: new AbortController(),
        size: 8000,
    },
    {
        name: 'Cancelled',
        status: ActiveUploadStatusEnum.CANCELLED,
        percentage: 0,
        temporaryId: 'cancelled',
        uploadUrl: '',
        abortController: new AbortController(),
        size: 8000,
    }
]
export const Default = Template.bind({});
Default.args = { files };

Template = (args) => (
    <ActiveUploads {...args} />
);


export const Customized = Template.bind({});

Customized.parameters = {
    docs: {
        description: {
            story: 'Active uploads widget with customized texts and icons',
        },
    },
};
Customized.args = {
    files,
    classNames: {},
    components: {
        closeIcon: () => <CancelRoundedIcon stroke="red" color="red"/>,
        cancelFileUploadIcon: CancelIcon,
        successFileUploadIcon: () => <CheckIcon fill="#333"/>
    },
    texts: {
        title: 'Aktive Uploads',
        retryUpload: `Hochladen erneut versuchen`,
        uploadFailed: `Upload fehlgeschlagen `
    }
} as ActiveUploadsPropsInterface;


Template = () => {
    const [visibility, setVisibility] = useState<boolean>(true);
    const [activeUploads, setActiveUploads] = useState<FileListActiveUploadsInterface[]>([
        {
            name: 'File will be uploaded successfully',
            status: ActiveUploadStatusEnum.UPLOADING,
            percentage: 0,
            temporaryId: 'uploading',
            uploadUrl: '',
            abortController: new AbortController(),
            size: 8000,
        }
    ]);

    useEffect(() => {
        const interval = setInterval(() => setActiveUploads((prev) => {
            if (!prev.length) {
                return prev;
            }
            const [file] = prev;
            if (file.status !== ActiveUploadStatusEnum.UPLOADING) {
                return prev;
            }
            if (file.percentage < 100) {
                return [{ ...file, percentage: file.percentage + 10 }]
            }
            clearInterval(interval);
            return [{ ...file, percentage: file.percentage + 1, status: ActiveUploadStatusEnum.SUCCESS }]
        }), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const onCancel = useCallback((id) => {
        setActiveUploads((prev) => prev.map((file) => {
            if (file.temporaryId === id) {
                file.abortController?.abort();
                return { ...file, status: ActiveUploadStatusEnum.CANCELLED };
            }
            return file;
        }))
    }, [setActiveUploads])

    return (
        <>
            {
                visibility && (
                    <ActiveUploads
                        files={activeUploads}
                        onCancel={onCancel}
                        onClose={() => {
                            setVisibility(false);
                            setActiveUploads([])
                        }}
                    />
                )
            }
        </>
    );
}


export const SuccessfulUpload = Template.bind({});

SuccessfulUpload.args = {};

SuccessfulUpload.parameters = {
    docs: {
        description: {
            story: 'Demonstrate a successful file upload scenario',
        },
    },
};


Template = () => {
    const [visibility, setVisibility] = useState<boolean>(true);
    const [activeUploads, setActiveUploads] = useState<FileListActiveUploadsInterface[]>([
        {
            name: 'File will fail',
            status: ActiveUploadStatusEnum.UPLOADING,
            percentage: 0,
            temporaryId: 'uploading',
            uploadUrl: '',
            abortController: new AbortController(),
            size: 8000,
        }
    ]);

    useEffect(() => {
        const interval = setInterval(() => setActiveUploads((prev) => {
            if (!prev.length) {
                return prev;
            }
            const [file] = prev;
            if (file.status !== ActiveUploadStatusEnum.UPLOADING) {
                return prev;
            }
            if (file.percentage < 70) {
                return [{ ...file, percentage: file.percentage + 10 }]
            }
            clearInterval(interval);
            return [{ ...file, percentage: file.percentage + 1, status: ActiveUploadStatusEnum.FAILED }]
        }), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const onCancel = useCallback((id) => {
        setActiveUploads((prev) => prev.map((file) => {
            if (file.temporaryId === id) {
                file.abortController?.abort();
                return { ...file, status: ActiveUploadStatusEnum.CANCELLED };
            }
            return file;
        }))
    }, [setActiveUploads]);

    const onRestart = useCallback((id) => {
        setActiveUploads((prev) => prev.map((file) => {
            if (file.temporaryId === id) {
                return { ...file, status: ActiveUploadStatusEnum.UPLOADING, percentage: 0 };
            }
            return file;
        }))
    }, [setActiveUploads])

    return (
        <>
            {
                visibility && (
                    <ActiveUploads
                        files={activeUploads}
                        onCancel={onCancel}
                        onClose={() => {
                            setVisibility(false);
                            setActiveUploads([])
                        }}
                        onRestart={onRestart}
                    />
                )
            }
        </>
    );
}

export const FailedUpload = Template.bind({});

FailedUpload.args = {};

FailedUpload.parameters = {
    docs: {
        description: {
            story: 'Demonstrate a failed file upload scenario and restart mechanism',
        },
    },
};

