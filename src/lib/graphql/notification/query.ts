import { gql } from '@apollo/client';

// export const NotificationsInAppForCurrentUser = gql`
//   query notificationsInAppForCurrentUser(
//     $limit: Int
//     $order: NotificationInAppOrderArgType!
//     $notificationfilter: NotificationInAppFilterArgType
//     $unreadCountFilter: NotificationInAppFilterArgType
//   ) {
//     loadNotifications: notificationsInAppForCurrentUser(
//       limit: $limit
//       order: $order
//       filter: $notificationfilter
//     ) {
//       totalCount
//       data {
//         id
//         title
//         content
//         locale
//         createdAt
//         read
//         icon
//       }
//     }
//     loadUnreadNotificationCount: notificationsInAppForCurrentUser(
//       limit: $limit
//       filter: $unreadCountFilter
//     ) {
//       totalCount
//     }
//   }
// `

export const NotificationsFeed = gql`
  query notificationsFeed {
    notificationFeed {
      data{
        id
        channel
        content
        seen
        channel
        lastSeenDate
        title
        createdAt
      }
      totalCount
    }
  }
`

// export const MarkNotificationAsRead = gql`
//   mutation MarkAsReadNotification($id: ID!) {
//     markAsReadNotification(id: $id) {
//       id
//       read
//     }
//   }
// `

// export const MarkNotificationAsUnRead = gql`
//   mutation MarkAsUnreadNotification($id: ID!) {
//     markAsUnreadNotification(id: $id) {
//       id
//       read
//     }
//   }
// `

// export const QueryNotificationTypeCategories = gql`
//   query NotificationTypeCategories {
//     notificationTypeCategories {
//       data {
//         id
//         key
//         description
//         notificationTypes {
//           data {
//             id
//             key
//             description
//             defaultUserActiveWeb
//             defaultUserActiveMail
//             notificationTypeUserPreferences {
//               data {
//                 id
//                 key
//                 web
//                 mail
//                 userId
//                 notificationTypeId
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
// export const UpsertNotificationTypeUserPreference = gql`
//   mutation UpsertNotificationTypeUserPreference(
//     $web: Boolean!
//     $mail: Boolean!
//     $notificationTypeId: ID!
//     $id: ID
//   ) {
//     upsertNotificationTypeUserPreference(
//       notificationTypeUserPreference: {
//         id: $id
//         web: $web
//         mail: $mail
//         notificationTypeId: $notificationTypeId
//       }
//     ) {
//       id
//       web
//       mail
//       key
//       userId
//       notificationTypeId
//     }
//   }
// `