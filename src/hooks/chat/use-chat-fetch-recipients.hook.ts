import { useChatApi, useChatState } from "src/components";
import {
  ChatApiContextInterface,
  INITIAL_RECIPIENTS_STATE,
} from "src/components/chat/chat-provider/chat-provider";
import { ChatRecipientListInterface } from "src/interfaces";

export interface UseChatFetchRecipientsHookInterface
  extends Pick<ChatApiContextInterface, "fetchRecipientList">,
    Omit<ChatRecipientListInterface, "selectedIds"> {}

export const useChatFetchRecipients =
  (): UseChatFetchRecipientsHookInterface => {
    const api = useChatApi();
    const state = useChatState();

    const { fetchRecipientList } = api;
    const {
      recipients: {
        error,
        isLoading,
        hasMore,
        offset,
        limit,
        totalCount,
        loadedTotal,
        data,
        filter,
      } = INITIAL_RECIPIENTS_STATE,
    } = state;

    return {
      fetchRecipientList,
      error,
      isLoading,
      hasMore,
      offset,
      limit,
      totalCount,
      loadedTotal,
      data,
      filter,
    };
  };
