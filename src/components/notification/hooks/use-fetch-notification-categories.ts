import { BaseQueryOptions, QueryFunctionOptions, useQuery } from "@apollo/client";
import { QueryNotificationTypeCategories } from "src/lib/graphql/notification/query";
import { NotificationTypeCategoriesQuery, NotificationTypeCategoriesQueryVariables } from "src/lib/graphql/types/graphql";

export function useNotificationsCategories(
  opts?: BaseQueryOptions<NotificationTypeCategoriesQuery> & QueryFunctionOptions<NotificationTypeCategoriesQuery, NotificationTypeCategoriesQueryVariables>
) {
  return useQuery<NotificationTypeCategoriesQuery, NotificationTypeCategoriesQueryVariables>(QueryNotificationTypeCategories, {
    context: { service: 'platform' },
    ...opts,
  })
}