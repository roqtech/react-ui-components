import React, { ReactElement, ComponentType, ReactNode, useMemo, useState } from 'react'
import clsx from 'clsx'
import _get from 'lodash/get'
import dayjs from 'dayjs'
import type { ClassValue } from 'clsx'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Card, ToggleGroup, ToggleGroupItem } from 'src/components/common'
import {
  MarkNotificationAsRead,
  MarkNotificationAsUnRead,
} from 'src/lib/graphql/notification/query'
import { NotificationsFeedQuery, NotificationsFeedQueryVariables } from 'src/lib/graphql/types/graphql'
import { NotificationReadButton } from 'src/components/notification/notification-read-button'
import { Avatar } from 'src/components/common'
import { useFetchNotificationsInApp } from 'src/components/notification/hooks'
import { QueryResult } from '@apollo/client'
import { TransformErrorInterface, transformApolloError } from 'src/utils'
import { useRoqTranslation } from 'src/components/core/roq-provider'
import './notification.scss'

dayjs.extend(relativeTime)

const _CLASS_IS = 'roq-' + 'notification';
export type NotificationType = 'all' | 'unread'
export type NotificationContentViewCallbackProps = {
  data: NotificationsFeedQuery['notificationFeed']['data']['0'],
  read: () => Promise<Record<string, any>>
  unRead: () => Promise<Record<string, any>>
  refetch: () => Promise<Record<string, any>>
}

export type NotificationLoadingViewCallbackProps = QueryResult<NotificationsFeedQuery, NotificationsFeedQueryVariables>
export type NotificationChildrenCallbackProps = NotificationLoadingViewCallbackProps & NotificationTypeToggleCallbackProps
export type NotificationTypeToggleCallbackProps = {
  type: NotificationType,
  setType: React.Dispatch<React.SetStateAction<NotificationType>>,
}
export interface NotificationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
  type?: NotificationType
  className?: ClassValue
  components?: {
    Container?: ComponentType<any>;
  }
  children?: (callback: NotificationChildrenCallbackProps) => ReactElement
  loadingView?: (callback: NotificationLoadingViewCallbackProps) => JSX.Element | ReactElement | null
  contentView?: (
    callback: NotificationContentViewCallbackProps,
  ) => JSX.Element | ReactElement
  titleProps?: {
    Container?: ComponentType<any>;
    children?: (callback: NotificationTitleChildrenCallbackProps) => JSX.Element | ReactElement
    title?: ReactNode,
    count?: number,
    className?: ClassValue
  }
  typeToggleProps?: {
    children?: (callback: NotificationTypeToggleCallbackProps) => JSX.Element | ReactElement
    className?: ClassValue
  },
  onFetchNotificationsSuccess?: (data: NotificationsFeedQuery) => void
  onFetchNotificationsError?: (error: TransformErrorInterface) => void
}

export const Notification: React.FC<NotificationProps> = (props) => {
  const {
    components,
    type: typeProp,
    contentView,
    typeToggleProps,
    titleProps,
    children,
    loadingView,
    // fetchProps,
    onFetchNotificationsSuccess,
    onFetchNotificationsError,
    ...rest
  } = props
  const [type, setType] = useState<NotificationType>(typeProp || 'all')
  const fetchResult = useFetchNotificationsInApp({
    type,
  }, {
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      onFetchNotificationsSuccess?.(data)
    },
    onError(error) {
      onFetchNotificationsError?.(transformApolloError(error))
    },
  })
  if (children) {
    return children({ ...fetchResult, type, setType })
  }

  const { data, loading, refetch, client } = fetchResult
  const items: NotificationsFeedQuery['notificationFeed']['data'] = useMemo(() => data?.notificationFeed?.data ?? [], [data])

  const renderItems = useMemo(() => {
    return items.map((item) => {
      if (contentView) {
        return contentView({
          data: item,
          read: () =>
            client.mutate({
              mutation: MarkNotificationAsRead,
              variables: { id: item.id },
              context: { service: 'platform' },
            }),
          unRead: () =>
            client.mutate({
              mutation: MarkNotificationAsUnRead,
              variables: { id: item.id },
              context: { service: 'platform' },
            }),
          refetch,
        })
      }
      const isRead = item.seen !== 'false'
      return (
        <Card
          key={item.id}
          title={item.title}
          subTitle={dayjs(item.createdAt).fromNow()}
          content={
            <div className={clsx(_CLASS_IS + '-item-content')}>
              {item.content}{' '}
              {!isRead && (
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
            </div>
          }
          headerExtraContent={<NotificationReadButton id={item.id} read={isRead} />}
          className={clsx(_CLASS_IS + '-item')}
        />
      )
    })
  }, [items, contentView])

  const { t } = useRoqTranslation()

  const renderToggleType = useMemo(() => {
    if (typeToggleProps?.children) {
      return typeToggleProps.children({ type, setType })
    }
    return (
      <ToggleGroup
        value={type}
        onValueChange={(value) => setType(value as NotificationType)}
        className={clsx(_CLASS_IS + '-type-toggle', typeToggleProps?.className)}
      >
        <ToggleGroupItem value='all'>{t('common.all')}</ToggleGroupItem>
        <ToggleGroupItem value='unread'>{t('common.unread')}</ToggleGroupItem>
      </ToggleGroup>
    )
  }, [typeToggleProps, type, setType, t])

  const renderLoading = useMemo(() => {
    if (loadingView) {
      return loadingView(fetchResult)
    }
    return <div>{loading && !data && t('common.loading')}</div>
  }, [loadingView, data, loading, t])

  const Container = components?.Container ?? 'div'
  
  return (
    <Container {...rest} className={clsx(_CLASS_IS, rest?.className)}>
      <NotificationTitle
        {...(titleProps || {})}
        count={data?.notificationFeed?.totalCount ?? 0}
        loading={loading}
      />
      {renderToggleType}
      {renderLoading}
      {renderItems}
    </Container>
  )
}

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
  const Container = props?.Container ?? 'div'
  const { t } = useRoqTranslation()

  return (
    <Container
      className={clsx(
        _CLASS_IS + '-title',
        props.className,
      )}
      >
      {title ?? t('common.Notification')}
      {' '}
      <Avatar className={clsx(_CLASS_IS + '-title-badges')} initials={count.toString()} />
    </Container>
  )
}
