import { useMutation } from '@apollo/client';
import { makeFilePrivateMutation, makeFilePublicMutation } from 'src/lib/graphql/files';

export const useMakeFilePublic = () => useMutation(makeFilePublicMutation)
export const useMakeFilePrivate = () => useMutation(makeFilePrivateMutation)
