import { useCallback, useMemo } from 'react';
import { NotificationTypeCategoriesQuery, UpsertNotificationTypeUserPreferenceMutation } from 'src/lib/graphql/types/graphql';
import { useApolloClient } from '@apollo/client';
import { useUpsertNotificationPreference } from './use-upsert-notification-preference';

export interface UseNotificationTypeCategoryInterfaceArg {
  category: NotificationTypeCategoriesQuery['notificationTypeCategories']['data'][0];
  onToggle?: (value: UpsertNotificationTypeUserPreferenceMutation) => void
}

interface UseNotificationTypeCategoryInterface {
  checkedSwitch: boolean;
  handleSwitchChange(checked: boolean): void;
}

export const useNotificationTypeCategory = ({
  category,
  onToggle
}: UseNotificationTypeCategoryInterfaceArg): UseNotificationTypeCategoryInterface => {
  const client = useApolloClient()
  const [mutate, ] = useUpsertNotificationPreference({
    onCompleted(data) {
      onToggle?.(data)
      client.refetchQueries({ include: ['NotificationTypeCategories'] })
    }
  })
  const checkedSwitch = useMemo(() => category?.notificationTypes?.data.every(
    ({ notificationTypeUserPreferences: preference, defaultUserActiveMail, defaultUserActiveWeb}) =>
      preference ? preference.data?.[0]?.mail && preference?.data?.[0]?.web : defaultUserActiveMail &&  defaultUserActiveWeb
  ), [category]);

  const handleSwitchChange = useCallback(
    (checked) => {
      category.notificationTypes?.data?.forEach((type) => {
        const preference = type?.notificationTypeUserPreferences?.data?.[0];
        const payload = {
          web: checked,
          mail: checked,
          notificationTypeId: type.id,
          id: preference?.id,
        };
        mutate({ variables: payload });
      });
    },
    [category],
  );

  return {
    checkedSwitch,
    handleSwitchChange,
  };
};
