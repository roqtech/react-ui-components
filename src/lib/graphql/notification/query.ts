import { gql } from '@apollo/client';

export const NotificationsFeed = gql`
  query NotificationsFeed {
    notificationFeed {
      data {
        id
        content
        channel
        seen
        lastSeenDate
        title
        createdAt
      }
      totalCount
    }
  }
`

export const MarkNotificationSeen = gql`
  mutation MarkAsSeenNotification($id: String!) {
    markMessageSeen(messageId: $id) {
      id
      seen
    }
  }
`
