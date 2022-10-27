import { request } from '../../utils'
import React, { ReactElement, ReactNode, useMemo, useState } from 'react'
import clsx from 'clsx'
import _get from 'lodash/get'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ToggleGroup, ToggleGroupItem, TypeToggleGroup } from 'src/components/ToggleGroup'
import { QueryObserverResult } from '@tanstack/react-query'
import {
  MarkNotificationAsRead,
  MarkNotificationAsUnRead,
} from 'src/lib/graphql/query'
import { NotificationsInAppForCurrentUserQuery, NotificationsInAppForCurrentUserQueryVariables } from 'src/lib/graphql/types'
import { IRoqProvider, useResolveProvider } from 'src/components/Provider'
import { Card } from 'src/components/Card'
import { NotificationBadge } from './NotificationBadge'
import { styled } from 'src/styles'

import type { StyledCardPropsType } from 'src/components/Card'
import type { ClassValue } from 'clsx'
import { NotificationReadButton } from './NotificationReadButton'
import { useFetchNotificationsInApp } from './hooks/use-fetch-notifications-in-app'

dayjs.extend(relativeTime)

const _CLASS_IS = 'roq-' + 'notification';
export type NotificationType = 'all' | 'unread'
export type NotificationContentViewCallbackProps = {
  data: NotificationsInAppForCurrentUserQuery['loadNotifications']['data'][0],
  onRead: () => Promise<Record<string, any>>
  onUnRead: () => Promise<Record<string, any>>
  refetch: () => Promise<Record<string, any>>
}
export type NotificationLoadingViewCallbackProps = QueryObserverResult<NotificationsInAppForCurrentUserQuery>
export type NotificationChildrenCallbackProps = NotificationLoadingViewCallbackProps & NotificationTypeToggleCallbackProps
export type NotificationTypeToggleCallbackProps = {
  type: NotificationType,
  setType: React.Dispatch<React.SetStateAction<NotificationType>>,
}
export interface NotificationProps extends Partial<IRoqProvider> {
  type?: NotificationType
  children?: (callback: NotificationChildrenCallbackProps) => ReactElement
  loadingView?: (callback: NotificationLoadingViewCallbackProps) => JSX.Element | ReactElement | null
  contentView?: (
    callback: NotificationContentViewCallbackProps,
  ) => JSX.Element | ReactElement
  contentCardProps?: React.ComponentProps<StyledCardPropsType>
  titleProps?: {
    children?: (callback: NotificationTitleChildrenCallbackProps) => JSX.Element | ReactElement
    title?: ReactNode,
    count?: number,
    css?: React.ComponentProps<typeof StyledNotificationTitle>['css']
    className?: ClassValue
  }
  typeToggleProps?: {
    children?: (callback: NotificationTypeToggleCallbackProps) => JSX.Element | ReactElement
    css?: React.ComponentProps<TypeToggleGroup>['css']
    className?: ClassValue
  },
  fetchProps?: {
    variables?: NotificationsInAppForCurrentUserQueryVariables
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
    fetchProps,
    ...rest
  } = props
  const { host, token } = useResolveProvider({ host: _host, token: _token })
  const [type, setType] = useState<NotificationType>(typeProp || 'all')
  const fetchResult = useFetchNotificationsInApp({
    host,
    token,
    type,
    fetchProps
  })
  if (children) {
    return children({ ...fetchResult, type, setType })
  }

  const { status, data, error, isFetching, refetch } = fetchResult
  const items: NotificationsInAppForCurrentUserQuery['loadNotifications']['data'] = useMemo(() => _get(data, 'loadNotifications.data', []), [data])

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

export const withNotification = (Component: React.ComponentType<any>) => {

  const [state, setState]
  
  return (
    <Notification>
      {({ isSuccess }) => <Component {...notificationProps} />}
    </Notification>
  )
}
