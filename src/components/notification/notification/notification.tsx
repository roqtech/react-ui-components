import React, { ReactElement, ComponentType, ReactNode, useMemo, useState } from 'react'
import clsx from 'clsx'
import _get from 'lodash/get'
import dayjs from 'dayjs'
import type { ClassValue } from 'clsx'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Card, ToggleGroup, ToggleGroupItem, Tabs, TabItem } from 'src/components/common'
import { MarkNotificationSeen } from 'src/lib/graphql/notification/query'
import { NotificationsFeedQuery } from 'src/lib/graphql/types/graphql'
import { NotificationReadButton } from 'src/components/notification/notification-read-button'
import { Avatar } from 'src/components/common'
import { useFetchNotificationsFeed } from 'src/components/notification/hooks'
import { TransformErrorInterface, transformApolloError } from 'src/utils'
import { useRoqTranslation } from 'src/components/core/roq-provider'
import { NotificationsFeedQueryHookResult } from 'src/lib/graphql/hooks/generated'
import { COMPONENT_CLASS_PREFIX } from 'src/utils/constant'
import './notification.scss'

dayjs.extend(relativeTime)

const _CLASS_IS =  COMPONENT_CLASS_PREFIX + 'notification';
export type NotificationType = 'all' | 'unread'
export type NotificationContentViewCallbackProps = {
  data: NotificationsFeedQuery['notificationFeed']['data']['0'],
  read: () => Promise<Record<string, any>>
  refetch: () => Promise<Record<string, any>>
}

export type NotificationLoadingViewCallbackProps = NotificationsFeedQueryHookResult
export type NotificationChildrenCallbackProps = NotificationLoadingViewCallbackProps & NotificationTypeToggleCallbackProps
export type NotificationTypeToggleCallbackProps = {
  type: NotificationType,
  setType: React.Dispatch<React.SetStateAction<NotificationType>>,
}
export interface NotificationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
  type?: NotificationType
  className?: ClassValue
  classNames?: {
    Title: ClassValue,
    Tabs: ClassValue
    Empty: ClassValue
  }
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
  }
  typeToggleProps?: {
    children?: (callback: NotificationTypeToggleCallbackProps) => JSX.Element | ReactElement
  },
  onFetchNotificationsSuccess?: (data: NotificationsFeedQuery) => void
  onFetchNotificationsError?: (error: TransformErrorInterface) => void
  pollInterval?: number
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
    onFetchNotificationsSuccess,
    onFetchNotificationsError,
    pollInterval,
    classNames,
    ...rest
  } = props
  const [type, setType] = useState<NotificationType>(typeProp || 'all')
  const fetchResult = useFetchNotificationsFeed({
    type,
  }, {
    fetchPolicy: 'cache-and-network',
    pollInterval: (pollInterval ?? 1000 * 15),
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

  const { t } = useRoqTranslation()
  const { data, loading, refetch, client } = fetchResult
  const items: NotificationsFeedQuery['notificationFeed']['data'] = useMemo(() => {
    if (type === 'all') {
      return data?.notificationFeed?.data ?? []
    }
    return []
  }, [data, type])

  const renderItems = useMemo(() => {
    if (!loading && items.length === 0) {
      return (
        <div className={clsx(_CLASS_IS + '-empty-state', classNames?.Empty)}>
          <svg
            width={86}
            height={86}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43 66.65c1.374 0 2.553-.508 3.539-1.523.985-1.015 1.478-2.21 1.478-3.583H37.894c0 1.373.508 2.568 1.523 3.583 1.015 1.015 2.21 1.523 3.583 1.523ZM25.62 56.169h34.67v-5.375h-3.584V40.492c0-3.584-.94-6.883-2.822-9.9-1.88-3.015-4.523-4.852-7.928-5.509v-2.687c0-.836-.283-1.538-.85-2.105-.568-.568-1.27-.851-2.106-.851-.836 0-1.553.283-2.15.85-.597.568-.896 1.27-.896 2.106v2.687c-3.404.657-6.047 2.42-7.928 5.286-1.881 2.866-2.822 6.062-2.822 9.585v10.84h-3.583v5.375ZM43 78.833c-4.897 0-9.526-.94-13.885-2.822-4.36-1.88-8.167-4.449-11.422-7.704-3.255-3.255-5.823-7.062-7.704-11.422C8.107 52.525 7.167 47.897 7.167 43c0-4.957.94-9.615 2.822-13.975 1.88-4.36 4.449-8.152 7.704-11.377 3.255-3.225 7.062-5.778 11.422-7.66 4.36-1.88 8.988-2.821 13.885-2.821 4.957 0 9.615.94 13.975 2.822 4.36 1.88 8.152 4.434 11.377 7.659 3.225 3.225 5.778 7.017 7.66 11.377 1.88 4.36 2.821 9.018 2.821 13.975 0 4.897-.94 9.526-2.822 13.885-1.88 4.36-4.434 8.167-7.659 11.422-3.225 3.255-7.017 5.823-11.377 7.704-4.36 1.882-9.018 2.822-13.975 2.822Z"
              fill="#207BE5"
            />
          </svg>
          <p>{t('notification.no-notifications-right-now')}</p>
        </div>
      )
    }
    return items.map((item) => {
      if (contentView) {
        return contentView({
          data: item,
          read: () =>
            client.mutate({
              mutation: MarkNotificationSeen,
              variables: { id: item.id },
              context: { service: 'platform' },
            }),
          refetch,
        })
      }
      return (
        <Card
          key={item.id}
          title={item.title}
          content={
            <div className={clsx(_CLASS_IS + '-item-content')}>
              <p>{item.content}</p>
              <p>{dayjs(item.createdAt).fromNow()}</p>
            </div>
          }
          icon={<svg
            width={35}
            height={35}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx={17.5} cy={17.5} r={17.5} fill="#EAF8FD" />
            <path
              d="M10.334 22.834v-1.25h1.75v-6.375c0-1.167.344-2.205 1.031-3.115a4.445 4.445 0 0 1 2.719-1.719v-.604c0-.32.115-.583.344-.792.229-.208.503-.312.823-.312.32 0 .593.104.823.312.229.209.343.473.343.792v.604a4.488 4.488 0 0 1 2.73 1.72c.694.909 1.041 1.947 1.041 3.114v6.375h1.73v1.25H10.333Zm6.667 2.5c-.445 0-.834-.163-1.167-.49a1.589 1.589 0 0 1-.5-1.177h3.333c0 .458-.163.85-.49 1.177-.326.326-.718.49-1.176.49Zm-3.667-3.75h7.354v-6.375c0-1.028-.354-1.903-1.062-2.625-.709-.723-1.577-1.084-2.605-1.084-1.027 0-1.899.361-2.614 1.084-.715.722-1.073 1.597-1.073 2.625v6.375Z"
              fill="#207BE5"
            />
          </svg>}
          headerExtraContent={<NotificationReadButton id={item.id} read={item.seen} />}
          className={clsx(_CLASS_IS + '-item', {
            [_CLASS_IS + '-item__unseen']: !item.seen,
          })}
        />
      )
    })
  }, [items, type, contentView, classNames])


  const renderToggleType = useMemo(() => {
    if (typeToggleProps?.children) {
      return typeToggleProps.children({ type, setType })
    }
    return (
      <Tabs
        value={type}
        onValueChange={(value) => setType(value as NotificationType)}
        className={clsx(_CLASS_IS + '-type-toggle', classNames?.Tabs)}
      >
        <TabItem value='all'>{t('common.all')}</TabItem>
        <TabItem value='unread'>{t('common.unread')}</TabItem>
      </Tabs>
    )
  }, [typeToggleProps, type, setType, classNames])

  const renderLoading = useMemo(() => {
    if (loadingView) {
      return loadingView(fetchResult)
    }
    return <div style={{ margin: '1rem'}}>{loading && !data && t('common.loading')}</div>
  }, [loadingView, data, loading, t])

  const Container = components?.Container ?? 'div'
  
  return (
    <Container {...rest} className={clsx(_CLASS_IS, rest?.className)}>
      <NotificationTitle
        {...(titleProps || {})}
        count={data?.notificationFeed?.totalCount ?? 0}
        loading={loading}
        className={classNames?.Title}
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
  className?: ClassValue
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
      {title ?? t('common.Notifications')}
      {' '}
      {/* <Avatar size='medium' className={clsx(_CLASS_IS + '-title-badges')} initials={count.toString()} /> */}
    </Container>
  )
}
