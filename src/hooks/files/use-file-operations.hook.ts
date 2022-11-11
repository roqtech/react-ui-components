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
  useMakeFilePublicMutation
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

export interface UseFileOperationsInterface {
  onSuccess?: (result?: unknown, operationName?: FileOperationNameEnum) => void;
  onError?: (error: Error, operationName: FileOperationNameEnum) => void;
}

export const useFileOperations = (props: UseFileOperationsInterface): UseDeleteUserFileInterface => {
  const {
    onSuccess,
    onError,
  } = props;

  const [deleteFiles] = useDeleteFilesMutation({ context: { service: 'platform' } });
  const [makeFilePublic] = useMakeFilePublicMutation({ context: { service: 'platform' } });
  const [makeFilePrivate] = useMakeFilePrivateMutation({ context: { service: 'platform' } });
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
    }
  }, [onSuccess]);

  const operations = {
    [FileOperationNameEnum.deleteFiles]: {
      callback: useCallback(async (files) => {
        if (deleteFiles) {
          return deleteFiles({
            variables: {
              ids: (files as FileInterface[]).map(({ id }) => id)
            },
          });
        }
      }, [deleteFiles]),
      confirmable: true,
    },
    [FileOperationNameEnum.downloadFiles]: {
      callback: useCallback((files) => downloadFiles(files as FileInterface[]), [downloadFiles]),
      confirmable: false,
    },
    [FileOperationNameEnum.makeFilePublic]: {
      callback: useCallback((file) => {
        if (makeFilePublic) {
          return makeFilePublic({
            variables: {
              id: (file as FileInterface).id,
            },
          })
        }
        return Promise.resolve({});
      }, [makeFilePublic]),
      confirmable: false,
    },
    [FileOperationNameEnum.makeFilePrivate]: {
      callback: useCallback((file) => {
        if (makeFilePrivate) {
          return makeFilePrivate({
            variables: {
              id: (file as FileInterface).id,
            }
          })
        }
        return Promise.resolve({});
      }, [makeFilePrivate]),
      confirmable: false,
    },
  }
  const {
    initiateOperation,
    onConfirm,
    onCancel,
    currentOperation,
    resetState,
  } = useAsyncOperations<typeof operations>({
    operations,
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

