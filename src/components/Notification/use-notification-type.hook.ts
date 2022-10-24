import { useQueryClient } from '@tanstack/react-query';
import { FormEvent, useCallback, useMemo } from 'react';
import { useUpsertNotificationTypeUserPreferenceMutation } from 'src/lib/graphql/types';
import { useResolveProvider } from '../Provider';
import { UseNotificationTypeCategoryInterfaceArg } from './use-notification-category.hook';

interface UseNotificationItemCheckedInterfaceArg  {
  type: UseNotificationTypeCategoryInterfaceArg['category']['notificationTypes']['data'][0];
}

interface UseNotificationItemCheckedInterface {
  checkedAppNotification: boolean;
  checkedEmailNotification: boolean;
  checkedSwitch: boolean;
  handleSwitchChange(checked: boolean, name: string): void;
  resetSuccess: () => void;
}

export const useNotificationTypeItem = ({
  type,
}: UseNotificationItemCheckedInterfaceArg): UseNotificationItemCheckedInterface => {
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
    onSuccess: () => {
      client.invalidateQueries(['NotificationTypeCategories'])
    }
  });

  const preference = useMemo(() => type.notificationTypeUserPreferences?.data?.[0], [type]);
  const checkedAppNotification = useMemo(
    () => (preference ? preference.web : type.defaultUserActiveWeb),
    [preference, type],
  );
  const checkedEmailNotification = useMemo(
    () => (preference ? preference.mail : type.defaultUserActiveMail),
    [preference, type],
  );
  const checkedSwitch = useMemo(
    () => checkedAppNotification && checkedEmailNotification,
    [checkedAppNotification, checkedEmailNotification],
  );

  const handleSwitchChange = useCallback(
    (checked: boolean, name: string) => {
      // const evtName = event.target.name;
      // const checked = event.target.checked;
      const payload = {
        web: checkedAppNotification,
        mail: checkedEmailNotification,
        notificationTypeId: type.id,
        id: preference?.id,
      };

      switch (name) {
        // case 'checkedSwitch': {
        //   payload.web = checked;
        //   payload.mail = checked;
        //   break;
        // }
        case 'checkedAppNotifications': {
          payload.web = checked;
          break;
        }
        case 'checkedEmailNotifications': {
          payload.mail = checked;
          break;
        }
      }
      mutate(payload)
    },
    [checkedAppNotification, checkedEmailNotification, preference, type],
  );

  const resetSuccess = () => {
    // dispatch(setUpdatePreferenceSuccessAction(false));
  };

  return {
    checkedAppNotification,
    checkedEmailNotification,
    checkedSwitch,
    handleSwitchChange,
    // success,
    resetSuccess,
  };
};
