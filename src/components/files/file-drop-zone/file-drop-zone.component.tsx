import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import { useRoqComponents } from 'src/components/core/roq-provider';
import { useFileUploader } from 'src/hooks/files';
import clsx from 'clsx';
import { PlusIcon, UploadIcon as _UploadIcon } from 'src/components/icons';
import { ActiveUploads } from 'src/components/files/active-uploads';
import { FileDropZonePropsInterface } from 'src/components/files/file-drop-zone/file-drop-zone.interface';
import { createFileUploadUrlMutation, updateFileStatusMutation } from 'src/lib/graphql/files';
import { getFileType } from 'src/utils';
import './file-drop-zone.scss';
import { COMPONENT_CLASS_PREFIX } from 'src/utils/constant';

const _CLASS_IS = `${COMPONENT_CLASS_PREFIX}file-drop-zone`;
const withBaseClass = (...classes: string[]): string[] => classes.map((className) => `roq-file-drop-zone-${className}`);

export const FileDropZone = (props: FileDropZonePropsInterface) => {
    const {
        classNames,
        components,
        onUploadFail,
        onUploadSuccess,
        accept,
        showDropZone,
        showUploadButton,
        fileCategory,
        fileAssociationOptions,
        customMetaData
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
                    fileCategory,
                    fileAssociationOptions,
                    customMetaData
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
    const TopRow = components?.topRow ?? 'div';
    const Title = components?.title ?? 'h2';
    const UploadButtonContainer = components?.uploadButtonContainer ?? 'div';
    const UploadButton = components?.uploadButton ?? 'button';
    const UploadButtonIcon = components?.uploadButtonIcon ?? PlusIcon;
    const DropZoneContainer = components?.dropZoneContainer ?? 'div';
    const DropZoneWrapper = components?.dropZoneWrapper ?? 'div';
    const DropText = components?.dropText ?? 'p';
    const UploadIcon = components?.uploadIcon ?? _UploadIcon;
    const Input = components?.input ?? 'input';
    const DropZoneInput = components?.dropZoneInput ?? 'input';

    return (
        <div className={clsx(_CLASS_IS)}>
            {
                showUploadButton && (
                    <TopRow className={clsx(`${_CLASS_IS}__top-row`, classNames?.topRow)}>
                        <Title className={clsx(`${_CLASS_IS}__title`)}>{t('files.title')}</Title>
                        <UploadButtonContainer className={clsx(classNames?.uploadButtonContainer)}>
                            <UploadButton
                                className={clsx(`${_CLASS_IS}__upload-btn`, classNames?.uploadButton)}
                                onClick={handleUploadFileButtonClick}
                            >
                                <UploadButtonIcon
                                    className={clsx(`${_CLASS_IS}__upload-btn-icon`, classNames?.uploadButtonIcon)}/> &nbsp; {t('upload-file-cta')}
                            </UploadButton>
                            <Input
                                multiple
                                accept={accept?.join(',')}
                                type="file"
                                ref={fileInputRef}
                                className={clsx(`${_CLASS_IS}__upload-btn-input`)}
                                onChange={(evt) => {
                                    const uploadedFiles = evt.target?.files as FileList;
                                    handleFileUpload(Array.from(uploadedFiles));
                                    evt.target.value = '';
                                }}
                            />
                        </UploadButtonContainer>
                    </TopRow>
                )
            }
            {
                showDropZone && (
                    <DropZoneContainer {...getRootProps()}
                                       className={clsx(`${_CLASS_IS}__container`, classNames?.dropZoneContainer)}>
                        <DropZoneWrapper className={clsx(`${_CLASS_IS}__wrapper`, classNames?.dropZoneWrapper)}>
                            <DropZoneInput {...getInputProps()} />
                            <UploadIcon className={clsx(`${_CLASS_IS}__upload-icon`, classNames?.uploadIcon)}/>
                            <DropText className={clsx(`${_CLASS_IS}__drop-text`, classNames?.dropText)}>
                                {t('drop-uploads-pre')}&nbsp;<span>{t('drop-uploads-cta')}</span> {t('drop-uploads-post')}
                            </DropText>
                        </DropZoneWrapper>
                    </DropZoneContainer>
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
        </div>
    );
}

FileDropZone.defaultProps = {
    showUploadButton: true,
    showDropZone: true,
}
