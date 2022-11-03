import { AsyncOperationConfigInterface, AsyncOperationStateInterface } from 'src/interfaces';
import { useCallback, useState } from 'react';

export interface UseAsyncOperationsConfigMapInterface<TOperationParams = unknown, TOperationResult = unknown> {
  [key: string]: AsyncOperationConfigInterface<TOperationParams, TOperationResult>
}

export interface UseAsyncOperationsCurrentOperationInterface<TOperationConfigMap extends UseAsyncOperationsConfigMapInterface,
    TKey extends keyof TOperationConfigMap> extends AsyncOperationStateInterface<Parameters<TOperationConfigMap[TKey]['callback']>[0],
    ReturnType<TOperationConfigMap[TKey]['callback']>> {
  name: TKey;
  confirmable: boolean | undefined | null;
}

export type UseAsyncOperaionsStatesMapType<TOperationConfigMap extends UseAsyncOperationsConfigMapInterface> = {
  [TKey in keyof TOperationConfigMap]?: AsyncOperationStateInterface<Parameters<TOperationConfigMap[TKey]['callback']>[0],
      ReturnType<TOperationConfigMap[TKey]['callback']>>;
}

export interface UseAsyncOperationsInterface<TOperationConfigMap extends UseAsyncOperationsConfigMapInterface> {
  initiateOperation: <TKey extends keyof TOperationConfigMap>(
      operationName: TKey,
      operationParams: Parameters<TOperationConfigMap[TKey]['callback']>[0]
  ) => void;
  operationStates: UseAsyncOperaionsStatesMapType<TOperationConfigMap>;
  currentOperation: UseAsyncOperationsCurrentOperationInterface<TOperationConfigMap, keyof TOperationConfigMap> | null;
  onConfirm: () => void;
  onCancel: () => void;
  resetState: () => void;
  resetOperationState: (name: keyof TOperationConfigMap) => void;
  resetCurrentOperationState: () => void;
}

export interface UseAsyncOperationsParamsInterface<TOperationConfigMap extends UseAsyncOperationsConfigMapInterface> {
  operations: TOperationConfigMap;
  onSuccess?: (
      result: ReturnType<TOperationConfigMap[keyof TOperationConfigMap]['callback']>,
      operationName: keyof TOperationConfigMap,
  ) => void;
  onError?: (error: Error, operationName: keyof TOperationConfigMap) => void;
}

export const useAsyncOperations = <TOperationConfigMap extends UseAsyncOperationsConfigMapInterface>(
    { operations, onSuccess, onError }: UseAsyncOperationsParamsInterface<TOperationConfigMap>
): UseAsyncOperationsInterface<TOperationConfigMap> => {
  const [operationStates, setOperationStates] = useState<UseAsyncOperaionsStatesMapType<TOperationConfigMap>>({});
  const [currentOperationName, setCurrentOperationName] = useState<keyof TOperationConfigMap | null>(null);

  const executeOperation = useCallback((
      operationName: keyof TOperationConfigMap,
      operationParams: Parameters<TOperationConfigMap[keyof TOperationConfigMap]['callback']>[0]
  ) => {
    setOperationStates(states => ({
      ...states,
      [operationName]: { ...states[operationName], isLoading: true, status: null }
    }));

    const operationConfig = operations[operationName];
    operationConfig.callback(operationParams).then(
        (result) => {
          setOperationStates(states => ({
            ...states,
            [operationName]: { ...states[operationName], isLoading: false, status: { success: true, result } }
          }));
          operationConfig.onSuccess?.(result);
          onSuccess?.(result as ReturnType<TOperationConfigMap[keyof TOperationConfigMap]['callback']>, operationName);
        }
    ).catch(error => {
      setOperationStates(states => ({
        ...states,
        [operationName]: { ...states[operationName], isLoading: false, status: { success: false, error } }
      }));
      operationConfig.onError?.(error);
      onError?.(error, operationName);
    });
  }, [setOperationStates]);

  const initiateOperation = useCallback(<TKey extends keyof TOperationConfigMap>(
      operationName: TKey,
      operationParams: Parameters<TOperationConfigMap[TKey]['callback']>[0]
  ) => {
    if (!operations?.[operationName]) {
      throw new Error('Operation is not defined');
    }
    const operationConfig = operations[operationName];
    setCurrentOperationName(operationName);
    if (operationConfig.confirmable) {
      setOperationStates(states => ({
        ...states,
        [operationName]: { isLoading: false, params: operationParams, status: null }
      }));
    } else {
      executeOperation(operationName, operationParams);
    }
  }, [setOperationStates]);

  const onConfirm = useCallback(
      () => executeOperation(currentOperationName as keyof TOperationConfigMap, operationStates[currentOperationName]?.params as Parameters<TOperationConfigMap[keyof TOperationConfigMap]['callback']>[0]),
      [currentOperationName, operationStates]
  );

  const resetState = useCallback(
      () => {
        setCurrentOperationName(null);
        setOperationStates({});
      },
      [setOperationStates]
  );

  const resetOperationState = useCallback(
      (operationName: keyof TOperationConfigMap) =>
          void setOperationStates(states => {
            const newStates = { ...states };
            delete newStates[operationName];
            return newStates;
          }),
      [setOperationStates]
  );

  const resetCurrentOperationState = useCallback(
      () => {
        resetOperationState(currentOperationName as keyof TOperationConfigMap);
        setCurrentOperationName(null);
      },
      [currentOperationName, setCurrentOperationName, resetOperationState]
  );

  return {
    initiateOperation,
    operationStates,
    currentOperation: currentOperationName ? {
      name: currentOperationName,
      confirmable: operations[currentOperationName]?.confirmable,
      ...operationStates[currentOperationName],
    } as UseAsyncOperationsCurrentOperationInterface<TOperationConfigMap, keyof TOperationConfigMap> : null,
    onConfirm,
    onCancel: resetCurrentOperationState,
    resetState,
    resetOperationState,
    resetCurrentOperationState,
  };
}
