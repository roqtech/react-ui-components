import { ClassValue } from 'clsx';
import React, { ComponentType } from 'react';
import { FileListActiveUploadsInterface } from 'src/hooks/files';
import {
    CommonProps,
    CommonPropsWithChildren,
    HTMLComponentType,
    HTMLComponentTypeWithChildren
} from 'src/interfaces/react-helper.interface';
import {
    CancelIconPropsInterface,
    CancelRoundedIconPropsInterface,
    CheckIconPropsInterface,
    RestartIconPropsInterface
} from 'src/components/icons';

export interface ActiveUploadsPropsInterface {
    files: FileListActiveUploadsInterface[];
    onClose?: () => void;
    onCancel?: (temporaryId: string) => void;
    onRestart?: (temporaryId: string) => void;
    classNames?: {
        root?: ClassValue,
        titleWrapper?: ClassValue,
        title?: ClassValue,
        closeIcon?: ClassValue,
        filesListContainer?: ClassValue,
        fileRowContainer?: ClassValue,
        fileNameWrapper?: ClassValue,
        fileName?: ClassValue,
        progressRow?: ClassValue,
        progressWrap?: ClassValue,
        progress?: ClassValue,
        successFileUploadIcon?: ClassValue,
        canceledFileUploadIcon?: ClassValue,
        cancelFileUploadIcon?: ClassValue,
        failureMessageWrapper?: ClassValue,
        failureMessage?: ClassValue,
        retryUploadIconWrapper?: ClassValue,
        retryUploadIcon?: ClassValue,
    },
    components?: {
        root?: HTMLComponentTypeWithChildren,
        titleWrapper?: HTMLComponentTypeWithChildren
        title?: HTMLComponentTypeWithChildren,
        closeIcon?: ComponentType<React.SVGProps<HTMLOrSVGElement>>,
        filesListContainer?: HTMLComponentTypeWithChildren,
        fileRowContainer?: HTMLComponentTypeWithChildren,
        fileNameWrapper?: HTMLComponentTypeWithChildren,
        fileName?: HTMLComponentTypeWithChildren,
        progressRow?: HTMLComponentTypeWithChildren,
        progressWrap?: HTMLComponentTypeWithChildren,
        progress?: HTMLComponentType<{ value: number, max: number } & CommonProps>,
        successFileUploadIcon?: ComponentType<CheckIconPropsInterface>,
        canceledFileUploadIcon?: ComponentType<CancelIconPropsInterface>,
        cancelFileUploadIcon?: ComponentType<CancelRoundedIconPropsInterface>,
        failureMessageWrapper?: HTMLComponentTypeWithChildren,
        failureMessage?: HTMLComponentTypeWithChildren,
        retryUploadIconWrapper?: HTMLComponentTypeWithChildren<{ title: string } & CommonPropsWithChildren>,
        retryUploadIcon?: ComponentType<RestartIconPropsInterface>,
    },
    texts?: {
        title?: string,
        uploadFailed?: string,
        retryUpload?:  string,
    },
}
