import { useCallback, useMemo } from 'react';
import { NotificationTypeCategoriesQuery, UpsertNotificationTypeUserPreferenceMutation } from 'src/lib/graphql/types/graphql';
import { useMutation } from '@apollo/client';
import { UpsertNotificationTypeUserPreference } from 'src/lib/graphql/query';

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
  const [mutate, ] = useMutation(UpsertNotificationTypeUserPreference, {
    context: { service: 'platform' },
    onCompleted(data) {
      onToggle?.(data)
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
