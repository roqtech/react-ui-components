import { QueryHookOptions } from '@apollo/client'
import { NotificationsFeedQuery, NotificationsFeedQueryVariables } from 'src/lib/graphql/types/graphql'
import { NotificationProps } from 'src/components/notification/notification'
import { useNotificationsFeedQuery } from 'src/lib/graphql/hooks/generated'

type UseFetchNotificationsInAppArgs = Pick<
  NotificationProps,
  'type'
>
export function useFetchNotificationsFeed(
  args: UseFetchNotificationsInAppArgs,
  opts?: QueryHookOptions<NotificationsFeedQuery, NotificationsFeedQueryVariables>
) {
  const type = args.type || 'all'

  return useNotificationsFeedQuery(opts)
}
