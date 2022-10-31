import { ChangeEvent, useCallback, useMemo } from 'react';
import { UpsertNotificationTypeUserPreferenceMutation } from 'src/lib/graphql/types/graphql';
import { UseNotificationTypeCategoryInterfaceArg } from './use-notification-category.hook';
import { useMutation } from '@apollo/client';
import { UpsertNotificationTypeUserPreference } from 'src/lib/graphql/query';

export interface UseNotificationItemCheckedInterfaceArg  {
  type: UseNotificationTypeCategoryInterfaceArg['category']['notificationTypes']['data'][0];
  onToggle?: (value: UpsertNotificationTypeUserPreferenceMutation) => void
}

interface UseNotificationItemCheckedInterface {
  checkedAppNotification: boolean;
  checkedEmailNotification: boolean;
  checkedSwitch: boolean;
  handleSwitchChange(event: ChangeEvent<HTMLInputElement>): void;
  resetSuccess: () => void;
}

export const useNotificationTypeItem = ({
  type,
  onToggle,
}: UseNotificationItemCheckedInterfaceArg): UseNotificationItemCheckedInterface => {
  const [mutate, ] = useMutation(UpsertNotificationTypeUserPreference, {
    context: { service: 'platform' },
    onCompleted(data) {
      onToggle?.(data)
    }
  })

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
    (evt) => {
      const evtName = evt.target.name;
      const checked = evt.target.checked;
      const payload = {
        web: checkedAppNotification,
        mail: checkedEmailNotification,
        notificationTypeId: type.id,
        id: preference?.id,
      };

      switch (evtName) {
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
      mutate({ variables: payload })
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
