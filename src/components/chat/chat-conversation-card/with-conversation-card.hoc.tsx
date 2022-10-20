import React from "react";
import { withChatApi } from "../chat-provider";
import { ChatConversationCardProps } from "./chat-conversation-card";

export interface WithConversationCardPropsInterface {}

export function withConversationCard(
  Component: React.ComponentType<any>
): React.ComponentType<WithConversationCardPropsInterface> {
  return withChatApi<
    ChatConversationCardProps,
    WithConversationCardPropsInterface
  >(({ selectConversation }) => ({
    onClick: selectConversation,
  }))(Component);
}
