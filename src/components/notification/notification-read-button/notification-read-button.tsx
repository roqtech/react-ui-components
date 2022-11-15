import React, { useCallback } from 'react';
import { ActionButton, Menu, MenuItem } from 'src/components/common';
import { useApolloClient } from '@apollo/client';
// import { useReadNotification, useUnReadNotification } from 'src/components/notification/hooks'
import { useRoqTranslation } from 'src/components/core/roq-provider';

export interface NotificationReadButtonProps {
  id: string
  read: boolean
}

const DotIcon = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.115 3.448a1.214 1.214 0 0 0-.365.885c0 .343.123.643.365.885s.542.365.885.365c.343 0 .643-.123.885-.365s.365-.542.365-.885c0-.343-.123-.643-.365-.885A1.214 1.214 0 0 0 10 3.083c-.343 0-.643.123-.885.365Zm0 5.667A1.214 1.214 0 0 0 8.75 10c0 .343.123.643.365.885s.542.365.885.365c.343 0 .643-.123.885-.365s.365-.542.365-.885c0-.344-.123-.644-.365-.885A1.214 1.214 0 0 0 10 8.75c-.343 0-.643.123-.885.365Zm0 5.666a1.214 1.214 0 0 0-.365.885c0 .344.123.644.365.885.242.242.542.365.885.365.343 0 .643-.123.885-.365.242-.241.365-.541.365-.885 0-.343-.123-.643-.365-.885a1.214 1.214 0 0 0-.885-.365c-.343 0-.643.123-.885.365Z"
      fill="#878AA5"
      stroke="#878AA5"
      strokeWidth={0.5}
    />
  </svg>
)


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
          Icon: DotIcon,
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
