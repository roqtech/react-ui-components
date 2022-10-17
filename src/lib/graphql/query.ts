import gql from 'graphql-tag';

export const NotificationsInAppForCurrentUser = gql`
  query notificationsInAppForCurrentUser(
    $limit: Int
    $order: NotificationInAppOrderArgType!
    $notificationfilter: NotificationInAppFilterArgType
    $unreadCountFilter: NotificationInAppFilterArgType
  ) {
    loadNotifications: notificationsInAppForCurrentUser(
      limit: $limit
      order: $order
      filter: $notificationfilter
    ) {
      totalCount
      data {
        id
        title
        content
        locale
        createdAt
        read
        icon
      }
    }
    loadUnreadNotificationCount: notificationsInAppForCurrentUser(
      limit: $limit
      filter: $unreadCountFilter
    ) {
      totalCount
    }
  }
`
