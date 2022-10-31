import { Socket } from "socket.io-client";
import { InfiniteListInterface, PaginationInterface } from "src/types";

export interface ChatSocket extends Socket {}

export type ChatTimestampType = Date | number | string;

export interface ChatUserInterface {
  id: string;
  roqIdentifier: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  fullName?: string;
  initials?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessageInterface {
  id: string;
  message: string;
  timestamp: ChatTimestampType;
  user: ChatUserInterface;
  conversationId: string;

  authorId?: string;
  isSent?: boolean;

  readBy?: string[];
  author?: ChatUserInterface;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  bodyUpdatedAt?: Date;
}

export interface ChatConversationInterface {
  id: string;
  title: string;
  timestamp: ChatTimestampType;
  message: string;

  memberIds: string[];
  members: ChatUserInterface[];

  lastMessage?: ChatMessageInterface;

  unreadCount?: number;

  ownerId: string;
  owner?: ChatUserInterface;

  createdAt?: Date;
  messages?: ChatMessageInterface[];

  isOwner?: boolean;
}

export interface ChatUserPresenceInterface {
  id: string;
  isOnline: boolean;
}

export interface ChatFetchRecipientsVariablesInterface
  extends PaginationInterface {
  filter?: string;
  ids?: string[];
  excludeIds?: string[];
  includeIds?: string[];
}

export interface ChatFetchRecipientsResponseInterface {
  data: ChatUserInterface[];
  totalCount: number;
}

export interface ChatConversationListInterface
  extends InfiniteListInterface<ChatConversationInterface> {
  editableId: string | null;
}

export interface ChatMessageListInterface
  extends InfiniteListInterface<ChatMessageInterface> {
  editableId: string | null;
}

export interface ChatRecipientListInterface
  extends InfiniteListInterface<ChatUserInterface> {
  selectedIds: string[];
}

export interface ChatUserPresenceListInterface
  extends InfiniteListInterface<ChatUserPresenceInterface> {}
