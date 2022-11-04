import React, { ReactElement, ReactNode, useMemo } from 'react'
import _get from 'lodash/get'
import clsx from 'clsx'
import { Switch } from 'src/components/common'
import {
  UseNotificationItemCheckedInterfaceArg,
  useNotificationTypeItem,
  useNotificationTypeCategory,
  UseNotificationTypeCategoryInterfaceArg,
  useNotificationsCategories,
} from 'src/components/notification/hooks'
import type { ClassValue } from 'clsx'
import { QueryResult } from '@apollo/client'
import { NotificationTypeCategoriesQuery, NotificationTypeCategoriesQueryVariables } from 'src/lib/graphql/types/graphql'
import './notification-preference.scss'

export type NotificationPreferenceLoadingViewCallbackProps =
  QueryResult<NotificationTypeCategoriesQuery, NotificationTypeCategoriesQueryVariables>
export type NotificationPreferenceCategoriesViewCallbackProps =
  NotificationTypeCategoriesQuery['notificationTypeCategories']['data']
const _CLASS_IS = 'roq-' + 'notification-preference'
interface NotificationPreferenceProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
  className?: ClassValue
  children?: (
    callback: NotificationPreferenceLoadingViewCallbackProps,
  ) => JSX.Element
  titleProps?: {
    children?: ReactNode
    className?: ClassValue
  }
  categoryView?: (
    callback: NotificationPreferenceLoadingViewCallbackProps,
  ) => ReactElement | ReactElement[] | JSX.Element | JSX.Element[] | null
  categoryItemProps?: {
    className?: ClassValue
  }
  onToggle?: NotificationCategoryPreferencesProps['onToggle']
}
const NotificationPreference: React.FC<NotificationPreferenceProps> = (props) => {
  const {
    children,
    titleProps,
    categoryView,
    categoryItemProps,
    onToggle,
    ...rest
  } = props
  const fetchResult = useNotificationsCategories()
  if (children) {
    return children(fetchResult)
  }

  const { data, error, refetch } = fetchResult
  const categories = useMemo(() => data?.notificationTypeCategories?.data || [], [data])

  const renderTitle = useMemo(() => {
    if (titleProps?.children) {
      return titleProps.children
    }
    return (
      <h5 className={clsx(_CLASS_IS + '-title', titleProps?.className)}>
        Notification preference
      </h5>
    )
  }, [titleProps])

  const renderCategories = useMemo(() => {
    if (categoryView) {
      return categoryView(fetchResult)
    }
    return categories?.map((category) => (
      <div
        key={category.id}
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
      </div>
    ))
  }, [categories])

  return (
    <div
      {...rest}
      className={clsx(_CLASS_IS, rest?.className)}
    >
      {renderTitle}
      {renderCategories}
    </div>
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
            name='checkedSwitch'
          />
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
        <p className={clsx(_CLASS_IS + '-category-item-type-description')}>{type?.description}</p>
        <div className={clsx(_CLASS_IS + '-category-item-type-item')}>
          <div className={clsx(_CLASS_IS + '-category-item-type-item-channel')}>
            <input
              type='checkbox'
              id={`in-app-${type.key}`}
              name='checkedAppNotifications'
              checked={checkedAppNotification}
              onChange={handleSwitchChange}
            />
            <label htmlFor={`in-app-${type.key}`}>In-app</label>
          </div>
          <div className={clsx(_CLASS_IS + '-category-item-type-item-channel')}>
            <input
              type='checkbox'
              id={`email-${type.key}`}
              name='checkedEmailNotifications'
              checked={checkedEmailNotification}
              onChange={handleSwitchChange}
            />
            <label htmlFor={`email-${type.key}`}>Email</label>
          </div>
        </div>
      </div>
    )
  }
