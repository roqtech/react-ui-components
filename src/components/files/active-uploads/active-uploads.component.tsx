import React, { ReactElement } from 'react';
import { CancelIcon, CheckIcon, FileIcon as _FileIcon, RestartIcon, TrashIcon } from 'src/components/icons';
import clsx from 'clsx';
import { ActiveUploadStatusEnum } from 'src/enums';
import { ActiveUploadsPropsInterface } from 'src/components/files/active-uploads/active-uploads-props.interface';
import './active-uploads.scss';
import { useRoqComponents } from 'src/components/core/roq-provider';
import { COMPONENT_CLASS_PREFIX } from 'src/utils/constant';
import { ErrorIcon } from 'src/components/icons/error.icon';
import { useFilesTable } from 'src/hooks/files';

const _CLASS_IS = `${COMPONENT_CLASS_PREFIX}active-uploads`;
const withBaseClass = (classNames: string[]) => classNames.map((className) => `${_CLASS_IS}__${className}`);

export const ActiveUploads: React.FC<ActiveUploadsPropsInterface> = (props): ReactElement => {
    const { files, onClose, onCancel, onRestart, classNames, texts, components } = props;
    const { parseFileSize } = useFilesTable();
    const { t } = useRoqComponents();
    const Root = components?.root || 'div';
    const Container = components?.container || 'div';
    const TitleContainer = components?.titleContainer || 'div';
    const Title = components?.title || 'h2';
    const FileRow = components?.fileRow || 'div';
    const FileIconColumn = components?.fileIconColumn || 'div';
    const FileIconContainer = components?.fileIconContainer || 'div';
    const FileIcon = components?.fileIcon || _FileIcon;
    const DetailColumn = components?.detailsColumn || 'div';
    const FileInfoRow = components?.fileInfoRow || 'div';
    const FileNameAndSizeColumn = components?.fileNameAndSizeColumn || 'div';
    const FileName = components?.fileName || 'p';
    const RetryUploadIcon = components?.retryUploadIcon || RestartIcon;
    const FileSizeRow = components?.fileSizeRow || 'div';
    const FileSize = components?.fileSize || 'p';
    const ProgressRow = components?.progressRow || 'div';
    const ProgressBarRow = components?.progressBarRow || 'div';
    const ProgressContainer = components?.progressContainer || 'div';
    const Progress = components?.progress || 'progress';
    const ProgressPercentageColumn = components?.progressPercentageColumn || 'div';
    const ProgressPercentage = components?.progressPercentage || 'p';

    return (
        <Root className={clsx(_CLASS_IS, classNames?.root)}>
            <Container className={clsx(`${_CLASS_IS}__container`, classNames?.container)}>
                <TitleContainer
                    className={clsx(`${_CLASS_IS}__title-container`, classNames?.titleContainer)}>
                    <Title
                        className={clsx(`${_CLASS_IS}__title`, classNames?.title)}>{texts?.title || t('files.upload.uploaded')}</Title>
                </TitleContainer>
                {files.map((file, index) => (
                    <FileRow
                        className={clsx(`${_CLASS_IS}__list-item`, classNames?.fileRow)}
                        key={index}>
                        <FileIconColumn className={clsx(`${_CLASS_IS}__file-icon-column`, classNames?.fileIconColumn)}>
                            <FileIconContainer
                                className={clsx(`${_CLASS_IS}__file-icon-container`, classNames?.fileIconColumn)}>
                                <FileIcon className={clsx(`${_CLASS_IS}__file_icon`, classNames?.fileIcon)}/>
                            </FileIconContainer>
                        </FileIconColumn>
                        <DetailColumn className={clsx(`${_CLASS_IS}__details-column`, classNames?.detailsColumn)}>
                            <FileInfoRow
                                className={clsx(`${_CLASS_IS}__file-info-row`, classNames?.fileInfoRow)}>
                                <FileNameAndSizeColumn
                                    className={clsx(`${_CLASS_IS}__file-name-and-size-column`, classNames?.fileNameAndSizeColumn)}>
                                    <FileName
                                        className={clsx(`${_CLASS_IS}__file-name`, classNames?.fileName)}
                                    >
                                        {file.name}
                                    </FileName>
                                    {
                                        (file.status === ActiveUploadStatusEnum.FAILED || file.status === ActiveUploadStatusEnum.CANCELLED) && (
                                            <RetryUploadIcon
                                                width={22}
                                                height={22}
                                                className={clsx(`${_CLASS_IS}__restart-upload-icon`, classNames?.retryUploadIcon)}
                                                onClick={() => onRestart && onRestart(file.temporaryId)}
                                            />
                                        )
                                    }
                                    <FileSizeRow
                                        className={clsx(`${_CLASS_IS}__file-size-row`, classNames?.fileSizeRow)}>
                                        <FileSize className={clsx(`${_CLASS_IS}__file-size`, classNames?.fileSize)}>
                                            {parseFileSize(file.size)}
                                        </FileSize>
                                    </FileSizeRow>
                                </FileNameAndSizeColumn>
                                <FileStatusColumn
                                    file={file}
                                    components={props.components}
                                    classNames={props.classNames}
                                />
                            </FileInfoRow>
                            <ProgressRow className={clsx(`${_CLASS_IS}__progress-row`, classNames?.progressRow)}>
                                <ProgressBarRow
                                    className={clsx(`${_CLASS_IS}__progress-bar-row`, classNames?.progressBarRow)}>
                                    <ProgressContainer
                                        className={clsx(classNames?.progressContainer)}>
                                        <Progress
                                            value={file.percentage}
                                            max={100}
                                            className={clsx(`${_CLASS_IS}__progress-bar`, classNames?.progress)}
                                        />
                                    </ProgressContainer>
                                </ProgressBarRow>
                                <ProgressPercentageColumn className={clsx(`${_CLASS_IS}__progress-percentage-column`)}>
                                    <ProgressPercentage
                                        className={clsx(`${_CLASS_IS}__progress-percentage`, classNames?.progressPercentage)}>{file.percentage} %</ProgressPercentage>
                                </ProgressPercentageColumn>
                            </ProgressRow>
                        </DetailColumn>
                    </FileRow>
                ))}
            </Container>
        </Root>
    );
};


const FileStatusColumn = ({ file, classNames, components }) => {
    const { t } = useRoqComponents();
    const FileStatusColumn = components?.fileStatusColumn || 'div'
    const FileStatus = components?.fileStatus || 'p'
    const SuccessFileUploadIcon = components?.successFileUploadIcon || CheckIcon;
    const CancelledFileUploadIcon = components?.canceledFileUploadIcon || CancelIcon;
    const DeleteUploadIcon = components?.deleteUploadIcon || TrashIcon;
    const ErrorUploadIcon = components?.errorUploadIcon || ErrorIcon;

    return (
        <FileStatusColumn className={clsx(`${_CLASS_IS}__file-status-column`, classNames?.fileStatusColumn)}>
            {file.status === ActiveUploadStatusEnum.SUCCESS && (
                <>
                    <FileStatus className={clsx(`${_CLASS_IS}__file-status`, classNames?.fileStatus)}>
                        {t('files.upload.successfully')}
                    </FileStatus>
                    <SuccessFileUploadIcon
                        className={clsx(classNames?.successFileUploadIcon)}
                    />
                </>
            )}
            {file.status === ActiveUploadStatusEnum.CANCELLED && (
                <>
                    <FileStatus className={clsx(`${_CLASS_IS}__file-status`, classNames?.fileStatus)}>
                        {t('files.upload.cancelled')}
                    </FileStatus>
                    <CancelledFileUploadIcon
                        className={clsx(`${_CLASS_IS}__cancel-icon`, classNames?.canceledFileUploadIcon)}
                    />
                </>
            )
            }
            {file.status === ActiveUploadStatusEnum.FAILED && (
                <>
                    <FileStatus className={clsx(`${_CLASS_IS}__file-status`, classNames?.fileStatus)}>
                        {t('files.upload.failed')}
                    </FileStatus>
                    <ErrorUploadIcon
                        className={clsx(classNames?.errorUploadIcon)}
                    />
                </>
            )}

            {file.status === ActiveUploadStatusEnum.UPLOADING && (
                <DeleteUploadIcon
                    className={clsx(`${_CLASS_IS}__delete-icon`, classNames?.deleteUploadIcon)}
                />
            )}
        </FileStatusColumn>
    )
}
ActiveUploads.defaultProps = {
    files: [],
    onClose: () => {
    },
    onCancel: (temporaryId: string) => {
    },
    onRestart: (temporaryId: string) => {
    },
}
