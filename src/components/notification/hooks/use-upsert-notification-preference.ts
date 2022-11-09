import { BaseMutationOptions, useMutation } from '@apollo/client'
import { UpsertNotificationTypeUserPreference } from 'src/lib/graphql/notification/query'
import {
  UpsertNotificationTypeUserPreferenceMutation,
  UpsertNotificationTypeUserPreferenceMutationVariables,
} from 'src/lib/graphql/types/graphql'

export function useUpsertNotificationPreference(
  opts?: BaseMutationOptions<
    UpsertNotificationTypeUserPreferenceMutation,
    UpsertNotificationTypeUserPreferenceMutationVariables
  >,
) {
  return useMutation<
    UpsertNotificationTypeUserPreferenceMutation,
    UpsertNotificationTypeUserPreferenceMutationVariables
  >(UpsertNotificationTypeUserPreference, {
    context: { service: 'platform' },
    ...opts,
  })
}
