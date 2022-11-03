export interface  AsyncOperationConfigInterface<TOperationParams = unknown, TOperationResult = unknown> {
  callback: (params: TOperationParams) => Promise<TOperationResult>;
  confirmable?: boolean;
  onSuccess?: (result: TOperationResult) => void;
  onError?: (error: Error) => void;
}
