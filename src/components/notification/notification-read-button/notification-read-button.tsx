import React, { useCallback } from 'react';
import { ActionButton, Menu, MenuItem } from 'src/components/common';
import { useApolloClient } from '@apollo/client';
import { useReadNotification, useUnReadNotification } from 'src/components/notification/hooks'

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
    <ActionButton
      components={
        {
          Dropdown: (props) => (
            <Menu {...props}>
              <MenuItem onClick={onClick}>
                Mark notification as {read ? 'unread' : 'read'}
              </MenuItem>
            </Menu>
          ),
        } as any
      }
    />
  )
};

export { NotificationReadButton };
