import { FileUploaderOptions } from 'src/hooks/files/use-file-uploader.hook';
import { ChangeEventHandler, ComponentType, RefObject } from 'react';
import { ActiveUploadsPropsInterface } from 'src/components/files/active-uploads/active-uploads-props.interface';
import { HTMLComponentType } from 'src/interfaces';
import { ClassValue } from 'clsx';
import {
    CommonProps,
    CommonPropsWithChildren,
    HTMLComponentTypeWithChildren
} from 'src/interfaces/react-helper.interface';
import { FileIconPropsInterface, PlusIconPropsInterface } from 'src/components/icons';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import { CreateFileUploadUrlMutationVariables } from 'src/lib/graphql/hooks/generated';

export interface FileDropZonePropsInterface extends Pick<CreateFileUploadUrlMutationVariables['createFileDto'], 'fileAssociationOptions' | 'fileCategory' | 'customMetaData'> {
    accept?: string[],
    showUploadButton?: boolean,
    showDropZone?: boolean,
    onUploadSuccess?: FileUploaderOptions['onSuccess'],
    onUploadFail?: FileUploaderOptions['onError'],
    components?: {
        activeUploads?: ComponentType<ActiveUploadsPropsInterface>,
        actionBar?: HTMLComponentTypeWithChildren,
        uploadButton?: HTMLComponentTypeWithChildren<{ onClick: () => void } & CommonPropsWithChildren>
        uploadButtonIcon?: ComponentType<PlusIconPropsInterface>,
        dropZoneWrapper?: HTMLComponentTypeWithChildren<DropzoneRootProps & CommonPropsWithChildren>,
        dropZone?: HTMLComponentTypeWithChildren,
        dropZoneInput?: ComponentType<DropzoneInputProps>,
        dropText?: HTMLComponentTypeWithChildren
        dropIcon?: ComponentType<FileIconPropsInterface>,
        input?: HTMLComponentType<{
            multiple: true,
            accept?: string,
            type: 'file',
            ref: RefObject<HTMLInputElement>
            onChange: ChangeEventHandler<HTMLInputElement>
        } & CommonProps>,
    },
    classNames?: {
        activeUploads?: ActiveUploadsPropsInterface['classNames'],
        actionBar?: ClassValue,
        uploadButton?: ClassValue,
        uploadButtonIcon?: ClassValue,
        dropZoneWrapper?: ClassValue,
        dropZone?: ClassValue,
        dropText?: ClassValue,
        dropIcon?: ClassValue,
        input?: ClassValue,
    }
}
