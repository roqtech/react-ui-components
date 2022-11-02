import { useQuery } from "@apollo/client";
import { QueryNotificationTypeCategories } from "src/lib/graphql/query";
import { NotificationTypeCategoriesQuery, NotificationTypeCategoriesQueryVariables } from "src/lib/graphql/types/graphql";

export function useNotificationsCategories() {
  return useQuery<NotificationTypeCategoriesQuery, NotificationTypeCategoriesQueryVariables>(QueryNotificationTypeCategories, {
    context: { service: 'platform' },
  })
}