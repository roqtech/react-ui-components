import { NotificationInAppOrderSortEnum, NotificationsInAppForCurrentUserQueryVariables, OrderEnum } from "src/lib/graphql/types"
import { NotificationType } from "../Notification"

const minDate = '2022-09-19T03:40:40.534Z'
const defaultVariables: NotificationsInAppForCurrentUserQueryVariables = {
  limit: 20,
  order: {
    order: OrderEnum.Desc,
    sort: NotificationInAppOrderSortEnum.CreatedAt,
  },
  notificationfilter: {
    createdAt: {
      moreThan: minDate,
    },
  },
  unreadCountFilter: {
    createdAt: {
      moreThan: minDate,
    },
    read: {
      equalTo: false,
    },
  },
}

interface UseDefaultNotificationsVariablesArgs {
  type: NotificationType,
  variables?: NotificationsInAppForCurrentUserQueryVariables
}
const useDefaultNotificationsVariables = (args: UseDefaultNotificationsVariablesArgs): NotificationsInAppForCurrentUserQueryVariables => {
  
  return {
    ...defaultVariables,
    ...(args.variables || {}),
    notificationfilter: {
      ...defaultVariables.notificationfilter,
      ...(args?.variables?.notificationfilter || {}),
      ...(args?.type === 'unread' ? { read: { equalTo: false } } : {}),
    },
  }
}

export { useDefaultNotificationsVariables, UseDefaultNotificationsVariablesArgs }
