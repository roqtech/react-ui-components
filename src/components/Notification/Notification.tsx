import { request } from '../../utils'
import React, { useMemo, useState } from 'react'
import clsx from 'clsx'
import _get from 'lodash/get'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ToggleGroup, ToggleGroupItem } from 'src/components/ToggleGroup'
import { useQuery } from 'react-query'
import {
  MarkNotificationAsRead,
  MarkNotificationAsUnRead,
  NotificationsInAppForCurrentUser,
} from 'src/lib/graphql/query'
import { notificationsInAppForCurrentUser_notificationsInAppForCurrentUser_data } from 'src/lib/graphql/types'
import { useRoq, IRoqProvider } from 'src/components/Provider'
import { Card, CardProps } from '../Card'
import { NotificationBadges } from './NotificationBadget'
import { styled } from 'src/styles'
import { NotificationReadButton, NotificationReadButtonProps } from './NotificationReadButton'
import type { StyledCardPropsType } from '../Card/Card'
import type { ClassValue } from 'clsx'

dayjs.extend(relativeTime)

const _CLASS_IS = 'roq-' + 'notification';
function useResolveProvider(args: Partial<IRoqProvider>) {
  const { host: hostArg, token: tokenArg } = args
  const { host: hostProvide, token: tokenProvider } = useRoq()
  const host = hostArg ?? hostProvide
  const token = tokenArg ?? tokenProvider
  return { host, token }
}

const minDate = '2022-09-19T03:40:40.534Z'
export type NotificationType = 'all' | 'unread'

function useNotificationsInApp(
  args: Pick<NotificationProps, 'token' | 'host' | 'type'>,
) {
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
      ...(type === 'unread' ? { read: { equalTo: false } } : {}),
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

  return useQuery(
    ['NotificationsInAppForCurrentUser', variables],
    async () => {
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
    },
    {
      refetchOnWindowFocus: false,
    },
  )
}

type ContentViewProps = Pick<CardProps, 'subTitle' | 'title' | 'content'> &
  NotificationReadButtonProps 
type ContentViewCallbackProps = {
  data: notificationsInAppForCurrentUser_notificationsInAppForCurrentUser_data,
  onRead: () => Promise<Record<string, any>>
  onUnRead: () => Promise<Record<string, any>>
  refetch: () => Promise<Record<string, any>>
}
interface NotificationProps extends Partial<IRoqProvider> {
  type?: NotificationType
  contentView?: (
    callback: ContentViewCallbackProps,
  ) => JSX.Element
  contentCardProps?: React.ComponentProps<StyledCardPropsType>
  titleProps?: {
    children?: React.ReactNode,
    css?: React.ComponentProps<typeof NotificationTitle>['css']
    className?: ClassValue
  }
  typeToggleProps?: {
    css?: React.ComponentProps<typeof NotificationTitle>['css']
    className?: ClassValue
  }
}

const NotificationContent = styled('div', {
  position: 'relative',
  '> span': {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 4,
    height: 4,
    color: '$red9',
  },
})

const NotificationContentCard: React.FC<
  Pick<ContentViewProps, 'id' | 'content' | 'title' | 'subTitle' | 'read'> & React.ComponentProps<typeof Card>
> = (props) => {
  const { id, content, title, subTitle, read, ...rest } = props

  return (
    <Card
      key={id}
      title={title}
      subTitle={subTitle}
      content={content}
      headerExtraContent={<NotificationReadButton id={id} read={read} />}
      {...rest}
    />
  )
}
const StyledNotification = styled('div')
export const Notification: React.FC<React.ComponentProps<typeof StyledNotification> & NotificationProps> = (props) => {
  const {
    type: typeProp,
    contentView,
    host: _host,
    token: _token,
    contentCardProps,
    typeToggleProps,
    titleProps,
    ...rest
  } = props
  const { host, token } = useResolveProvider({ host: _host, token: _token })
  const [type, setType] = useState<NotificationType>(typeProp || 'all')
  const { status, data, error, isFetching, refetch } = useNotificationsInApp({
    host,
    token,
    type,
  })

  const items = useMemo(() => _get(data, 'loadNotifications.data', []), [data])
  // console.log('items', items)

  const renderItems = useMemo(() => {
    return items.map((item) => {
      if (contentView) {
        return contentView({
          data: item,
          onRead: () =>
            request({
              url: host as string,
              query: MarkNotificationAsRead,
              variables: { id: item.id },
              headers: {
                'roq-platform-authorization': token as string,
              },
            })
            .then((res) => res.json())
            .catch(() => false),
          onUnRead: () =>
            request({
              url: host as string,
              query: MarkNotificationAsUnRead,
              variables: { id: item.id },
              headers: {
                'roq-platform-authorization': token as string,
              },
            })
              .then((res) => res.json())
              .catch(() => false),
          refetch,
        })
      }

      return (
        <NotificationContentCard
          {...contentCardProps}
          key={item.id}
          title={item.title}
          subTitle={dayjs(item.createdAt).fromNow()}
          id={item.id}
          read={item.read}
          content={
            <NotificationContent>
              {item.content}{' '}
              {!item.read && (
                <span>
                  <svg
                    width='15'
                    height='15'
                    viewBox='0 0 15 15'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                </span>
              )}
            </NotificationContent>
          }
          className={clsx(_CLASS_IS + '-item', contentCardProps?.className)}
        />
      )
    })
  }, [items, contentView])

  return (
    <StyledNotification
      {...rest}
      className={clsx(_CLASS_IS, rest?.className)}
    >
      <NotificationTitle
        css={titleProps?.css}
        className={clsx(
          _CLASS_IS + '-title',
          titleProps?.className,
        )}
      >
        {titleProps?.children ?? 'Notification'}
        {' '}
        <NotificationBadges className={clsx(_CLASS_IS + '-title-badges')}>
          {data?.loadUnreadNotificationCount?.totalCount ?? 0}
        </NotificationBadges>
      </NotificationTitle>
      <ToggleGroup
        type='single'
        value={type}
        onValueChange={(value: NotificationType) => setType(value)}
        css={typeToggleProps?.css}
        className={clsx(_CLASS_IS + '-type-toggle', typeToggleProps?.className)}
      >
        <ToggleGroupItem value='all'>All</ToggleGroupItem>
        <ToggleGroupItem value='unread'>Unread</ToggleGroupItem>
      </ToggleGroup>
      <div>{isFetching && token && host && !data && 'Loading...'}</div>
      {renderItems}
    </StyledNotification>
  )
}

const NotificationTitle = styled('div', {
  marginBottom: '16px'
})
