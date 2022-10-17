import { request } from '../../utils'
import React, { useEffect, useMemo, useState } from 'react'
import _get from 'lodash/get'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// import { Root as ToggleRoot, Item as ToggleItem } from '@radix-ui/react-toggle-group';
import { ToggleGroup, ToggleGroupItem } from 'src/components/ToggleGroup';
import { useQuery, useQueryClient } from 'react-query';
// import ky from 'ky'
// import { request, gql } from 'graphql-request'
import { NotificationsInAppForCurrentUser } from 'src/lib/graphql/query';
import { notificationsInAppForCurrentUser_notificationsInAppForCurrentUser_data } from 'src/lib/graphql/types';
import { useRoq, IRoqProvider } from 'src/components/Provider';
import { Card } from '../Card';
import { NotificationBadges } from './NotificationBadget';

dayjs.extend(relativeTime)

function useOnRowRender(item: notificationsInAppForCurrentUser_notificationsInAppForCurrentUser_data) {

}

function useResolveProvider(args: Partial<IRoqProvider>) {
  const { host: hostArg, token: tokenArg } = args
  const { host: hostProvide, token: tokenProvider } = useRoq()
  const host = hostArg ?? hostProvide
  const token = tokenArg ?? tokenProvider
  return { host, token }
}

const minDate = '2022-09-19T03:40:40.534Z'
export type NotificationType = 'all' | 'unread'

function useNotificationsInApp(args: NotificationProps) {
  const type = args.type
  const { host, token } = useResolveProvider(args)

  const variables = {
    limit: 20,
    order: {
      order: 'DESC',
      sort: 'createdAt',
    },
    notificationfilter: {
      createdAt: {
        moreThan: minDate,
      },
      ...(type === 'unread' ? { read: { equalTo: false }} : {})
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

  return useQuery(["NotificationsInAppForCurrentUser", variables], async () => {
    // const {
    //   notificationsInAppForCurrentUser: { data },
    // } = await client.request(
    //   NotificationsInAppForCurrentUser
    // );
    // console.log('returnuseQuery -> data', data)
    if (!host || !token) {
      return []
    }
    const items = await request(
      {
        url: host,
        query: NotificationsInAppForCurrentUser,
        variables,
        headers: {
          'roq-platform-authorization': token as string,
        },
      },
      'data',
    ).catch(() => [])
    return items
    // const result = await ky.post(env.host, {
    //   json: {
    //     query: print(NotificationsInAppForCurrentUser),
    //     variables: {
    //       limit: 20,
    //       order: {
    //         order: 'DESC',
    //         sort: 'createdAt',
    //       },
    //       notificationfilter: {
    //         createdAt: {
    //           moreThan: new Date().toISOString(),
    //         },
    //       },
    //       unreadCountFilter: {
    //         createdAt: {
    //           moreThan: new Date().toISOString(),
    //         },
    //         read: {
    //           equalTo: false,
    //         },
    //       },
    //     },
    //   },
    //   headers: {
    //     'roq-platform-authorization': token as string
    //   },
    // })
    //   .json<{ data: notificationsInAppForCurrentUser }>()
    // return result?.data?.notificationsInAppForCurrentUser?.data || []
    return []
  });
}

interface NotificationProps extends Partial<IRoqProvider> {
  type?: NotificationType
}

export const Notification: React.FC<NotificationProps> = (props) => {
  // const queryClient = useQueryClient()
  const [type, setType] = useState<NotificationType>(props.type || 'all')
  const { status, data, error, isFetching } = useNotificationsInApp({ ...props, type });
  
  const items = useMemo(() => _get(data, 'loadNotifications.data'), [data])
  
  return (
    <div>
      <div style={{marginBottom: 16 }}>
        Notification <NotificationBadges>{data?.loadUnreadNotificationCount?.totalCount ?? 0}</NotificationBadges>
      </div>
      <ToggleGroup type='single' value={type} css={{marginBottom: 16 }} onValueChange={(value: NotificationType) => setType(value)} >
        <ToggleGroupItem value={'all'}>All</ToggleGroupItem>
        <ToggleGroupItem value={'unread'}>Unread</ToggleGroupItem>
      </ToggleGroup>
      <div>
        {isFetching && !data && 'Loading...'}
      </div>
      {items?.map((item) => <Card key={item.id} title={item.title} subTitle={dayjs(item.createdAt).fromNow()}>{item.content}</Card>)}
    </div>
  )
}

