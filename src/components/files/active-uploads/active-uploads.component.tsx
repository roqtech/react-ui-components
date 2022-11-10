import React, { ReactElement } from 'react';
import { CancelIcon, CancelRoundedIcon, CheckIcon, RestartIcon } from 'src/components/icons';
import clsx from 'clsx';
import { ActiveUploadStatusEnum } from 'src/enums';
import { ActiveUploadsPropsInterface } from 'src/components/files/active-uploads/active-uploads-props.interface';
import './active-uploads.scss';
import { useRoqComponents } from 'src/components/core/roq-provider';

const _CLASS_IS = 'roq-active-uploads'
const withBaseClass = (className: string) => `${_CLASS_IS}-${className}`

export const ActiveUploads: React.FC<ActiveUploadsPropsInterface> = (props): ReactElement => {
    const { files, onClose, onCancel, onRestart, classNames, texts, components } = props;
    const { t } = useRoqComponents();
    const Root = components?.root || 'div';
    const TitleWrapper = components?.titleWrapper || 'div';
    const Title = components?.title || 'p';
    const CloseIcon = components?.closeIcon || CancelIcon;
    const FilesListWrapper = components?.filesListContainer || 'div';
    const FileRowContainer = components?.fileRowContainer || 'div';
    const FileNameWrapper = components?.fileNameWrapper || 'div';
    const FileName = components?.fileName || 'p';
    const ProgressRow = components?.progressRow || 'div';
    const SuccessFileUploadIcon = components?.successFileUploadIcon || CheckIcon;
    const CancelledFileUploadIcon = components?.canceledFileUploadIcon || CancelIcon;
    const ProgressWrap = components?.progressWrap || 'div';
    const Progress = components?.progress || 'progress';
    const CancelFileUploadIcon = components?.cancelFileUploadIcon || CancelRoundedIcon;
    const FailureMessageWrapper = components?.failureMessageWrapper || 'div';
    const FailureMessage = components?.failureMessage || 'p';
    const RetryUploadIconWrapper = components?.retryUploadIconWrapper || 'div';
    const RetryUploadIcon = components?.retryUploadIcon || RestartIcon;

    return (
        <Root className={clsx(_CLASS_IS, classNames?.root)}>
            <TitleWrapper
                className={clsx(withBaseClass('flex'), withBaseClass('space-between'), withBaseClass('padding-10'), classNames?.titleWrapper)}>
                <Title
                    className={clsx(withBaseClass(`title`), classNames?.title)}>{texts?.title || t('upload.in-progress')}</Title>
                <CloseIcon
                    width="20px"
                    height="20px"
                    onClick={onClose}
                    className={clsx(withBaseClass(`dismiss-button`), classNames?.closeIcon)}
                />
            </TitleWrapper>
            <FilesListWrapper className={clsx(classNames?.filesListContainer)}>
                {files.map((file, index) => (
                    <FileRowContainer
                        className={clsx(withBaseClass(`flex`), withBaseClass(`space-between`), withBaseClass(`align-items-center`), withBaseClass('row'), classNames?.fileRowContainer)}
                        key={index}>
                        <FileNameWrapper
                            className={clsx(withBaseClass(`file-name-wrap`), withBaseClass('item'), classNames?.fileNameWrapper)}>
                            <FileName
                                className={clsx(withBaseClass(`file-name`), withBaseClass(`body1`), classNames?.fileName)}
                            >
                                {file.name}
                            </FileName>
                        </FileNameWrapper>
                        <ProgressRow
                            className={clsx(withBaseClass(`progress-wrap`), withBaseClass('item'), classNames?.progressRow)}>
                            {file.status === ActiveUploadStatusEnum.SUCCESS &&
                                <SuccessFileUploadIcon
                                    className={clsx(withBaseClass(`icon`), classNames?.successFileUploadIcon)}/>
                            }
                            {file.status === ActiveUploadStatusEnum.CANCELLED &&
                                <CancelledFileUploadIcon width="20px" height="20px"
                                                         fill="#F75959FF"
                                                         className={clsx(withBaseClass(`icon`), classNames?.canceledFileUploadIcon)}
                                />
                            }
                            {file.status === ActiveUploadStatusEnum.UPLOADING && (
                                <ProgressWrap
                                    className={clsx(withBaseClass('progress-wrap'), classNames?.progressWrap)}>
                                    <Progress
                                        value={file.percentage}
                                        max={100}
                                        className={clsx(withBaseClass(`progress-bar`), withBaseClass('progress-linear'), classNames?.progress)}
                                    />
                                    {
                                        file.percentage < 99 && (
                                            <CancelFileUploadIcon
                                                width="20px"
                                                height="20px"
                                                color="inherit"
                                                className={clsx(withBaseClass(`cancel-upload-btn`), classNames?.cancelFileUploadIcon)}
                                                onClick={() => onCancel && onCancel(file.temporaryId)}
                                            />
                                        )
                                    }

                                </ProgressWrap>
                            )}
                            {file.status === ActiveUploadStatusEnum.FAILED && (
                                <>
                                    <FailureMessageWrapper
                                        className={clsx(withBaseClass(`failure-message-wrap`), classNames?.failureMessageWrapper)}>
                                        <FailureMessage
                                            className={clsx(withBaseClass(`failure-message`), withBaseClass(`body1`), classNames?.failureMessage)}>
                                            {texts?.uploadFailed || t('upload-failure')}
                                        </FailureMessage>
                                    </FailureMessageWrapper>
                                    <RetryUploadIconWrapper title={texts?.retryUpload || t('files.retry-upload')}
                                                            className={clsx(classNames?.retryUploadIconWrapper)}>
                                        <RetryUploadIcon
                                            className={clsx(withBaseClass(`restart-icon`), classNames?.retryUploadIcon)}
                                            onClick={() => onRestart && onRestart(file.temporaryId)}
                                        />
                                    </RetryUploadIconWrapper>
                                </>
                            )}
                        </ProgressRow>
                    </FileRowContainer>
                ))}
            </FilesListWrapper>
        </Root>
    );
};


ActiveUploads.defaultProps = {
    files: [],
    onClose: () => {
    },
    onCancel: (temporaryId: string) => {
    },
    onRestart: (temporaryId: string) => {
    },
    classNames: {},
    components: {},
    texts: {
        title: 'Active Uploads',
        uploadFailed: `Upload failed`,
        retryUpload: `Retry upload`,
    }
}
