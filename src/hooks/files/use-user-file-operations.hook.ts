import { saveAs } from 'file-saver';
import { useCallback, useState } from 'react';
import {
  useAsyncOperations,
  UseAsyncOperationsConfigMapInterface,
  UseAsyncOperationsCurrentOperationInterface
} from 'src/hooks/use-async-operations.hook';
import { AsyncOperationConfigInterface, FileInterface, OperationConfirmationInterface } from 'src/interfaces';
import { FileOperationNameEnum } from 'src/enums/files';
import {
  useDeleteFilesMutation,
  useMakeFilePrivateMutation,
  useMakeFilePublicMutation,
  useUpdateFileMutation
} from 'src/lib/graphql/hooks/generated';

type FileOperationsConfigInterface = UseAsyncOperationsConfigMapInterface & {
  deleteFiles: AsyncOperationConfigInterface<FileInterface[]>;
  downloadFiles: AsyncOperationConfigInterface<FileInterface[]>;
  makeFilePublic: AsyncOperationConfigInterface<FileInterface>;
  makeFilePrivate: AsyncOperationConfigInterface<FileInterface>;
}

interface UseDeleteUserFileInterface extends OperationConfirmationInterface {
  deleteFiles: (files: FileInterface[]) => void;
  downloadFiles: (files: FileInterface[]) => void;
  selectUserFiles: (files: FileInterface[]) => void;
  makeFilePublic: (file: FileInterface) => void;
  makeFilePrivate: (file: FileInterface) => void;
  currentOperation: UseAsyncOperationsCurrentOperationInterface<FileOperationsConfigInterface,
      keyof FileOperationsConfigInterface> | null;
  resetState: () => void;
  selectedUserFiles: FileInterface[];
}

interface UseFileOperationsInterface {
  onSuccess?: (result?: unknown, operationName?: FileOperationNameEnum) => void;
  onError?: (error: Error, operationName: FileOperationNameEnum) => void;
}

export const useUserFileOperations = ({
                                        onSuccess,
                                        onError
                                      }: UseFileOperationsInterface): UseDeleteUserFileInterface => {
  const [deleteFiles] = useDeleteFilesMutation();
  const [makeFilePublic] = useMakeFilePublicMutation();
  const [makeFilePrivate] = useMakeFilePrivateMutation();
  const [updateUserFile] = useUpdateFileMutation();
  const [selectedUserFiles, setSelectedUserFiles] = useState<FileInterface[]>([]);

  const downloadFiles = useCallback(async (files: FileInterface[]) => {
    await Promise.all(files.map(async (file) => {
      const response = await fetch(file.url);
      const blob = await response.blob();
      saveAs(blob, file.name);
    }))
  }, []);

  const handleOnSuccess = useCallback((result, operationName) => {
    onSuccess?.(result, operationName)

    if (operationName === FileOperationNameEnum.deleteFiles) {
      setSelectedUserFiles([]);
    } else if (
        [
          FileOperationNameEnum.makeFilePrivate,
          FileOperationNameEnum.makeFilePublic
        ].includes(operationName)) {
      return updateUserFile({ variables: { updateFileDto: result.file, id: result.file.id } })
    }
  }, [onSuccess]);

  const {
    initiateOperation,
    onConfirm,
    onCancel,
    currentOperation,
    resetState,
  } = useAsyncOperations({
    operations: {
      [FileOperationNameEnum.deleteFiles]: {
        callback: useCallback(async (files) => {
          return deleteFiles({
            variables: {
              ids: (files as FileInterface[]).map(({ id }) => id)
            }
          });
        }, [deleteFiles]),
        confirmable: true,
      },
      [FileOperationNameEnum.downloadFiles]: {
        callback: useCallback((files) => downloadFiles(files as FileInterface[]), [downloadFiles]),
        confirmable: false,
      },
      [FileOperationNameEnum.makeFilePublic]: {
        callback: useCallback((file) => makeFilePublic({
          variables: {
            id: (file as FileInterface).id,
          }
        }), [makeFilePublic]),
        confirmable: false,
      },
      [FileOperationNameEnum.makeFilePrivate]: {
        callback: useCallback((file) => makeFilePrivate({
          variables: {
            id: (file as FileInterface).id,
          }
        }), [makeFilePrivate]),
        confirmable: false,
      },
    },
    onSuccess: handleOnSuccess,
    onError
  });

  return {
    deleteFiles: useCallback(
        (files: FileInterface[]) => initiateOperation(FileOperationNameEnum.deleteFiles, files),
        [initiateOperation]
    ),
    downloadFiles: useCallback(
        (files: FileInterface[]) => initiateOperation(FileOperationNameEnum.downloadFiles, files),
        [initiateOperation]
    ),
    makeFilePublic: useCallback(
        (file: FileInterface) => initiateOperation(FileOperationNameEnum.makeFilePublic, file),
        [initiateOperation]
    ),
    makeFilePrivate: useCallback(
        (file: FileInterface) => initiateOperation(FileOperationNameEnum.makeFilePrivate, file),
        [initiateOperation]
    ),
    selectUserFiles: setSelectedUserFiles,
    onConfirm,
    onCancel,
    currentOperation,
    resetState,
    selectedUserFiles,
  };
}

