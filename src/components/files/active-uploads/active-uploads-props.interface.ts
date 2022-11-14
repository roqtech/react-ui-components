import { ClassValue } from 'clsx';
import { ComponentType } from 'react';
import { FileListActiveUploadsInterface } from 'src/hooks/files';
import { CommonProps, CommonPropsWithChildren, HTMLComponentType } from 'src/interfaces/react-helper.interface';
import { RestartIconPropsInterface } from 'src/components/icons';

export interface ActiveUploadsPropsInterface {
    files: FileListActiveUploadsInterface[];
    onClose?: () => void;
    onCancel?: (temporaryId: string) => void;
    onRestart?: (temporaryId: string) => void;
    classNames?: {
        root?: ClassValue,
        container?: ClassValue,
        titleContainer?: ClassValue,
        title?: ClassValue,
        fileRow?: ClassValue,
        fileIconColumn: ClassValue,
        fileIconContainer: ClassValue,
        fileIcon: ClassValue,
        detailsColumn: ClassValue,
        fileInfoRow: ClassValue,
        fileNameAndSizeColumn: ClassValue,
        fileName?: ClassValue,
        retryUploadIcon?: ClassValue,
        fileSizeRow: ClassValue,
        fileSize: ClassValue,
        fileStatusColumn: ClassValue,
        fileStatus: ClassValue,
        progressRow?: ClassValue,
        progressBarRow?: ClassValue,
        progressContainer?: ClassValue,
        progress?: ClassValue,
        progressPercentageColumn?: ClassValue,
        progressPercentage?: ClassValue,
        successFileUploadIcon?: ClassValue,
        canceledFileUploadIcon?: ClassValue,
        errorUploadIcon?: ClassValue,
        deleteUploadIcon?: ClassValue,
    },
    components?: {
        root?: ComponentType<CommonPropsWithChildren>,
        container?: ComponentType<CommonPropsWithChildren>,
        titleContainer?: ComponentType<CommonPropsWithChildren>
        title?: ComponentType<CommonPropsWithChildren>,
        fileRow?: ComponentType<CommonPropsWithChildren>,
        fileIconColumn: ComponentType<CommonPropsWithChildren>,
        fileIconContainer: ComponentType<CommonPropsWithChildren>,
        fileIcon: ComponentType<CommonProps>
        detailsColumn: ComponentType<CommonPropsWithChildren>,
        fileInfoRow: ComponentType<CommonPropsWithChildren>,
        fileNameAndSizeColumn: ComponentType<CommonPropsWithChildren>,
        fileName?: ComponentType<CommonPropsWithChildren>,
        retryUploadIcon?: ComponentType<CommonProps>,
        fileSizeRow: ComponentType<CommonPropsWithChildren>,
        fileSize: ComponentType<CommonPropsWithChildren>,
        fileStatusColumn: ComponentType<CommonPropsWithChildren>,
        fileStatus: ComponentType<CommonPropsWithChildren>,
        progressRow?: ComponentType<CommonPropsWithChildren>,
        progressBarRow?: ComponentType<CommonPropsWithChildren>,
        progressContainer?: ComponentType<CommonPropsWithChildren>,
        progress?: HTMLComponentType<{ value: number, max: number } & CommonProps>,
        progressPercentageColumn?: ComponentType<CommonPropsWithChildren>,
        progressPercentage?: ComponentType<CommonPropsWithChildren>,
        successFileUploadIcon?: ComponentType<CommonPropsWithChildren>,
        canceledFileUploadIcon?: ComponentType<CommonPropsWithChildren>,
        errorUploadIcon?: ComponentType<CommonPropsWithChildren>,
        deleteUploadIcon?: ComponentType<CommonPropsWithChildren>
    },
    texts?: {
        title?: string,
        uploadFailed?: string,
        retryUpload?:  string,
    },
}
