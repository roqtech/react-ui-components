import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FileOrderSortEnum, FilesQuery, OrderEnum } from 'src/lib/graphql/hooks/generated'
import { useFileUploader } from 'src/hooks/files/use-file-uploader.hook';
import { useRoqComponents } from 'src/components/core/roq-provider';

interface Event<T = EventTarget> {
  target: T;
}

export interface UseFilesUploadInterface extends FileStateInterface {
  handleSelectedFiles: (evt: Event<HTMLInputElement>) => void;
  handlePageChange: (newPage: number, pageSize: number) => void;
  handleFileUpload: (acceptedFiles: File[]) => void;
  handlePageRowsCountChange: (pageSize: number) => void;
  handleOrderChange: (sort: FileOrderSortEnum, order: OrderEnum) => void;
}

interface FileStateInterface {
  data: FilesQuery['files']['data']
  pageNumber: number;
  pageSize: number;
  order: { sort: FileOrderSortEnum, order: OrderEnum }
}

export const useFilesUpload = (): UseFilesUploadInterface => {
  const { uploadFile: upload } = useFileUploader();
  const { user } = useRoqComponents();

  const [tableState, setTableState] = useState<FileStateInterface>({
    data: [],
    pageNumber: 0,
    pageSize: 20,
    order: { sort: FileOrderSortEnum.createdAt, order: OrderEnum.DESC },
  });

  const handleOrderChange = useCallback((
      sort: FileOrderSortEnum,
      orderDirection: OrderEnum
  ) => {
    setTableState((ts) => ({
      ...ts,
      order: {
        sort,
        order: orderDirection,
      },
    }));
  }, [setTableState]);

  const handlePageRowsCountChange = useCallback((newPageSize: number) => {
    setTableState((ts) => ({
      ...ts,
      pageSize: newPageSize,
    }));
  }, [setTableState])

  const handlePageChange = useCallback((newPageNumber: number, newPageSize: number) => {
    setTableState((ts) => ({
      ...ts,
      pageNumber: newPageNumber,
      pageSize: newPageSize,
    }));
  }, [setTableState])

  const uploadFile = async (file) => {
    const userId = user?.id;
    if (!userId || !file) return;

    await upload({
      file,
      temporaryId: uuidv4(),
    });
  }

  const handleFileUpload = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      void uploadFile(file);
    })
  }, []);

  const handleSelectedFiles = (evt: Event<HTMLInputElement>) => {
    const uploadedFiles: FileList = evt.target.files as FileList;
    handleFileUpload(Array.from(uploadedFiles));
    evt.target.value = '';
  }

  return {
    ...tableState,
    handlePageChange,
    handleFileUpload,
    handleSelectedFiles,
    handlePageRowsCountChange,
    handleOrderChange,
  }
}
