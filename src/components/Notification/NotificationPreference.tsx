import React, { ReactElement, ReactNode, useCallback, useMemo, useState } from 'react'
import _get from 'lodash/get'
import clsx from 'clsx'
import { styled } from 'src/styles'
import { IRoqProvider, useResolveProvider } from '../Provider'
import { SwitchThumb, Switch } from 'src/components/Switch'
import { QueryNotificationTypeCategories } from 'src/lib/graphql/query'
import { request } from 'src/utils'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { NotificationTypeCategoriesQuery, useNotificationTypeCategoriesQuery } from 'src/lib/graphql/types'

import type { ClassValue } from 'clsx'
import { gray } from '@radix-ui/colors'
import { useNotificationTypeItem } from './use-notification-type.hook'
import { useNotificationTypeCategory } from './use-notification-category.hook'

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

const StyledNotificationPreference = styled('div', {
  
})
const StyledNotificationPreferenceTitle = styled('h5', {
  margin: 0,
  marginBottom: 12,
  fontSize: '1.25rem',
})
const StyledNotificationCategoryItem = styled('div', {
  paddingBottom: 12,
  'p:nth-child(1)': {
    margin: '12px 0'
  },
  'p:nth-child(2)': {
    color: gray.gray9
  },
  'div': {
    display: 'flex',
    flexWrap: 'wrap'
  },
  'div label': {
    marginRight: 120
  }
})

export type NotificationPreferenceLoadingViewCallbackProps = QueryObserverResult<NotificationTypeCategoriesQuery>
export type NotificationPreferenceCategoriesViewCallbackProps = NotificationTypeCategoriesQuery['notificationTypeCategories']['data']
const _CLASS_IS = 'roq-' + 'notification-preference'
interface NotificationPreferenceProps extends Partial<IRoqProvider> {
  children?: (callback: NotificationPreferenceLoadingViewCallbackProps) => JSX.Element
  titleProps?: {
    children?: ReactNode
    css?: React.ComponentProps<typeof StyledNotificationPreferenceTitle>['css'],
    className?: ClassValue
  }
  categoryView?: (callback: NotificationPreferenceLoadingViewCallbackProps) => ReactElement | ReactElement[] | JSX.Element | JSX.Element[] | null
}
const NotificationPreference: React.FC<
  React.ComponentProps<typeof StyledNotificationPreference> & NotificationPreferenceProps
> = (props) => {
  const {
    children,
    titleProps,
    categoryView,
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
        Notification
      </StyledNotificationPreferenceTitle>
    )
  }, [titleProps])

  const renderCategories = useMemo(() => {
    if (categoryView) {
      return categoryView(fetchResult)
    }
    return (
      categories?.map((category) => (
        <StyledNotificationCategoryItem key={category.id}
        className={clsx(_CLASS_IS + '-category-item', )}
        >
          <NotificationCategoryPreferences key={category.id} category={category} />
        </StyledNotificationCategoryItem>
      ))
    )
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
}
const NotificationCategoryPreferences: React.FC<NotificationCategoryPreferencesProps> = (props) => {
  const { category } = props
  const { checkedSwitch, handleSwitchChange } = useNotificationTypeCategory({category})

  return (
    <div >
      <div >
        <div >
          <Switch checked={checkedSwitch} onCheckedChange={(checked) => handleSwitchChange(checked, )} color="secondary" name="checkedSwitch">
            <SwitchThumb/>
          </Switch>
        </div>
        {category.notificationTypes?.data?.map((type) => (
          <NotificationTypePreferences key={type.id} type={type} />
        ))}
      </div>
    </div>
  );
};

interface NotificationTypePreferencesProps {
  type: NotificationCategoryPreferencesProps['category']['notificationTypes']['data'][0]
}
const NotificationTypePreferences: React.FC<NotificationTypePreferencesProps> = (props) => {
  const { type } = props
  const { checkedAppNotification, checkedEmailNotification, handleSwitchChange, resetSuccess } = useNotificationTypeItem({ type });

  return (
    <>
    <p>Type description: {type?.description}</p>
    <div>
    <Switch checked={checkedAppNotification} id="in-app" onCheckedChange={(checked) => handleSwitchChange(checked, 'checkedAppNotifications')}>
      <SwitchThumb />
    </Switch>
    <label htmlFor="in-app">
      In-app
    </label>
    <Switch checked={checkedEmailNotification} id="Email" onCheckedChange={(checked) => handleSwitchChange(checked, 'checkedEmailNotifications')}>
      <SwitchThumb />
    </Switch>
    <label htmlFor="Email">
      Email
    </label>
    </div>
  </>
  )
}
