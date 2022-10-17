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
import { useRoq } from '../Provider/Provider';
import { Card } from '../Card';
import { NotificationBadges } from './NotificationBadget';

dayjs.extend(relativeTime)

function useOnRowRender(item: notificationsInAppForCurrentUser_notificationsInAppForCurrentUser_data) {

}

const minDate = '2022-09-19T03:40:40.534Z'
enum NotificationType {
  ALL = 'all',
  UNREAD = 'unread'
}

function useNotificationsInApp(type: NotificationType) {
  const { host, token } = useRoq()
  
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
      ...(type === NotificationType.UNREAD ? { read: { equalTo: false }} : {})
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

interface NotificationProps {
  defaultType?: NotificationType
}

export const Notification: React.FC<NotificationProps> = (props) => {
  const queryClient = useQueryClient()
  const { defaultType = NotificationType.ALL } = props
  const [type, setType] = useState(defaultType)
  const { status, data, error, isFetching } = useNotificationsInApp(type);
  
  const items = useMemo(() => _get(data, 'loadNotifications.data'), [data])
  console.log('items', items)
  
  return (
    <div>
      <div style={{marginBottom: 16 }}>
        Notification {data && <NotificationBadges>{data?.loadUnreadNotificationCount?.totalCount}</NotificationBadges>}
      </div>
      <ToggleGroup type='single' value={type} css={{marginBottom: 16 }} onValueChange={(value: NotificationType) => setType(value)} >
        <ToggleGroupItem value={NotificationType.ALL}>All</ToggleGroupItem>
        <ToggleGroupItem value={NotificationType.UNREAD}>Unread</ToggleGroupItem>
      </ToggleGroup>
      <div>
        {isFetching && !data && 'Loading...'}
      </div>
      {items?.map((item) => <Card key={item.id} title={item.title} subTitle={dayjs(item.createdAt).fromNow()}>{item.content}</Card>)}
    </div>
  )
}

