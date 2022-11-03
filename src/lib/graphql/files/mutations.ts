import { gql } from '@apollo/client';

export const deleteFileMutation = gql`
    mutation DeleteFiles($ids: [ID!]!) {
        deleteFiles(filter: { id: { valueIn: $ids } })
    }
`

export const updateFileMutation = gql`
    mutation UpdateFile($id: ID!, $updateFileDto: FileUpdateDto!) {
        updateFile(fileId: $id, updateFileDto: $updateFileDto) {
            id
            name
        }
    }
`

export const makeFilePublicMutation = gql`
    mutation MakeFilePublic($id: ID!) {
        makeFilePublic(fileId: $id) {
            id
            url
            isPublic
        }
    }
`

export const makeFilePrivateMutation = gql`
    mutation MakeFilePrivate($id: ID!) {
        makeFilePrivate(fileId: $id) {
            id
            url
            isPublic
        }
    }
`

// export const saveUserFileMutation = gql`
//     mutation SaveUserFile($fileName: String!, $fileType: String!) {
//         saveUserFile(data: { fileName: $fileName, fileType: $fileType }) {
//             id
//             uploadUrl
//             contentType
//         }
//     }
// `

export const updateFileStatusMutation = gql`
    mutation UpdateFileStatus($fileId: ID!, $status: FileStatusEnum!) {
        updateFileStatus(fileId: $fileId, status: $status) {
            id
            name
            url
            createdAt
        }
    }
`
