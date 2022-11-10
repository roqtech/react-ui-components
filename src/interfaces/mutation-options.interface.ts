import { DocumentNode, OperationVariables } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { MutationHookOptions } from '@apollo/client/react/types/types';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export interface MutationOptionsInterface<TArgs, TVariables = OperationVariables, TData = any> extends Omit<MutationHookOptions<TData, TVariables>, 'variables' | 'mutation'> {
    mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
    variables: (args: TArgs) => TVariables,
    mutationName: string,
    onCompleted?: (data: TData) => void;
    onError?: (error: ApolloError) => void;
}
