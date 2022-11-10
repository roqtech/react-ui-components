import { FileQuery } from 'src/lib/graphql/hooks/generated';
import { ComponentType, FormEvent, ReactNode } from 'react';
import { DrawerPropsInterface } from 'src/components/common/drawer/drawer.component';
import { ClassValue } from 'clsx';
import { SkeletonBoxPropsInterface } from 'src/components/common/skeleton-box';
import { FileInterface, HTMLComponentType } from 'src/interfaces';
import {
    FileChangeVisibilityConfirmationPropsInterface
} from 'src/components/files/file-change-visibility-confirmation';
import {
    CommonProps,
    CommonPropsWithChildren,
    HTMLComponentTypeWithChildren
} from 'src/interfaces/react-helper.interface';
import { LinkIconPropsInterface, LockIconPropsInterface, PublicIconPropsInterface } from 'src/components/icons';
import { LoadingIconPropsInterface } from 'src/components/icons/loading.icon';

export interface FileEditFormActionOverlayInterface {
    file: FileQuery['file'];
    isLoading?: boolean;
    title?: string | ReactNode,
    onClose?: () => void;
    drawer: DrawerPropsInterface,
    showCopyUrlButton?: boolean,
    onCopyUrl?: (url: string) => void,
    showMakeFilePublicButton?: boolean,
    showMakeFilePrivateButton?: boolean,
    onFileUpdateSuccess?: (file) => void;
    onFileUpdateError?: (err: Error) => void;
    onMakeFilePrivateSuccess?: (file: FileInterface) => void;
    onMakeFilePrivateError?: (err: Error) => void;
    onMakeFilePublicSuccess?: (file: FileInterface) => void;
    onMakeFilePublicError?: (err: Error) => void;
    classNames?: {
        drawer?: DrawerPropsInterface['classNames'],
        title?: ClassValue,
        paper?: ClassValue,
        form?: ClassValue,
        formSection?: ClassValue,
        column?: ClassValue,
        row?: ClassValue,
        makeFilPublicButton?: ClassValue,
        makeFilPrivateButton?: ClassValue,
        copyUrlButton?: ClassValue,
        saveButton?: ClassValue,
        cancelButton?: ClassValue,
        actionButtonRow: ClassValue,
        publicIcon: ClassValue,
        linkIcon: ClassValue,
        privateIcon: ClassValue,
        skeletonBox?: SkeletonBoxPropsInterface['classNames']
        loadingIcon?: ClassValue
    },
    components?: {
        drawer?: ComponentType<DrawerPropsInterface>,
        paper?: HTMLComponentTypeWithChildren,
        form?: HTMLComponentTypeWithChildren<{
            onSubmit: (e?: FormEvent<HTMLFormElement>) => void,
        } & CommonPropsWithChildren>,
        formSection?: HTMLComponentTypeWithChildren,
        column?: HTMLComponentTypeWithChildren,
        row?: HTMLComponentTypeWithChildren,
        title?: HTMLComponentTypeWithChildren,
        makeFilPublicButton?: HTMLComponentTypeWithChildren<{
            onClick: () => void
        } & CommonPropsWithChildren>,
        makeFilPrivateButton?: HTMLComponentTypeWithChildren<{
            onClick: () => void
        } & CommonPropsWithChildren>,
        copyUrlButton?: HTMLComponentTypeWithChildren<{
            onClick: () => void
        } & CommonPropsWithChildren>,
        actionButtonRow: HTMLComponentTypeWithChildren,
        saveButton?: HTMLComponentTypeWithChildren<{
            type: 'submit',
            disabled: boolean,
        } & CommonPropsWithChildren>,
        cancelButton?: HTMLComponentTypeWithChildren<{
            onClick: FileEditFormActionOverlayInterface['onClose'],
        } & CommonPropsWithChildren>,
        publicIcon: ComponentType<PublicIconPropsInterface>,
        linkIcon: ComponentType<LinkIconPropsInterface>,
        privateIcon: ComponentType<LockIconPropsInterface>,
        makePrivateDialog?: ComponentType<FileChangeVisibilityConfirmationPropsInterface>
        makePublicDialog?: ComponentType<FileChangeVisibilityConfirmationPropsInterface>,
        skeletonBox?: ComponentType<SkeletonBoxPropsInterface>,
        loadingIcon?: ComponentType<LoadingIconPropsInterface>
    }
}

export interface FileEditPropsInterface extends Omit<FileEditFormActionOverlayInterface, 'file'> {
    fileId: string
}
