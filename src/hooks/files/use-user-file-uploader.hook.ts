import { gql } from '@apollo/client';
import { updateFileStatusMutation } from 'src/lib/graphql/files/mutations';
import { FileUploader, getFileType } from 'src/utils';
import { FileUploadResponse } from 'src/utils/files/file-uploader';
import { UserFileListActiveUploadsInterface, useUserFiles } from 'src/hooks/files/use-user-files.hook';
import { ActiveUploadStatusEnum } from 'src/enums';

interface UploadUserFileInterface {
    file: File;
    temporaryId: string;
    failedFileData?: {
        id: string;
        contentType: string;
        uploadUrl: string;
    };
}

// #Todo: Add this mutation in the platform
const createSaveFileMutationOptions = (file: File) => ({
    mutation: gql`
        mutation saveUserFile($fileName: String!, $fileType: String!) {
            saveUserFile(data: { fileName: $fileName, fileType: $fileType }) {
                id
                uploadUrl
                contentType
            }
        }
    `,
    variables: {
        fileName: file.name,
        fileType: getFileType(file),
    },
    mutationName: 'saveUserFile',
});

const createUpdateFileStatusMutationOptions = () => ({
    mutation: updateFileStatusMutation,
    mutationName: 'updateFileStatus',
});

export const useUserFileUploader = (): {
    uploadFile: (args: UploadUserFileInterface) => Promise<FileUploadResponse | undefined>;
    removeActiveUploads: () => void;
    cancelActiveUpload: (temporaryId: string) => void;
    restartFailedUpload: (temporaryId: string) => void;
    removeSuccessfulUploads: () => void;
} => {
    const {
        addUserFile,
        activeUploads,
        addActiveUpload,
        resetActiveUpload,
        resetActiveUploads,
        updateActiveUploadDetails,
        updateActiveUploadStatus,
        updateActiveUploadPercentage,
        resetSuccessfulUploads,
    } = useUserFiles();

    const restartFailedUpload = async (temporaryId: string) => {
        const { id, file, contentType, uploadUrl } = activeUploads.find(
            (activeUpload) => activeUpload.temporaryId === temporaryId,
        ) as UserFileListActiveUploadsInterface;

        if (temporaryId && file && id && contentType && uploadUrl) {
            await uploadFile({
                file,
                temporaryId,
                failedFileData: {
                    id,
                    contentType,
                    uploadUrl,
                },
            });
        }
    };

    const addFileUpload = (file, temporaryId, abortController) => {
        addActiveUpload({
            temporaryId,
            abortController,
            file,
        });
    };

    const resetFileUpload = (temporaryId, abortController) => {
        resetActiveUpload({
            temporaryId,
            abortController,
        });
    };

    const updateFileProgress = (percentage: number, temporaryId: string) => {
        updateActiveUploadPercentage({
            temporaryId,
            percentage,
        });
    };

    const removeActiveUploads = () => {
        resetActiveUploads();
    };

    const removeSuccessfulUploads = () => {
        resetSuccessfulUploads()
    }

    const cancelActiveUpload = async (temporaryId) => {
        const file = activeUploads.find((activeUpload) => activeUpload.temporaryId === temporaryId);
        if (file?.abortController) {
            file.abortController.abort();
            updateActiveUploadStatus({
                temporaryId,
                status: ActiveUploadStatusEnum.CANCELLED,
            })
        }
    };

    const uploadFile = (args: UploadUserFileInterface): Promise<FileUploadResponse | undefined> => {
        const {
            file,
            temporaryId,
            failedFileData,
        } = args;
        return new FileUploader().initiateFileUpload({
            selectedFile: file,
            saveFileMutationOptions: createSaveFileMutationOptions(file),
            fileStatusUpdateMutationOptions: createUpdateFileStatusMutationOptions(),
            onError: (error) => {
                updateActiveUploadStatus({
                    temporaryId,
                    status: ActiveUploadStatusEnum.FAILED,
                    error: error.message,
                });
            },
            onAfterStart: (data) => {
                updateActiveUploadDetails({
                    temporaryId,
                    id: data.id,
                    uploadUrl: data.uploadUrl,
                    contentType: data.contentType,
                });
            },
            onProgress: (percentage) => updateFileProgress(percentage, temporaryId),
            onBeforeStart: (abortController) =>
                !!failedFileData
                    ? resetFileUpload(temporaryId, abortController)
                    : addFileUpload(file, temporaryId, abortController),
            onSuccess: (data) => {
                updateActiveUploadStatus({
                    temporaryId,
                    status: ActiveUploadStatusEnum.SUCCESS,
                });
                addUserFile({
                    file: data.updateFileStatus,
                });
            },
            failedFileData,
        });
    }

    return {
        uploadFile,
        removeActiveUploads,
        cancelActiveUpload,
        restartFailedUpload,
        removeSuccessfulUploads
    };
};
