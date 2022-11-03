import { useMemo, useState } from 'react';
import { FileInterface } from 'src/interfaces';
import { ActiveUploadStatusEnum, FilesSortEnum } from 'src/enums';
import { OrderEnum } from 'src/lib/graphql/types/graphql';


export interface UserFileListActiveUploadsInterface {
  id?: string;
  abortController?: AbortController;
  temporaryId: string;
  name: string;
  size: number;
  percentage: number;
  status: ActiveUploadStatusEnum;
  error?: string;
  contentType?: string;
  uploadUrl?: string;
  file?: File;
}

export interface UserFileListStateInterface {
  isLoading: boolean;
  error?: Error;
  activeUploads: UserFileListActiveUploadsInterface[];
  files: FileInterface[];
  totalCount: number;
  pageSize: number;
  offset: number;
  currentPage: number;
  currentEntity?: FileInterface;
  order: {
    sort: FilesSortEnum;
    order: OrderEnum;
  };
}

const initialState: UserFileListStateInterface = {
  isLoading: false,
  error: undefined,
  activeUploads: [],
  files: [],
  totalCount: 0,
  pageSize: 20,
  offset: 0,
  currentPage: 0,
  currentEntity: undefined,
  order: {
    sort: FilesSortEnum.createdAt,
    order: OrderEnum.Desc,
  },
};


export interface UseFilesInterface {
  isLoading: boolean;
  inProgressUploads: UserFileListActiveUploadsInterface[];
  failedUploads: UserFileListActiveUploadsInterface[];
  activeUploads: UserFileListActiveUploadsInterface[];
  successUploads: UserFileListActiveUploadsInterface[];
  files: FileInterface[];
  totalCount: number;
  addActiveUpload: (args: Pick<UserFileListActiveUploadsInterface, 'file' | 'temporaryId' | 'abortController'>) => void
  updateActiveUploadPercentage: (args: Pick<UserFileListActiveUploadsInterface, 'temporaryId' | 'percentage'>) => void
  updateActiveUploadStatus: (args: Pick<UserFileListActiveUploadsInterface, 'temporaryId' | 'status' | 'error'>) => void
  updateActiveUploadId: (args: Pick<UserFileListActiveUploadsInterface, 'temporaryId' | 'id'>) => void
  updateActiveUploadDetails: (args: Pick<UserFileListActiveUploadsInterface, 'temporaryId' | 'id' | 'uploadUrl' | 'contentType'>) => void
  resetActiveUpload: (args: Pick<UserFileListActiveUploadsInterface, 'temporaryId' | 'abortController'>) => void
  resetActiveUploads: () => void
  resetSuccessfulUploads: () => void
  setUserFilesRowsCount: (args: Pick<UserFileListStateInterface, 'pageSize'>) => void
  setUserFileListPagination: (args: Pick<UserFileListStateInterface, 'pageSize' | 'currentPage'>) => void
  setUserFileListOrder: (args: UserFileListStateInterface['order']) => void
  decreaseTotalCount: (args: { decreaseBy: number }) => void
  setUserFileListAction: (files: FileInterface[]) => void
  addUserFile: (args: { file: FileInterface }) => void
}

export const useUserFiles = (): UseFilesInterface => {
  const [state, setState] = useState<UserFileListStateInterface>(initialState);

  const inProgressUploads = useMemo(
      () => state.activeUploads.filter((item) => item.status === ActiveUploadStatusEnum.UPLOADING),
      [state.activeUploads]);

  const failedUploads = useMemo(
      () => state.activeUploads.filter((item) => item.status === ActiveUploadStatusEnum.FAILED),
      [state.activeUploads]);

  const successUploads = useMemo(
      () => state.activeUploads.filter((item) => item.status === ActiveUploadStatusEnum.SUCCESS),
      [state.activeUploads]);

  const updateActiveUploadFile = (collection: UserFileListActiveUploadsInterface[], temporaryId: string, payload: Partial<UserFileListActiveUploadsInterface>): UserFileListActiveUploadsInterface[] => {
    return collection.map((file) => {
      if (file.temporaryId === temporaryId) {
        return {
          ...file,
          ...payload,
        }
      }
      return file;
    })
  }
  return {
    ...state,
    inProgressUploads,
    failedUploads,
    successUploads,
    setUserFileListAction(files) {
      setState((prevState) => ({ ...prevState, files }))
    },
    addUserFile(payload) {
      const { file } = payload;
      setState((prevState) => ({
        ...prevState,
        totalCount: prevState.totalCount + 1,
        files: prevState.files.concat(file)
      }))
    },
    addActiveUpload(payload) {
      const { temporaryId, abortController, file } = payload;
      const { name, size } = file as File;
      setState((prevState) => ({
        ...prevState,
        activeUploads: [
          ...prevState.activeUploads,
          {
            temporaryId,
            abortController,
            name,
            size,
            percentage: 0,
            status: ActiveUploadStatusEnum.UPLOADING,
            file,
          },
        ]
      }))
    },
    updateActiveUploadPercentage(payload) {
      const { temporaryId, percentage } = payload;
      setState((prevState) => ({
        ...prevState,
        activeUploads: updateActiveUploadFile(prevState.activeUploads, temporaryId, { percentage }),
      }))
    },
    updateActiveUploadStatus(payload) {
      const { temporaryId, status, error } = payload;
      setState((prevState) => ({
        ...prevState,
        activeUploads: updateActiveUploadFile(prevState.activeUploads, temporaryId, { status, error }),
      }))
    },
    updateActiveUploadId(payload) {
      const { temporaryId, id } = payload;
      setState((prevState) => ({
        ...prevState,
        activeUploads: updateActiveUploadFile(prevState.activeUploads, temporaryId, { id }),
      }))
    },
    updateActiveUploadDetails(payload) {
      const { temporaryId, id, uploadUrl, contentType } = payload;
      setState((prevState) => ({
        ...prevState,
        activeUploads: updateActiveUploadFile(prevState.activeUploads, temporaryId, { id, uploadUrl, contentType }),
      }))
    },
    resetActiveUpload(payload) {
      const { temporaryId, abortController } = payload;
      setState((prevState) => ({
        ...prevState,
        activeUploads: updateActiveUploadFile(prevState.activeUploads, temporaryId, {
          abortController,
          percentage: 0,
          status: ActiveUploadStatusEnum.UPLOADING,
        }),
      }))
    },
    resetActiveUploads() {
      setState((prevState) => ({
        ...prevState,
        activeUploads: []
      }));
    },
    resetSuccessfulUploads() {
      setState((prevState) => ({
        ...prevState,
        activeUploads: prevState.activeUploads.filter((item) => !!item.error)
      }));
    },
    setUserFilesRowsCount(payload) {
      const { pageSize } = payload;
      setState((prevState) => ({
        ...prevState,
        pageSize
      }));
    },
    setUserFileListPagination(payload) {
      const { currentPage, pageSize } = payload;
      setState((prevState) => ({
        ...prevState,
        offset: currentPage * pageSize,
        currentPage,
        pageSize
      }));
    },
    setUserFileListOrder: (payload) => {
      const { sort, order } = payload;
      setState((prevState) => ({
        ...prevState,
        order: {
          sort,
          order
        }
      }));
    },
    decreaseTotalCount: (payload) => {
      const { decreaseBy } = payload;
      setState((prevState) => {
        prevState.totalCount -= decreaseBy;
        if (prevState.totalCount > 0 && prevState.totalCount <= prevState.currentPage * prevState.pageSize) {
          prevState.currentPage--;
        }
        return {
          ...prevState,
        };
      });
    },
  };
};
