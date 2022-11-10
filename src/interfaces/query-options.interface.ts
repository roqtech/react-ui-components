import { OperationVariables } from '@apollo/client';
import { QueryHookOptions } from '@apollo/client/react/types/types';
import { DocumentNode } from 'graphql';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export interface QueryOptionsInterface<TData, TVariables = OperationVariables> extends QueryHookOptions<TData, TVariables> {
    query: DocumentNode | TypedDocumentNode<TData, TVariables>
    queryName: string,
}

