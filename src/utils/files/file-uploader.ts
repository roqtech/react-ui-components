import { DocumentNode, useMutation } from '@apollo/client';
import axios from 'axios';
import { omit } from 'lodash';
import { ClientValidationError } from 'src/errors';
import { getFileType } from 'src/utils/files/mime-type';
import parseUrl from 'parse-url';
import { FileUploadStatusEnum } from 'src/enums/files/file-upload-status.enum';
import { MutationTuple } from '@apollo/client/react/types/types';
import { FileInterface, MutationOptionsInterface } from 'src/interfaces';

type onProgressCallbackInterface = (val: number) => void;

interface UploadResultInterface {
  url: string;
  fileId: string;
}

interface SetReadyStatusInterface {
  fileStatusUpdateMutationOptions: MutationOptionsInterface<undefined>,
  onSuccess?: (data: FileInterface) => void,
  onError?: (e: Error) => void,
}

interface FileDataInterface {
  id: string,
  uploadUrl: string,
  contentType: string,
}

export interface FileUploadResponse {
  url: string;
  fileId: string;
}

export interface InitiateFileUploadArgsInterface extends SetReadyStatusInterface {
  saveFileMutationOptions: MutationOptionsInterface<undefined>,
  onBeforeStart?: (abortController: AbortController) => void;
  onAfterStart?: (data: FileDataInterface) => void;
  onProgress?: (val: number) => void,
  selectedFile: File,
  failedFileData?: FileDataInterface
}

interface UploadToCloudArgsInterface {
  uploadUrl: string,
  maxFileSize: number,
  onProgress?: onProgressCallbackInterface,
  selectedFile: File,
}

interface FileUploaderInterface {
  initiateFileUpload(args: InitiateFileUploadArgsInterface): Promise<UploadResultInterface | undefined>

  uploadToCloud(args: UploadToCloudArgsInterface): Promise<UploadResultInterface | undefined>

  cancelCloudUpload(): void
}

export class FileUploader implements FileUploaderInterface {
  abortController: AbortController;
  fileId: string | undefined;
  file: File | undefined;
  saveFileMutation: MutationTuple<unknown, unknown>;
  updateFileStatusMutation: MutationTuple<unknown, unknown>;

  constructor({
                saveFileMutation,
                updateFileStatusMutation
              }: { saveFileMutation: DocumentNode, updateFileStatusMutation: DocumentNode }) {
    this.abortController = new AbortController();
    // This is just a dummy mutation to invoke `useMutation` hook during render, to avoid error that hooks can't be used outside functional component
    this.saveFileMutation = useMutation<unknown, unknown>(saveFileMutation);
    this.updateFileStatusMutation = useMutation<unknown, unknown>(updateFileStatusMutation);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadToCloud(args: UploadToCloudArgsInterface): any {
    const {
      uploadUrl,
      maxFileSize,
      onProgress,
      selectedFile,
    } = args;

    return axios.put(uploadUrl, selectedFile, {
      method: 'PUT',
      headers: {
        'X-Goog-Content-Length-Range': `0,${maxFileSize}`,
        'Content-Type': getFileType(selectedFile),
      },
      onUploadProgress: (progress) => {
        if (onProgress) {
          onProgress((progress?.loaded / (progress?.total || 100)) * 100);
        }
      },
      signal: this.abortController.signal,
    });
  }

  cancelCloudUpload(): void {
    this.abortController.abort();
  }

  async setReadyStatus({
                         fileStatusUpdateMutationOptions,
                         onSuccess,
                         onError,
                       }: SetReadyStatusInterface): Promise<string | undefined> {
    const [mutate] = this.updateFileStatusMutation;
    const { data } = await mutate({
      ...omit(fileStatusUpdateMutationOptions, ['variables', 'update']),
      variables: {
        fileId: this.fileId,
        status: FileUploadStatusEnum.ready,
        ...(fileStatusUpdateMutationOptions.variables(undefined) || {})
      },
      onError,
    });
    const mutationData = fileStatusUpdateMutationOptions.mutationName ? data?.[fileStatusUpdateMutationOptions.mutationName] : data;
    if (mutationData && onSuccess) onSuccess(mutationData);
    return mutationData?.url;
  }

  calculateExpiryTime(expirationDate: string, expirationDuration: string): number {
    const parseExpirationTime = Date.parse(expirationDate.replace(/(....)(..)(..T..)(..)/, '$1-$2-$3:$4:'));
    return new Date(parseExpirationTime).getTime() + (Number(expirationDuration) * 1000);
  }

  parseHeadersParams(uploadUrl: string): {
    maxFileSize: number,
    expiryTime: number
  } {
    const urlParams = parseUrl(uploadUrl);
    const maxFileSize = urlParams?.query.maxSize;
    const expirationDate = urlParams?.query['X-Goog-Date'];
    const expirationDuration = urlParams?.query['X-Goog-Expires'];

    const expiryTime = this.calculateExpiryTime(expirationDate, expirationDuration);

    return {
      maxFileSize: Number(maxFileSize),
      expiryTime,
    }
  }

  validateFileUpload(file: File, data: FileDataInterface): void {
    const { contentType, uploadUrl } = data;
    if (!uploadUrl) {
      throw new ClientValidationError({ message: 'upload-url-missing' });
    }

    const { maxFileSize, expiryTime } = this.parseHeadersParams(uploadUrl);
    if (expiryTime < new Date().getTime()) {
      throw new ClientValidationError({
        message: 'upload-failure',
        variables: { context: 'upload-url-expired', replace: { expiryTime } }
      });
    }

    if (!maxFileSize) {
      throw new ClientValidationError({
        message: 'upload-failure',
        variables: { context: 'missing-max-file-size' }
      });
    }

    if (file.size > maxFileSize) {
      throw new ClientValidationError({
            message: 'upload-failure',
            variables: {
              context: 'file-size-exceeds-max-file-size',
              replace: { maxFileSize: Math.round(maxFileSize / (1024 * 1024)) }  // convert bytes into mb
            }
          }
      );
    }

    if (getFileType(file) !== contentType) {
      throw new ClientValidationError({
        message: 'upload-failure',
        variables: { context: 'content-type-mismatch', replace: { contentType } }
      });
    }
  }

  async processFileUpload(options: InitiateFileUploadArgsInterface): Promise<FileUploadResponse | undefined> {
    const {
      saveFileMutationOptions,
      fileStatusUpdateMutationOptions,
      onBeforeStart,
      onAfterStart,
      onProgress,
      onSuccess,
      onError,
      selectedFile,
      failedFileData,
    } = options;
    if (onBeforeStart) onBeforeStart(this.abortController);
    let result = failedFileData as FileDataInterface;
    if (!result?.uploadUrl) {
      const [mutate] = this.saveFileMutation;
      try {
        const { data } = await mutate({
          ...omit(saveFileMutationOptions, ['variables', 'update']),
          variables: saveFileMutationOptions.variables(undefined),
          onError,
        });
        if (data) {
          result = saveFileMutationOptions.mutationName ? data?.[saveFileMutationOptions.mutationName] : data;
        }
      } catch (e) {
        onError && onError(e as Error);
      }
    }
    const { id, uploadUrl } = result;
    this.fileId = id;
    if (onAfterStart) onAfterStart(result);
    this.validateFileUpload(selectedFile, result);
    const { maxFileSize } = this.parseHeadersParams(uploadUrl);
    await this.uploadToCloud({
      uploadUrl,
      maxFileSize,
      onProgress,
      selectedFile,
    }).catch((e)=>onError && onError(e));

    const url = await this.setReadyStatus({
      fileStatusUpdateMutationOptions,
      onSuccess,
      onError,
    });
    if (url) {
      return { fileId: id, url };
    }
    return;
  }

  async handleFileUploadError(e: Error, options: InitiateFileUploadArgsInterface): Promise<void> {
    const {
      fileStatusUpdateMutationOptions,
      onError,
    } = options;
    const [mutate] = this.updateFileStatusMutation;
    await mutate({
      ...omit(fileStatusUpdateMutationOptions, ['variables', 'update']),
      variables: {
        fileId: this.fileId,
        status: axios.isCancel(e) ? FileUploadStatusEnum.cancelled : FileUploadStatusEnum.error,
        ...(fileStatusUpdateMutationOptions.variables(undefined) || {})
      },
      onError,
    });
  }

  async initiateFileUpload(options: InitiateFileUploadArgsInterface): Promise<FileUploadResponse | undefined> {
    try {
      return this.processFileUpload(options);
    } catch (e: unknown) {
      await this.handleFileUploadError(e as Error, options);
    }
  }
}
