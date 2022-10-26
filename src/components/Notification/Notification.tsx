import { request } from '../../utils'
import React, { ReactNode, useMemo, useState } from 'react'
import clsx from 'clsx'
import _get from 'lodash/get'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ToggleGroup, ToggleGroupItem, TypeToggleGroup } from 'src/components/ToggleGroup'
import { QueryObserverResult, useQuery } from 'react-query'
import {
  MarkNotificationAsRead,
  MarkNotificationAsUnRead,
  NotificationsInAppForCurrentUser,
} from 'src/lib/graphql/query'
import { notificationsInAppForCurrentUser, notificationsInAppForCurrentUser_notificationsInAppForCurrentUser_data } from 'src/lib/graphql/types'
import { IRoqProvider, useResolveProvider } from 'src/components/Provider'
import { Card } from 'src/components/Card'
import { NotificationBadge } from './NotificationBadge'
import { styled } from 'src/styles'

import type { StyledCardPropsType } from 'src/components/Card'
import type { ClassValue } from 'clsx'
import { NotificationReadButton } from './NotificationReadButton'

dayjs.extend(relativeTime)

const _CLASS_IS = 'roq-' + 'notification';

const minDate = '2022-09-19T03:40:40.534Z'
export type NotificationType = 'all' | 'unread'

export function useNotificationsInApp(
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

export type NotificationContentViewCallbackProps = {
  data: notificationsInAppForCurrentUser_notificationsInAppForCurrentUser_data,
  onRead: () => Promise<Record<string, any>>
  onUnRead: () => Promise<Record<string, any>>
  refetch: () => Promise<Record<string, any>>
}

export type NotificationLoadingViewCallbackProps = QueryObserverResult<notificationsInAppForCurrentUser>
export type NotificationChildrenCallbackProps = NotificationLoadingViewCallbackProps & NotificationTypeToggleCallbackProps
export type NotificationTypeToggleCallbackProps = {
  type: NotificationType,
  setType: React.Dispatch<React.SetStateAction<NotificationType>>,
}
export interface NotificationProps extends Partial<IRoqProvider> {
  type?: NotificationType
  children?: (callback: NotificationChildrenCallbackProps) => JSX.Element
  loadingView?: (callback: NotificationLoadingViewCallbackProps) => JSX.Element | null
  contentView?: (
    callback: NotificationContentViewCallbackProps,
  ) => JSX.Element
  contentCardProps?: React.ComponentProps<StyledCardPropsType>
  titleProps?: {
    children?: (callback: NotificationTitleChildrenCallbackProps) => JSX.Element
    title?: ReactNode,
    count?: number,
    css?: React.ComponentProps<typeof StyledNotificationTitle>['css']
    className?: ClassValue
  }
  typeToggleProps?: {
    children?: (callback: NotificationTypeToggleCallbackProps) => JSX.Element
    css?: React.ComponentProps<TypeToggleGroup>['css']
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
    children,
    loadingView,
    ...rest
  } = props
  const { host, token } = useResolveProvider({ host: _host, token: _token })
  const [type, setType] = useState<NotificationType>(typeProp || 'all')
  const fetchResult = useNotificationsInApp({
    host,
    token,
    type,
  })
  if (children) {
    return children({ ...fetchResult, type, setType })
  }

  const { status, data, error, isFetching, refetch } = fetchResult
  const items = useMemo(() => _get(data, 'loadNotifications.data', []), [data])

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
        <Card
          {...contentCardProps}
          key={item.id}
          title={item.title}
          subTitle={dayjs(item.createdAt).fromNow()}
          id={item.id}
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
          headerExtraContent={<NotificationReadButton id={item.id} read={item.read} />}
          className={clsx(_CLASS_IS + '-item', contentCardProps?.className)}
        />
      )
    })
  }, [items, contentView])

  const renderToggleType = useMemo(() => {
    if (typeToggleProps?.children) {
      return typeToggleProps.children({ type, setType })
    }
    return (
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
    )
  }, [typeToggleProps, type, setType])

  const renderLoading = useMemo(() => {
    if (loadingView) {
      return loadingView(fetchResult)
    }
    return <div>{isFetching && token && host && !data && 'Loading...'}</div>
  }, [loadingView, token, host, data, isFetching])
  
  return (
    <StyledNotification
      {...rest}
      className={clsx(_CLASS_IS, rest?.className)}
    >
      <NotificationTitle
        {...titleProps || {}}
        count={data?.loadUnreadNotificationCount?.totalCount ?? 0}
        loading={isFetching}
      />
      {renderToggleType}
      {renderLoading}
      {renderItems}
    </StyledNotification>
  )
}

const StyledNotificationTitle = styled('div', {
  marginBottom: '16px'
})

export interface NotificationTitleChildrenCallbackProps {
  count: number
  loading: boolean
}
export type NotificationTitleProps = NotificationProps['titleProps'] & {
  children?: (callback: NotificationTitleChildrenCallbackProps) => JSX.Element
  count: number,
  loading: boolean
}
const NotificationTitle: React.FC<NotificationTitleProps> = (props) => {
  const { children, count, loading, title } = props
  if (children) {
    return children({ count, loading })
  }

  return (
    <StyledNotificationTitle
      css={props.css}
      className={clsx(
        _CLASS_IS + '-title',
        props.className,
      )}
      >
      {title ?? 'Notification'}
      {' '}
      <NotificationBadge className={clsx(_CLASS_IS + '-title-badges')}>
        {count}
      </NotificationBadge>
    </StyledNotificationTitle>
  )
}
