import React, { useCallback } from 'react';
import { ActionButton, Menu, MenuItem } from 'src/components/common';
import { useApolloClient } from '@apollo/client';
// import { useReadNotification, useUnReadNotification } from 'src/components/notification/hooks'
import { useRoqTranslation } from 'src/components/core/roq-provider';

export interface NotificationReadButtonProps {
  id: string
  read: boolean
}

const NotificationReadButton: React.FC<NotificationReadButtonProps> = (props) => {
  const { id, read } = props
  const client = useApolloClient()
  const { t } = useRoqTranslation()
  // const [readMutate] = useReadNotification(id)
  // const [unreadMutate] = useUnReadNotification(id)
  
  const onClick = useCallback(() => {
    // if (read) {
    //   unreadMutate().then(() => {
    //     client.refetchQueries({ include: ['notificationsInAppForCurrentUser'] })
    //   })
    //   return
    // } 
    // readMutate().then(() => {
    //   client.refetchQueries({ include: ['notificationsInAppForCurrentUser'] })
    // })
  }, [read])
  
  if (read) {
    return null
  }
  
  return (
    <ActionButton
      components={
        {
          Dropdown: (props) => (
            <Menu {...props}>
              <MenuItem onClick={onClick}>
                {read ? t('notification.mark-as-unread') : t('notification.mark-as-read')}
              </MenuItem>
            </Menu>
          ),
        } as any
      }
    />
  )
};

export { NotificationReadButton };
