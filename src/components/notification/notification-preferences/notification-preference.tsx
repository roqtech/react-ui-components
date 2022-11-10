import React, { ComponentType, ReactElement, ReactNode, useMemo } from 'react'
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
import { useRoqTranslation } from 'src/components/core/roq-provider'
import { TransformErrorInterface, transformApolloError } from 'src/utils'
import './notification-preference.scss'

export type NotificationPreferenceLoadingViewCallbackProps =
  QueryResult<NotificationTypeCategoriesQuery, NotificationTypeCategoriesQueryVariables>
export type NotificationPreferenceCategoriesViewCallbackProps =
  NotificationTypeCategoriesQuery['notificationTypeCategories']['data']
export type NotificationPreferenceCategoryTypeViewCallbackProps = NotificationTypeCategoriesQuery['notificationTypeCategories']['data']['0']['notificationTypes']['data']['0']
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
  onToggle?: NotificationCategoryPreferencesProps['onToggle'],
  components?: {
    Container?: ComponentType<any>;
    Title?: ComponentType<any>;
    CategoryContainer?: ComponentType<any>;
  },
  loadingView?: (callback: NotificationPreferenceLoadingViewCallbackProps) => JSX.Element | ReactElement | null
  typeView?: (callback: NotificationPreferenceCategoryTypeViewCallbackProps) => JSX.Element | ReactElement | null
  onFetchPreferencesSuccess?: (data: NotificationTypeCategoriesQuery) => void
  onFetchPreferencesError?: (error: TransformErrorInterface) => void
}
const NotificationPreference: React.FC<NotificationPreferenceProps> = (props) => {
  const {
    children,
    titleProps,
    categoryView,
    categoryItemProps,
    onToggle,
    loadingView,
    components,
    onFetchPreferencesSuccess,
    onFetchPreferencesError,
    typeView,
    ...rest
  } = props
  const fetchResult = useNotificationsCategories({
    onCompleted(data) {
      onFetchPreferencesSuccess?.(data)
    },
    onError(error) {
      onFetchPreferencesError?.(transformApolloError(error))
    },
  })
  if (children) {
    return children(fetchResult)
  }

  const { t } = useRoqTranslation()
  const { loading, data } = fetchResult
  const categories = useMemo(() => data?.notificationTypeCategories?.data || [], [data])

  const renderTitle = useMemo(() => {
    if (titleProps?.children) {
      return titleProps.children
    }
    const Title = components?.Title ?? 'h5'
    return (
      <Title className={clsx(_CLASS_IS + '-title', titleProps?.className)}>
        {t('common.Notification-preference')}
      </Title>
    )
  }, [titleProps, components])

  const renderCategories = useMemo(() => {
    if (categoryView) {
      return categoryView(fetchResult)
    }
    const CategoryContainer = components?.CategoryContainer ?? 'div'
    return categories?.map((category) => (
      <CategoryContainer
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
          typeView={typeView}
        />
      </CategoryContainer>
    ))
  }, [categories, components])


  const Container = components?.Container ?? 'div'
  const renderLoading = useMemo(() => {
    if (loadingView) {
      return loadingView(fetchResult)
    }
    return <div>{loading && !data && t('common.loading')}</div>
  }, [loadingView, data, loading])

  return (
    <Container
      {...rest}
      className={clsx(_CLASS_IS, rest?.className)}
    >
      {renderTitle}
      {renderLoading}
      {renderCategories}
    </Container>
  )
}

export { NotificationPreference, NotificationPreferenceProps }

interface NotificationCategoryPreferencesProps {
  category: NotificationTypeCategoriesQuery['notificationTypeCategories']['data'][0]
  onToggle?: UseNotificationTypeCategoryInterfaceArg['onToggle']
  typeView?: NotificationPreferenceProps['typeView']
}
const NotificationCategoryPreferences: React.FC<NotificationCategoryPreferencesProps> =
  (props) => {
    const { category, onToggle, typeView } = props
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
        {category.notificationTypes?.data?.map((type) => {
          if (typeView) {
            return typeView(type)
          }
          return (
            <NotificationTypePreferences
              key={type.id}
              type={type}
              onToggle={onToggle}
            />
          )
        })}
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
    const { t } = useRoqTranslation()

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
            <label htmlFor={`in-app-${type.key}`}>{t('notification.channel-in-app')}</label>
          </div>
          <div className={clsx(_CLASS_IS + '-category-item-type-item-channel')}>
            <input
              type='checkbox'
              id={`email-${type.key}`}
              name='checkedEmailNotifications'
              checked={checkedEmailNotification}
              onChange={handleSwitchChange}
            />
            <label htmlFor={`email-${type.key}`}>{t('notification.channel-email')}</label>
          </div>
        </div>
      </div>
    )
  }
