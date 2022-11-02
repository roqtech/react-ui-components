import { BaseQueryOptions, useQuery } from '@apollo/client'
import { NotificationsInAppForCurrentUser } from 'src/lib/graphql/query'
import { NotificationsInAppForCurrentUserQuery, NotificationsInAppForCurrentUserQueryVariables } from 'src/lib/graphql/types/graphql'
import { NotificationProps } from 'src/components/notification/notification'
import { useDefaultNotificationsVariables } from './use-fetch-notification-variables'

type UseFetchNotificationsInAppArgs = Pick<
  NotificationProps,
  'token' | 'host' | 'type' | 'fetchProps'
>
export function useFetchNotificationsInApp(
  args: UseFetchNotificationsInAppArgs,
  opts?: BaseQueryOptions<NotificationsInAppForCurrentUserQueryVariables>
) {
  const type = args.type || 'all'
  const variables = useDefaultNotificationsVariables({ type, variables: args?.fetchProps?.variables })

  return useQuery<NotificationsInAppForCurrentUserQuery, NotificationsInAppForCurrentUserQueryVariables>(NotificationsInAppForCurrentUser, {
    variables,
    context: { service: 'platform' },
    ...opts,
  })
}
