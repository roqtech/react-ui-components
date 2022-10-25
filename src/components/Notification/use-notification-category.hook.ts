import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useCallback, useMemo } from 'react';
import { NotificationTypeCategoriesQuery, UpsertNotificationTypeUserPreferenceMutation, useUpsertNotificationTypeUserPreferenceMutation } from 'src/lib/graphql/types';
import { useResolveProvider } from '../Provider';

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
  const client = useQueryClient()
  const { host, token } = useResolveProvider()
  const { mutate } = useUpsertNotificationTypeUserPreferenceMutation({
    endpoint: host,
    fetchParams: {
      headers: {
        'content-type': 'application/json',
        'roq-platform-authorization': token as string,
      }
    }
  }, {
    onSuccess: (data) => {
      onToggle && onToggle(data)
      client.invalidateQueries(['NotificationTypeCategories'])
    }
  });
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
        mutate(payload);
      });
    },
    [category],
  );

  return {
    checkedSwitch,
    handleSwitchChange,
  };
};
