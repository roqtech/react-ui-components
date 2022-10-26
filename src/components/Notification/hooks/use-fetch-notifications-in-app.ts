import { useResolveProvider } from 'src/components/Provider'
import { NotificationsInAppForCurrentUserQueryVariables, useNotificationsInAppForCurrentUserQuery } from 'src/lib/graphql/types'
import { NotificationProps } from '../Notification'
import { useDefaultNotificationsVariables } from './use-fetch-notification-variables'

type UseFetchNotificationsInAppArgs = Pick<
  NotificationProps,
  'token' | 'host' | 'type' | 'fetchProps'
>
export function useFetchNotificationsInApp(
  args: UseFetchNotificationsInAppArgs,
) {
  const type = args.type || 'all'
  const { host, token } = useResolveProvider(args)
  const variables = useDefaultNotificationsVariables({ type, variables: args?.fetchProps?.variables })

  return useNotificationsInAppForCurrentUserQuery(
    {
      endpoint: host,
      fetchParams: {
        headers: {
          'content-type': 'application/json',
          'roq-platform-authorization': token as string,
        },
      },
    },
    variables,
    {
      refetchOnWindowFocus: false,
    },
  )
}
