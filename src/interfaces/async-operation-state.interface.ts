import { OperationStatusInterface } from 'src/interfaces/operation-status.interface';

export interface AsyncOperationStateInterface<TOperationParams = unknown, TOperationResult = unknown> {
  isLoading: boolean;
  params: TOperationParams;
  status: OperationStatusInterface<TOperationResult> | null;
}
