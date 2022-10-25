import React, { ReactElement, ReactNode, useMemo } from 'react'
import _get from 'lodash/get'
import clsx from 'clsx'
import { styled } from 'src/styles'
import { IRoqProvider, useResolveProvider } from '../Provider'
import { SwitchThumb, Switch } from 'src/components/Switch'
import { QueryObserverResult } from '@tanstack/react-query'
import {
  NotificationTypeCategoriesQuery,
  useNotificationTypeCategoriesQuery,
} from 'src/lib/graphql/types'
import {
  UseNotificationItemCheckedInterfaceArg,
  useNotificationTypeItem,
} from './use-notification-type.hook'
import {
  useNotificationTypeCategory,
  UseNotificationTypeCategoryInterfaceArg,
} from './use-notification-category.hook'
import type { ClassValue } from 'clsx'

export function useNotificationsCategories(
  args: Pick<NotificationPreferenceProps, 'token' | 'host'>,
) {
  const { host, token } = useResolveProvider({
    host: args.host,
    token: args.token,
  })
  return useNotificationTypeCategoriesQuery(
    {
      endpoint: host,
      fetchParams: {
        headers: {
          'content-type': 'application/json',
          'roq-platform-authorization': token as string,
        },
      },
    },
    undefined,
    { refetchOnWindowFocus: false },
  )
}

const StyledNotificationPreference = styled('div', {})
const StyledNotificationPreferenceTitle = styled('h5', {
  margin: 0,
  marginBottom: 12,
  fontSize: '1.25rem',
})
const StyledNotificationCategoryItem = styled('div', {
  paddingBottom: 12,
  '> div:nth-child(1)': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '.roq-notification-preference-category-item-type': {
    padding: '6px 0',
  },
  '.roq-notification-preference-category-item-type > div': {
    display: 'flex',
    padding: '4px 0',
  },
  '.roq-notification-preference-category-item-type input': {
    marginRight: 10,
  },
  '.roq-notification-preference-category-item-type label': {
    cursor: 'pointer',
  },
})

export type NotificationPreferenceLoadingViewCallbackProps =
  QueryObserverResult<NotificationTypeCategoriesQuery>
export type NotificationPreferenceCategoriesViewCallbackProps =
  NotificationTypeCategoriesQuery['notificationTypeCategories']['data']
const _CLASS_IS = 'roq-' + 'notification-preference'
interface NotificationPreferenceProps extends Partial<IRoqProvider> {
  children?: (
    callback: NotificationPreferenceLoadingViewCallbackProps,
  ) => JSX.Element
  titleProps?: {
    children?: ReactNode
    css?: React.ComponentProps<typeof StyledNotificationPreferenceTitle>['css']
    className?: ClassValue
  }
  categoryView?: (
    callback: NotificationPreferenceLoadingViewCallbackProps,
  ) => ReactElement | ReactElement[] | JSX.Element | JSX.Element[] | null
  categoryItemProps?: {
    css?: React.ComponentProps<typeof StyledNotificationCategoryItem>['css']
    className?: ClassValue
  }
  onToggle?: NotificationCategoryPreferencesProps['onToggle']
}
const NotificationPreference: React.FC<
  React.ComponentProps<typeof StyledNotificationPreference> &
    NotificationPreferenceProps
> = (props) => {
  const {
    children,
    titleProps,
    categoryView,
    categoryItemProps,
    onToggle,
    ...rest
  } = props
  const fetchResult = useNotificationsCategories(props)
  if (children) {
    return children(fetchResult)
  }

  const { status, data, error, isFetching, refetch } = fetchResult
  const categories: NotificationTypeCategoriesQuery['notificationTypeCategories']['data'] =
    useMemo(() => data?.notificationTypeCategories?.data || [], [data])

  const renderTitle = useMemo(() => {
    if (titleProps?.children) {
      return titleProps.children
    }
    return (
      <StyledNotificationPreferenceTitle
        css={titleProps?.css}
        className={clsx(_CLASS_IS + '-title', titleProps?.className)}
      >
        Notification preference
      </StyledNotificationPreferenceTitle>
    )
  }, [titleProps])

  const renderCategories = useMemo(() => {
    if (categoryView) {
      return categoryView(fetchResult)
    }
    return categories?.map((category) => (
      <StyledNotificationCategoryItem
        key={category.id}
        css={categoryItemProps?.css}
        className={clsx(
          _CLASS_IS + '-category-item',
          categoryItemProps?.className,
        )}
      >
        <NotificationCategoryPreferences
          key={category.id}
          category={category}
          onToggle={onToggle}
        />
      </StyledNotificationCategoryItem>
    ))
  }, [categories])

  return (
    <StyledNotificationPreference
      css={rest?.css}
      className={clsx(_CLASS_IS, rest?.className)}
    >
      {renderTitle}
      {renderCategories}
    </StyledNotificationPreference>
  )
}

export { NotificationPreference, NotificationPreferenceProps }

interface NotificationCategoryPreferencesProps {
  category: NotificationTypeCategoriesQuery['notificationTypeCategories']['data'][0]
  onToggle?: UseNotificationTypeCategoryInterfaceArg['onToggle']
}
const NotificationCategoryPreferences: React.FC<NotificationCategoryPreferencesProps> =
  (props) => {
    const { category, onToggle } = props
    const { checkedSwitch, handleSwitchChange } = useNotificationTypeCategory({
      category,
      onToggle,
    })

    return (
      <>
        <div className={clsx(_CLASS_IS + '-category-item-type')}>
          <p>{category?.key}</p>
          <Switch
            checked={checkedSwitch}
            onCheckedChange={(checked) => handleSwitchChange(checked)}
            color='secondary'
            name='checkedSwitch'
          >
            <SwitchThumb />
          </Switch>
        </div>
        {category.notificationTypes?.data?.map((type) => (
          <NotificationTypePreferences
            key={type.id}
            type={type}
            onToggle={onToggle}
          />
        ))}
      </>
    )
  }

const Flex = styled('div', {
  display: 'flex',
  width: '33.3%',
  alignItems: 'center',
})
interface NotificationTypePreferencesProps {
  type: NotificationCategoryPreferencesProps['category']['notificationTypes']['data'][0]
  onToggle?: UseNotificationItemCheckedInterfaceArg['onToggle']
}
const NotificationTypePreferences: React.FC<NotificationTypePreferencesProps> =
  (props) => {
    const { type, onToggle } = props
    const {
      checkedAppNotification,
      checkedEmailNotification,
      handleSwitchChange,
      resetSuccess,
    } = useNotificationTypeItem({ type, onToggle })

    return (
      <div className={clsx(_CLASS_IS + '-category-item-type')}>
        <p>{type?.description}</p>
        <div>
          <Flex>
            <input
              type='checkbox'
              id='in-app'
              name='checkedAppNotifications'
              checked={checkedAppNotification}
              onChange={handleSwitchChange}
            />
            <label htmlFor='in-app'>In-app</label>
          </Flex>
          <Flex>
            <input
              type='checkbox'
              id='email'
              name='checkedEmailNotifications'
              checked={checkedEmailNotification}
              onChange={handleSwitchChange}
            />
            <label htmlFor='email'>Email</label>
          </Flex>
        </div>
      </div>
    )
  }
