import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRoq } from 'src/components/Provider';
import {
  FileOrderSortEnum,
  FilesQuery,
  FileStatusEnum,
  OrderEnum,
  useFilesLazyQuery
} from 'src/lib/graphql/hooks/generated'
import { useUserFileUploader } from 'src/hooks/files/use-user-file-uploader.hook';
import { useUserFiles } from 'src/hooks/files/use-user-files.hook';
import { USER_ENTITY_NAME } from 'src/constants/files/file-entity-names.constant';
import { USER_FILE_CATEGORY } from 'src/constants/files/file-categories.constant';

interface Event<T = EventTarget> {
  target: T;
}

export interface UseUserFilesUploadInterface extends UserFileStateInterface {
  handleSelectedFiles: (evt: Event<HTMLInputElement>) => void;
  handlePageChange: (newPage: number, pageSize: number) => void;
  handleFileUpload: (acceptedFiles: File[]) => void;
  handlePageRowsCountChange: (pageSize: number) => void;
  handleOrderChange: (sort: FileOrderSortEnum, order: OrderEnum) => void;
}

interface UserFileStateInterface {
  data: FilesQuery['files']['data']
  pageNumber: number;
  pageSize: number;
  order: { sort: FileOrderSortEnum, order: OrderEnum }
}

export const useUserFilesUpload = (): UseUserFilesUploadInterface => {
  const { uploadFile: upload } = useUserFileUploader();
  const [fetchUserFiles, { data }] = useFilesLazyQuery();
  const { user } = useRoq();
  const [tableState, setTableState] = useState<UserFileStateInterface>({
    data: [],
    pageNumber: 0,
    pageSize: 20,
    order: { sort: FileOrderSortEnum.createdAt, order: OrderEnum.DESC },
  });

  const { totalCount } = useUserFiles();

  const { pageNumber, pageSize, order } = tableState;

  useEffect(() => {
    void fetchUserFiles({
      variables: {
        offset: pageNumber * pageSize,
        limit: pageSize,
        order,
        filter: {
          entityName: {
            equalTo: USER_ENTITY_NAME,
          },
          entityIdentifiers: {
            equalTo: user?.id,
          },
          fileCategory: {
            equalTo: USER_FILE_CATEGORY,
          },
          status: {
            equalTo: FileStatusEnum.ready,
          },
        }
      }
    });
  }, [pageNumber, pageSize, order, totalCount]);

  useEffect(() => {
    setTableState((prevState) => ({
      ...prevState,
      data: (data?.files?.data || [])
    }));
  }, [data]);


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
