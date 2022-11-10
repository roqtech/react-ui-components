import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { getFileExtension } from 'src/utils/files';
import { useCopyToClipboard } from 'react-use';
import { FileOperationNameEnum, FileVisibilityStatusEnum } from 'src/enums/files';
import { useFileOperations } from 'src/hooks/files/use-file-operations.hook';
import { useFileUpdateForm } from 'src/hooks/files';
import { FileChangeVisibilityConfirmation } from 'src/components/files/file-change-visibility-confirmation';
import { Drawer } from 'src/components/common/drawer/drawer.component';
import { LinkIcon as Link, LoadingIcon as _LoadingIcon, LockIcon, PublicIcon as Public } from 'src/components/icons';
import clsx from 'clsx';
import { useRoqComponents } from 'src/components/core/roq-provider';
import { SkeletonBox } from 'src/components/common/skeleton-box';
import './file-edit.scss';
import { FileEditFormActionOverlayInterface } from 'src/components/files/file-edit/file-edit.interface';
import { FileInterface } from 'src/interfaces';


const _CLASS_IS = 'roq-file-edit';
const withBaseClass = (className: string) => clsx(`${_CLASS_IS}-${className}`);

/*
  t('file.made-private-successfully')
  t('file.made-public-successfully')
*/
const operationNameSuccessMessageMapping = {
    [FileOperationNameEnum.makeFilePrivate]: 'file.made-private-successfully',
    [FileOperationNameEnum.makeFilePublic]: 'file.made-public-successfully',
};
export const FileEditFormActionOverlay: FunctionComponent<FileEditFormActionOverlayInterface> = (props) => {
    const {
        file,
        components,
        title,
        classNames,
        onClose,
        isLoading,
        showCopyUrlButton,
        onCopyUrl,
        onFileUpdateError,
        onFileUpdateSuccess,
        showMakeFilePublicButton,
        showMakeFilePrivateButton,
        onMakeFilePublicSuccess,
        onMakeFilePrivateSuccess,
        onMakeFilePrivateError,
        onMakeFilePublicError
    } = props;
    const { t } = useRoqComponents();
    const [isDrawerVisible, setDrawerVisibility] = useState(props.drawer.isVisible);
    const { handleSubmit, handleChange, values, visibleErrors, dirty, isValid, isSubmitting } =
        useFileUpdateForm({ file, onSuccess: onFileUpdateSuccess, onError: onFileUpdateError });
    const [, copyToClipboard] = useCopyToClipboard();
    const [showMakePublicDialog, setShowMakePublicDialog] = useState(false);
    const [showMakePrivateDialog, setShowMakePrivateDialog] = useState(false);
    const fileExtension = getFileExtension(file.name);

    const onFileChangedToPublicSuccess = useCallback(
        (result, operationName) => {
            if (operationName === FileOperationNameEnum.makeFilePublic) {
                copyToClipboard(result?.data?.makeFilePublic.url);
                setShowMakePublicDialog(false);
                setDrawerVisibility(true);
                onMakeFilePublicSuccess && onMakeFilePublicSuccess(result?.data?.makeFilePublic);
            } else if (operationName === FileOperationNameEnum.makeFilePrivate) {
                setShowMakePrivateDialog(false);
                setDrawerVisibility(true);
                onMakeFilePrivateSuccess && onMakeFilePrivateSuccess(result?.data?.makeFilePrivate);
            }
        },
        [showMakePublicDialog, showMakePrivateDialog],
    );

    const { makeFilePublic, currentOperation, resetState, makeFilePrivate } = useFileOperations({
        onSuccess: onFileChangedToPublicSuccess,
        onError: (err, operationName)=>{
            if (operationName === FileOperationNameEnum.makeFilePublic) {
                onMakeFilePublicError && onMakeFilePublicError(err);
            }else  if (operationName === FileOperationNameEnum.makeFilePrivate) {
                onMakeFilePrivateError && onMakeFilePrivateError(err);
            }
        }
    });

    useEffect(() => {
        setDrawerVisibility(props.drawer.isVisible);
    }, [props.drawer]);


    const handleCopyUrl = useCallback(() => {
        copyToClipboard(file.url as string);
        onCopyUrl && onCopyUrl(file.url as string);
    }, [copyToClipboard, onCopyUrl]);

    const handleMakePublic = () => {
        setDrawerVisibility(false);
        setShowMakePublicDialog(true);
    };
    const handleMakePublicClose = () => {
        setShowMakePublicDialog(false);
        setDrawerVisibility(true);

    };
    const handleMakePrivate = () => {
        setDrawerVisibility(false);
        setShowMakePrivateDialog(true);
    };
    const handleMakePrivateClose = () => {
        setShowMakePrivateDialog(false);
        setDrawerVisibility(true);
    };

    const DrawerComponent = components?.drawer || Drawer;
    const Paper = components?.paper || 'div';
    const Form = components?.form || 'form';
    const FormSection = components?.formSection || 'div';
    const Title = components?.title || 'h3';
    const Column = components?.column || 'div';
    const Row = components?.row || 'div';
    const MakeFilPrivateButton = components?.makeFilPrivateButton || 'button';
    const MakeFilPublicButton = components?.makeFilPublicButton || 'button';
    const CopyUrlButton = components?.copyUrlButton || 'button';
    const CancelButton = components?.cancelButton || 'button';
    const SaveButton = components?.saveButton || 'button';
    const ActionButtonRow = components?.actionButtonRow || 'div';
    const PublicIcon = components?.publicIcon || Public;
    const PrivateIcon = components?.privateIcon || LockIcon;
    const LinkIcon = components?.linkIcon || Link;
    const MakePrivateDrawer = components?.makePrivateDialog || FileChangeVisibilityConfirmation;
    const MakePublicDrawer = components?.makePublicDialog || FileChangeVisibilityConfirmation;
    const Skeleton = components?.skeletonBox || SkeletonBox;
    const LoadingIcon = components?.loadingIcon || _LoadingIcon;

    return (
        <>
            <DrawerComponent {...props.drawer} isVisible={isDrawerVisible} classNames={classNames?.drawer}>
                <Paper className={clsx(withBaseClass('grid'), withBaseClass('paper'), classNames?.paper)}>
                    <Title
                        className={clsx(withBaseClass('title'), withBaseClass('h-3'), withBaseClass('top-section-title'), classNames?.title)}>
                        {title || t('file.edit.title')}
                    </Title>
                    <Form className={clsx(withBaseClass('form'), classNames?.form)}
                          onSubmit={handleSubmit}
                    >
                        <FormSection
                            className={clsx(
                                withBaseClass('form-section'),
                                withBaseClass('row'),
                                classNames?.formSection
                            )}
                        >
                            <Column className={clsx(withBaseClass('column'), classNames?.column)}>
                                {
                                    isLoading && (
                                        <Skeleton rows={1} height="2em" classNames={classNames?.skeletonBox}/>
                                    )
                                }
                                {
                                    !isLoading && (
                                        <div
                                            className={clsx(withBaseClass('form-group'), Boolean(visibleErrors.name) ? withBaseClass('has-error') : '')}>
                                            <input name="name" type="text" required value={values.name}
                                                   onChange={handleChange}
                                                   className={clsx(withBaseClass('input'))}/>
                                            <label htmlFor="input"
                                                   className={clsx(withBaseClass('control-label'))}>{t('file.edit.name-field-label')}</label><i
                                            className={clsx(withBaseClass('bar'))}></i>
                                            {
                                                Boolean(visibleErrors.name) && (
                                                    <p className={clsx(withBaseClass('form-help'))}>{visibleErrors.name}</p>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </Column>
                            <Column className={clsx(withBaseClass('column'), classNames?.column)}>
                                {
                                    isLoading && (
                                        <Skeleton rows={1} height="2em" classNames={classNames?.skeletonBox}/>
                                    )
                                }
                                {
                                    !isLoading && (
                                        <div className={clsx(withBaseClass('form-group'))}>
                                            <input name="extension" type="text" required value={`.${fileExtension}`}
                                                   onChange={handleChange}
                                                   className={clsx(withBaseClass('input'), withBaseClass('extension'))}/>
                                            <label htmlFor="input"
                                                   className={clsx(withBaseClass('control-label'))}>{t('file.extension')}</label><i
                                            className={clsx(withBaseClass('bar'))}></i>
                                        </div>
                                    )
                                }
                            </Column>
                        </FormSection>
                        <FormSection
                            className={clsx(
                                withBaseClass('form-section'),
                                classNames?.formSection,
                            )}
                        >
                            <Row className={clsx(withBaseClass('row'), classNames?.row)}>
                                {
                                    isLoading && (
                                        <div className={clsx(withBaseClass('column'), classNames?.column)}>
                                            <Skeleton height="2em" classNames={classNames?.skeletonBox}/>
                                        </div>
                                    )
                                }
                                {
                                    !isLoading && (file.isPublic ? (
                                            <>
                                                {
                                                    showMakeFilePrivateButton && (
                                                        <div className={clsx(withBaseClass('column'), classNames?.column)}>
                                                            <MakeFilPrivateButton
                                                                type="button"
                                                                className={clsx(withBaseClass('button-outlined'), withBaseClass('center'), classNames?.makeFilPrivateButton)}
                                                                onClick={handleMakePrivate}
                                                            >
                                                                <PrivateIcon
                                                                    width="20px"
                                                                    height="20px"
                                                                    className={clsx(withBaseClass('icon'), classNames?.privateIcon)}/> &nbsp;{t('file.make-file-private')}
                                                            </MakeFilPrivateButton>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    showCopyUrlButton && (
                                                        <div className={clsx(withBaseClass('column'), classNames?.column)}>
                                                            <CopyUrlButton
                                                                className={clsx(withBaseClass('button-outlined'), withBaseClass('center'), classNames?.copyUrlButton)}
                                                                type="button"
                                                                onClick={handleCopyUrl}
                                                            >
                                                                <LinkIcon
                                                                    width="20px"
                                                                    height="20px"
                                                                    className={clsx(withBaseClass('icon'), withBaseClass('link-icon'), classNames?.linkIcon)
                                                                    }
                                                                /> &nbsp;{t('file.copy-file-public-link')}
                                                            </CopyUrlButton>
                                                        </div>
                                                    )
                                                }
                                            </>
                                        ) : showMakeFilePublicButton && (
                                            <MakeFilPublicButton
                                                className={clsx(withBaseClass('button-outlined'), withBaseClass('center'), classNames?.makeFilPublicButton)}
                                                onClick={handleMakePublic}
                                            >
                                                <PublicIcon
                                                    width="20px"
                                                    height="20px"
                                                    className={clsx(withBaseClass('icon'), classNames?.publicIcon)}/> &nbsp;{t('file.make-file-public')}
                                            </MakeFilPublicButton>
                                        )
                                    )
                                }
                            </Row>
                        </FormSection>
                        <ActionButtonRow className={clsx(withBaseClass('bottom'), classNames?.actionButtonRow)}>
                            <SaveButton
                                type="submit"
                                className={clsx(withBaseClass('m-10'), withBaseClass('solid-button'), withBaseClass('button-primary'), classNames?.saveButton)}
                                disabled={!isValid || !dirty || isSubmitting}
                            >
                                {isSubmitting ? <LoadingIcon className={clsx(classNames?.loadingIcon)}/> : t('save')}
                            </SaveButton>

                            <CancelButton
                                className={clsx(withBaseClass('button-outlined'), withBaseClass('button-outlined-error'), withBaseClass('m-10'), classNames?.cancelButton)}
                                onClick={onClose}
                            >
                                {t('cancel')}
                            </CancelButton>
                        </ActionButtonRow>
                    </Form>
                </Paper>
            </DrawerComponent>
            <MakePublicDrawer
                isVisible={showMakePublicDialog}
                visibilityStatus={FileVisibilityStatusEnum.public}
                isLoading={currentOperation?.isLoading}
                onConfirm={() => {
                    makeFilePublic(file as FileInterface);
                }}
                onCancel={handleMakePublicClose}
                onClose={handleMakePublicClose}
            />
            <MakePrivateDrawer
                isVisible={showMakePrivateDialog}
                visibilityStatus={FileVisibilityStatusEnum.private}
                isLoading={currentOperation?.isLoading}
                onConfirm={() => {
                    makeFilePrivate(file as FileInterface);
                }}
                onCancel={handleMakePrivateClose}
                onClose={handleMakePrivateClose}
            />
        </>
    );
};


FileEditFormActionOverlay.defaultProps = {
    showCopyUrlButton: true,
    showMakeFilePublicButton: true,
    showMakeFilePrivateButton: true,
}
