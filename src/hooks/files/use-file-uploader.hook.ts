import { FileUploader } from 'src/utils';
import { FileUploadResponse, InitiateFileUploadArgsInterface } from 'src/utils/files/file-uploader';
import { FileListActiveUploadsInterface, useUserFiles } from 'src/hooks/files/use-files.hook';
import { ActiveUploadStatusEnum } from 'src/enums';
import { MutationOptionsInterface } from 'src/interfaces';

interface UploadFileInterface {
    file: File;
    temporaryId: string;
    failedFileData?: InitiateFileUploadArgsInterface['failedFileData'];
}

export interface UseFileUploaderInterface {
    uploadFile: (args: UploadFileInterface) => Promise<FileUploadResponse | undefined>;
    activeUploads: FileListActiveUploadsInterface[],
    removeActiveUploads: () => void;
    cancelActiveUpload: (temporaryId: string) => void;
    restartFailedUpload: (temporaryId: string) => void;
    removeSuccessfulUploads: () => void;

}

export interface FileUploaderOptions extends Pick<InitiateFileUploadArgsInterface,'onSuccess'| 'onError'>{
    saveFileMutationOptions:  MutationOptionsInterface<File>,
    fileStatusUpdateMutationOptions: MutationOptionsInterface<File>,
}

export const useFileUploader = (options: FileUploaderOptions): UseFileUploaderInterface => {
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

    const { saveFileMutationOptions, fileStatusUpdateMutationOptions, onError, onSuccess } = options;
    // This is just a dummy mutation to invoke `useMutation` hook during render, to avoid error that hooks can't be used outside functional component
    const fileUploader = new FileUploader({
        saveFileMutation: saveFileMutationOptions.mutation,
        updateFileStatusMutation: fileStatusUpdateMutationOptions.mutation,
    });

    const restartFailedUpload = async (temporaryId: string) => {
        const { id, file, contentType, uploadUrl } = activeUploads.find(
            (activeUpload) => activeUpload.temporaryId === temporaryId,
        ) as FileListActiveUploadsInterface;

        if (temporaryId && file) {
            await uploadFile({
                file,
                temporaryId,
                ...(id && contentType && uploadUrl ? {
                    failedFileData: {
                        id,
                        contentType,
                        uploadUrl
                    }
                } : {})
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

    const uploadFile = (args: UploadFileInterface): Promise<FileUploadResponse | undefined> => {
        const {
            file,
            temporaryId,
            failedFileData,
        } = args;
        const { saveFileMutationOptions, fileStatusUpdateMutationOptions } = options;
        return fileUploader.initiateFileUpload({
            selectedFile: file,
            saveFileMutationOptions: {
                ...saveFileMutationOptions,
                variables: ()=>saveFileMutationOptions.variables(file),
            },
            fileStatusUpdateMutationOptions:{
                ...fileStatusUpdateMutationOptions,
                variables: () => fileStatusUpdateMutationOptions.variables(file),
            },
            failedFileData,
            onError: (error) => {
                updateActiveUploadStatus({
                    temporaryId,
                    status: ActiveUploadStatusEnum.FAILED,
                    error: error.message,
                });
                onError && onError(error);
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
                !!activeUploads.find((file) => file.temporaryId === temporaryId)
                    ? resetFileUpload(temporaryId, abortController)
                    : addFileUpload(file, temporaryId, abortController),
            onSuccess: (data) => {
                updateActiveUploadStatus({
                    temporaryId,
                    status: ActiveUploadStatusEnum.SUCCESS,
                });
                addUserFile({
                    file: data,
                });
                onSuccess && onSuccess(data);
            }
        });
    }

    return {
        uploadFile,
        activeUploads,
        removeActiveUploads,
        cancelActiveUpload,
        restartFailedUpload,
        removeSuccessfulUploads
    };
};
