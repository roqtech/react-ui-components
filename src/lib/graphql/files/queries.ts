import { gql } from '@apollo/client';

export const fileQuery = gql`
    query File($fileId: ID!) {
        file(fileId: $fileId) {
            id
            name
            url
            isPublic
        }
    }
`

export const filesQuery = gql`
    query Files($limit: Int, $offset: Int, $order: FileOrderArgType, $filter: FileFilterArgType!) {
        files(limit: $limit, offset: $offset, order: $order, filter: $filter) {
            totalCount
            data {
                id
                name
                url
                isPublic
                createdAt
                status
            }
        }
    }
`
