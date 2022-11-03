export interface OperationStatusInterface<TResult = void> {
  success: boolean;
  result?: TResult | undefined | null;
  error?: Error | undefined | null;
}
