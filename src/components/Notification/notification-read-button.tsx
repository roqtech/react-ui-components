import React, { useCallback } from 'react';
import { request } from 'src/utils';
import { useRoq } from '../Provider';
import { MarkNotificationAsRead, MarkNotificationAsUnRead } from 'src/lib/graphql/query';
import { useQuery, useQueryClient } from 'react-query';
import { ActionButton, Menu, MenuItem } from '../common';

export function useReadNotification(id: string) {
  const { host, token } = useRoq()

  const variables = {
    id
  }

  return useQuery(["MarkNotificationAsRead", variables], async () => {
    if (!host || !token) {
      return false
    }
    return request(
      {
        url: host,
        query: MarkNotificationAsRead,
        variables,
        headers: {
          'roq-platform-authorization': token as string,
        },
      },
    ).catch(() => false)
  }, { 
    refetchOnWindowFocus: false,
    enabled: false
  });
}

export function useUnReadNotification(id: string) {
  const { host, token } = useRoq()

  const variables = {
    id
  }

  return useQuery(["MarkNotificationAsUnRead", variables], async () => {
    if (!host || !token) {
      return false
    }
    return request(
      {
        url: host,
        query: MarkNotificationAsUnRead,
        variables,
        headers: {
          'roq-platform-authorization': token as string,
        },
      },
    ).catch(() => false)
  }, { 
    refetchOnWindowFocus: false,
    enabled: false
  });
}

export interface NotificationReadButtonProps {
  id: string
  read: boolean
}

const NotificationReadButton: React.FC<NotificationReadButtonProps> = (props) => {
  const { id, read } = props
  const queryClient = useQueryClient()
  const { data: dataRead, refetch: refetchRead } = useReadNotification(id)
  const { data: dataUnRead, refetch: refetchUnRead } = useUnReadNotification(id)
  
  const onClick = useCallback(() => {
    if (read) {
      refetchUnRead().then(() => {
        queryClient.invalidateQueries(['NotificationsInAppForCurrentUser'])
      })
      return
    } 
    refetchRead().then(() => {
      queryClient.invalidateQueries(['NotificationsInAppForCurrentUser'])
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
