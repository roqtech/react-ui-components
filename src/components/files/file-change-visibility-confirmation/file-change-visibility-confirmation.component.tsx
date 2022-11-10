import React, { ComponentType, ReactElement, ReactNode } from 'react';
import { ConfirmationDrawer, ConfirmationDrawerPropsInterface } from 'src/components/common/confirmation-drawer';
import { FileVisibilityStatusEnum } from 'src/enums';
import clsx, { ClassValue } from 'clsx';
import { useRoqComponents } from 'src/components/core/roq-provider';
import { LoadingIcon } from 'src/components/icons';

export interface FileChangeVisibilityConfirmationPropsInterface {
    visibilityStatus: FileVisibilityStatusEnum;
    isVisible: boolean,
    onConfirm: () => void;
    onCancel: () => void;
    onClose?: () => void;
    isLoading?: boolean;
    title?: string | ReactNode,
    message?: string | ReactNode,
    confirmButtonChildren?: string | ReactNode,
    cancelButtonChildren?: string | ReactNode,
    classNames?: {
        confirmButton?: ClassValue,
        cancelButton?: ClassValue,
    }
    components?: {
        drawer?: ComponentType<ConfirmationDrawerPropsInterface>,
    },

}

export const FileChangeVisibilityConfirmation = (
    props: FileChangeVisibilityConfirmationPropsInterface,
): ReactElement => {
    const { t } = useRoqComponents();
    const {
        isVisible,
        visibilityStatus,
        onConfirm,
        onCancel,
        onClose,
        isLoading,
        title,
        message,
        components,
        classNames,
        confirmButtonChildren,
        cancelButtonChildren
    } = props;
    const DrawerComponent = components?.drawer || ConfirmationDrawer;

    /*
   t('file.make-file-public-title')
   t('file.make-file-private-title')
   t('file.make-file-public-message')
   t('file.make-file-private-message')
   t('file.make-file-public')
   t('file.make-file-private')
 */
    return (
        <DrawerComponent
            isVisible={isVisible}
            title={title || t(`file.make-file-${visibilityStatus}-title`)}
            message={message || t(`file.make-file-${visibilityStatus}-message`)}
            onClose={onClose}
            confirmButtonProps={{
                className: clsx(classNames?.confirmButton),
                onClick: onConfirm,
                children: confirmButtonChildren || (isLoading ? <LoadingIcon/> : t(`file.make-file-${visibilityStatus}`)),
                disabled: !!isLoading,
            }}
            cancelButtonProps={{
                className: clsx(classNames?.cancelButton),
                onClick: onCancel,
                children: cancelButtonChildren ||  t('files.cancel'),
                disabled: !!isLoading,
            }}
        />
    );
};
