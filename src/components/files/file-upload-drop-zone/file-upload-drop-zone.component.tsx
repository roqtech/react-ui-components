import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import { useRoqComponents } from 'src/components/core/roq-provider';
import { useFileUploader } from 'src/hooks/files';
import clsx from 'clsx';
import './file-upload-drop-zone.scss';
import { FileIcon, PlusIcon } from 'src/components/icons';
import { ActiveUploads } from 'src/components/files/active-uploads';
import {
    FileUploadDropZonePropsInterface
} from 'src/components/files/file-upload-drop-zone/file-upload-drop-zone.interface';
import { createFileUploadUrlMutation, updateFileStatusMutation } from 'src/lib/graphql/files';
import { getFileType } from 'src/utils';


const _CLASS_IS = 'roq-file-upload';
const withBaseClass = (...classes: string[]): string[] => classes.map((className) => `${_CLASS_IS}-${className}`);

export const FileUploadDropZone = (props: FileUploadDropZonePropsInterface) => {
    const {
        classNames,
        components,
        onUploadFail,
        onUploadSuccess,
        accept,
        showDropZone,
        showUploadButton
    } = props;
    const { t } = useRoqComponents();
    const [showActiveUploads, setShowActiveUploads] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {
        uploadFile,
        activeUploads,
        cancelActiveUpload,
        removeActiveUploads,
        restartFailedUpload
    } = useFileUploader({
        saveFileMutationOptions: {
            mutation: createFileUploadUrlMutation,
            variables: (file: File) => ({
                createFileDto: {
                    name: file?.name,
                    contentType: getFileType(file),
                    fileCategory: 'USER_FILES',
                }
            }),
            mutationName: 'createFileUploadUrl',
            context: { service: 'platform' },
        },
        fileStatusUpdateMutationOptions: {
            mutation: updateFileStatusMutation,
            mutationName: 'updateFileStatus',
            context: { service: 'platform' },
            variables: (file) => ({}),
        },
        onError: onUploadFail,
        onSuccess: onUploadSuccess,
    });
    const handleFileUpload = (acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            void uploadFile({
                file,
                temporaryId: uuidv4(),
            });
        });
    };
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleFileUpload,
        noClick: true,
        noKeyboard: true,
        accept: accept?.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {})
    });

    const handleUploadFileButtonClick = () => {
        fileInputRef?.current?.click();
    };

    useEffect(() => {
        if (activeUploads.length) {
            setShowActiveUploads(true);
        }
    }, [activeUploads]);


    const ActiveUploadsComponent = components?.activeUploads ?? ActiveUploads;
    const ActionBar = components?.actionBar ?? 'div';
    const UploadButton = components?.uploadButton ?? 'button';
    const UploadButtonIcon = components?.uploadButtonIcon ?? PlusIcon;
    const DropZoneWrapper = components?.dropZoneWrapper ?? 'div';
    const DropZone = components?.dropZone ?? 'div';
    const DropText = components?.dropText ?? 'p';
    const DropIcon = components?.dropIcon ?? FileIcon;
    const Input = components?.input ?? 'input';
    const DropZoneInput = components?.dropZoneInput ?? 'input';

    return (
        <>
            {
                showUploadButton && (
                    <ActionBar className={clsx(withBaseClass('action-bar'), classNames?.actionBar)}>
                        <UploadButton
                            className={clsx(withBaseClass('button', 'primary'), classNames?.uploadButton)}
                            onClick={handleUploadFileButtonClick}
                        >
                            <UploadButtonIcon
                                className={clsx(withBaseClass('button-icon'), classNames?.uploadButtonIcon)}/> &nbsp; {t('upload-file-cta')}
                        </UploadButton>
                        <Input
                            multiple
                            accept={accept?.join(',')}
                            type="file"
                            ref={fileInputRef}
                            className={clsx(withBaseClass('input'), classNames?.input)}
                            onChange={(evt) => {
                                const uploadedFiles = evt.target?.files as FileList;
                                handleFileUpload(Array.from(uploadedFiles));
                                evt.target.value = '';
                            }}
                        />
                    </ActionBar>
                )
            }
            {
                showDropZone && (
                    <DropZoneWrapper {...getRootProps()}
                                     className={clsx(withBaseClass('drop-zone-wrapper'), classNames?.dropZoneWrapper)}>
                        <DropZone className={clsx(withBaseClass('drop-zone'), classNames?.dropZone)}>
                            <DropZoneInput {...getInputProps()} />
                            <DropText className={clsx(withBaseClass('drop-text'), classNames?.dropText)}>
                                <DropIcon width="50px" height="50px" className={clsx(classNames?.dropIcon)}/>
                                <br/>
                                {t('drop-uploads-cta')}
                            </DropText>
                        </DropZone>
                    </DropZoneWrapper>
                )
            }
            {
                showActiveUploads && (
                    <ActiveUploadsComponent
                        classNames={classNames?.activeUploads}
                        files={activeUploads}
                        onRestart={restartFailedUpload}
                        onClose={() => {
                            removeActiveUploads();
                            setShowActiveUploads(false);
                        }}
                        onCancel={cancelActiveUpload}
                    />
                )
            }
        </>
    );
}

FileUploadDropZone.defaultProps = {
    showUploadButton: true,
    showDropZone: true,
}
