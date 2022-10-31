import React, { useCallback } from 'react';
import { MarkNotificationAsRead, MarkNotificationAsUnRead } from 'src/lib/graphql/query';
import { ActionButton, Menu, MenuItem } from '../common';
import { useApolloClient, useMutation } from '@apollo/client';

export function useReadNotification(id: string) {
  return useMutation(MarkNotificationAsRead, {
    variables: { id },
    context: { service: 'platform' },
  })
}

export function useUnReadNotification(id: string) {
  return useMutation(MarkNotificationAsUnRead, {
    variables: { id },
    context: { service: 'platform' },
  })
}

export interface NotificationReadButtonProps {
  id: string
  read: boolean
}

const NotificationReadButton: React.FC<NotificationReadButtonProps> = (props) => {
  const { id, read } = props
  const client = useApolloClient()
  const [readMutate] = useReadNotification(id)
  const [unreadMutate] = useUnReadNotification(id)
  
  const onClick = useCallback(() => {
    if (read) {
      unreadMutate().then(() => {
        client.refetchQueries({ include: ['notificationsInAppForCurrentUser'] })
      })
      return
    } 
    readMutate().then(() => {
      client.refetchQueries({ include: ['notificationsInAppForCurrentUser'] })
    })
  }, [read])
  
  return (
    <ActionButton components={{
    Dropdown: (props) => (
      <Menu {...props}>
        <MenuItem onClick={onClick}>Mark notification as {read ? 'unread' : 'read'}</MenuItem>
      </Menu>
    ),
  } as any
  } />
  )
};

export { NotificationReadButton };
