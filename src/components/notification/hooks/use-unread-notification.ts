import { useMutation } from "@apollo/client";
import { MarkNotificationAsUnRead } from "src/lib/graphql/query";

export function useUnReadNotification(id: string) {
  return useMutation(MarkNotificationAsUnRead, {
    variables: { id },
    context: { service: 'platform' },
  })
}