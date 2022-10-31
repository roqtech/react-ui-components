import { useQuery } from '@apollo/client'
import { NotificationsInAppForCurrentUser } from 'src/lib/graphql/query'
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

  return useQuery<any, any>(NotificationsInAppForCurrentUser, {
    variables,
    context: { service: 'platform' },
  })
}
