import { useQuery } from '@apollo/client'
import { NotificationsInAppForCurrentUser } from 'src/lib/graphql/query'
import { NotificationsInAppForCurrentUserQuery, NotificationsInAppForCurrentUserQueryVariables } from 'src/lib/graphql/types/graphql'
import { NotificationProps } from '../notification'
import { useDefaultNotificationsVariables } from './use-fetch-notification-variables'

type UseFetchNotificationsInAppArgs = Pick<
  NotificationProps,
  'token' | 'host' | 'type' | 'fetchProps'
>
export function useFetchNotificationsInApp(
  args: UseFetchNotificationsInAppArgs,
) {
  const type = args.type || 'all'
  const variables = useDefaultNotificationsVariables({ type, variables: args?.fetchProps?.variables })

  return useQuery<NotificationsInAppForCurrentUserQuery, NotificationsInAppForCurrentUserQueryVariables>(NotificationsInAppForCurrentUser, {
    variables,
    context: { service: 'platform' },
  })
}
