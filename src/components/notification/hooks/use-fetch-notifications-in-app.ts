import { BaseQueryOptions, QueryFunctionOptions, useQuery } from '@apollo/client'
import { NotificationsInAppForCurrentUser } from 'src/lib/graphql/query'
import { NotificationsInAppForCurrentUserQuery, NotificationsInAppForCurrentUserQueryVariables } from 'src/lib/graphql/types/graphql'
import { NotificationProps } from 'src/components/notification/notification'
import { useDefaultNotificationsVariables } from './use-fetch-notification-variables'

type UseFetchNotificationsInAppArgs = Pick<
  NotificationProps,
  'type'
>
export function useFetchNotificationsInApp(
  args: UseFetchNotificationsInAppArgs,
  opts?: BaseQueryOptions<NotificationsInAppForCurrentUserQueryVariables> & QueryFunctionOptions<NotificationsInAppForCurrentUserQuery, NotificationsInAppForCurrentUserQueryVariables>
) {
  const type = args.type || 'all'
  const variables = useDefaultNotificationsVariables({ type })

  return useQuery<NotificationsInAppForCurrentUserQuery, NotificationsInAppForCurrentUserQueryVariables>(NotificationsInAppForCurrentUser, {
    variables,
    context: { service: 'platform' },
    ...opts,
  })
}
