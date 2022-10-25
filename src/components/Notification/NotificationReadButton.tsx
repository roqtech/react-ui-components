import React, { useCallback } from 'react';
import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from 'src/components/Popoever'
import { request } from 'src/utils';
import { useRoq } from '../Provider';
import { MarkNotificationAsRead, MarkNotificationAsUnRead } from 'src/lib/graphql/query';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../Button';

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 35,
  width: 35,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: blackA.blackA11,
  backgroundColor: 'white',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: blackA.blackA3 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
});
const ThreeDotSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="currentColor"
    className=""
    {...props}
  >
    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
  </svg>
)

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
    <Popover>
      <PopoverTrigger asChild>
        <IconButton aria-label="Update notification">
          <ThreeDotSvg />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent sideOffset={5} >
        <Button css={{color: '#fff'}} onClick={onClick}>Mark notification as {read ? 'unread' : 'read'}</Button>
        <PopoverClose aria-label="Close">
          <Cross2Icon />
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
};

export { NotificationReadButton };
