import { BaseQueryOptions, QueryFunctionOptions, useQuery } from '@apollo/client'
import { NotificationsFeed } from 'src/lib/graphql/notification/query'
import { NotificationsFeedQuery, NotificationsFeedQueryVariables } from 'src/lib/graphql/types/graphql'
import { NotificationProps } from 'src/components/notification/notification'
import { useDefaultNotificationsVariables } from './use-fetch-notification-variables'

type UseFetchNotificationsInAppArgs = Pick<
  NotificationProps,
  'type'
>
export function useFetchNotificationsInApp(
  args: UseFetchNotificationsInAppArgs,
  opts?: BaseQueryOptions<NotificationsFeedQueryVariables> & QueryFunctionOptions<NotificationsFeedQuery, NotificationsFeedQueryVariables>
) {
  const type = args.type || 'all'
  const variables = useDefaultNotificationsVariables({ type })

  return useQuery<NotificationsFeedQuery, NotificationsFeedQueryVariables>(NotificationsFeed, {
    variables,
    context: { service: 'platform' },
    ...opts,
  })
}
