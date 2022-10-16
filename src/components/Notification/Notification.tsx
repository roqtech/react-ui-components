import _get from 'lodash/get'
import { DocumentNode } from 'graphql/language/ast';
import { print } from 'graphql/language/printer'
import React, { useEffect } from 'react'
import {
  useQuery,
} from 'react-query';
// import ky from 'ky'
// import { request, gql } from 'graphql-request'
import { env } from '../../env'
import { NotificationsInAppForCurrentUser } from '../../lib/graphql/query';
import { notificationsInAppForCurrentUser_notificationsInAppForCurrentUser_data } from '../../lib/graphql/types';
import { useRoq } from '../Provider/Provider';
import { Card } from '../Card';

interface IRequest {
  url: string
  query: DocumentNode,
  headers?: Record<string, unknown>,
  variables?: Record<string, unknown>
}
const request = (args: IRequest, dataPath: string = '') => fetch(args.url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    ...(args.headers ?? {})
  },
  body: JSON.stringify({ 
    query: print(args.query),
    variables: args.variables ?? undefined
  })
}).then(async (_data) => {
  const data = await _data.json()
  if (dataPath) {
    return _get(data, dataPath)
  }
  return data
})

function useOnRowRender(item: notificationsInAppForCurrentUser_notificationsInAppForCurrentUser_data) {

}

function useNotificationsInApp() {
  const { host, token } = useRoq()
  
  return useQuery(["NotificationsInAppForCurrentUser"], async () => {
    // const {
    //   notificationsInAppForCurrentUser: { data },
    // } = await client.request(
    //   NotificationsInAppForCurrentUser
    // );
    // console.log('returnuseQuery -> data', data)
    const variables = {
      limit: 20,
      order: {
        order: 'DESC',
        sort: 'createdAt',
      },
      notificationfilter: {
        createdAt: {
          moreThan: new Date().toISOString(),
        },
      },
      unreadCountFilter: {
        createdAt: {
          moreThan: new Date().toISOString(),
        },
        read: {
          equalTo: false,
        },
      },
    }
    const items = await request({ url: host, query: NotificationsInAppForCurrentUser, variables, headers: {
      'roq-platform-authorization': token as string 
    }}, 'data.notificationsInAppForCurrentUser.data').catch(() => [])
    
    return items as notificationsInAppForCurrentUser_notificationsInAppForCurrentUser_data[]
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

export const Notification: React.FC = () => {
  const { status, data, error, isFetching } = useNotificationsInApp();
  
  return (
    <div>
      Notification!!!
      <br />
      {isFetching && 'Loading...'}
      <ul>
        {data?.map((item) => <Card key={item.id} title={item.title}>{item.content}</Card>)}
      </ul>
    </div>
  )
}

