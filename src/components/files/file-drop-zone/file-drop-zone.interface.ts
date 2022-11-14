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
        topRow?: HTMLComponentTypeWithChildren,
        title?: HTMLComponentTypeWithChildren,
        uploadButtonContainer?: HTMLComponentTypeWithChildren,
        uploadButton?: HTMLComponentTypeWithChildren<{ onClick: () => void } & CommonPropsWithChildren>
        uploadButtonIcon?: ComponentType<PlusIconPropsInterface>,
        dropZoneContainer?: HTMLComponentTypeWithChildren,
        dropZoneWrapper?: HTMLComponentTypeWithChildren<DropzoneRootProps & CommonPropsWithChildren>,
        dropZoneInput?: ComponentType<DropzoneInputProps>,
        dropText?: HTMLComponentTypeWithChildren
        uploadIcon?: ComponentType<FileIconPropsInterface>,
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
        topRow?: ClassValue,
        title?: ClassValue,
        uploadButtonContainer?: ClassValue,
        uploadButton?: ClassValue,
        uploadButtonIcon?: ClassValue,
        dropZoneContainer?: ClassValue,
        dropZoneWrapper?: ClassValue,
        dropText?: ClassValue,
        uploadIcon?: ClassValue,
    }
}
