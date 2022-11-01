import { Socket } from "socket.io-client";
import { InfiniteListInterface, PaginationInterface } from "src/types";

export interface ChatSocket extends Socket {}

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
  user: ChatUserInterface;
  conversationId: string;
  readBy: string[];
  authorId: string;
  author: ChatUserInterface;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  bodyUpdatedAt?: Date;

  isSent: boolean;
  isUnread: boolean;
}

export interface ChatMessageSchemaInterface
  extends Omit<
    ChatMessageInterface,
    "createdAt" | "updatedAt" | "deletedAt" | "bodyUpdatedAt"
  > {
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  bodyUpdatedAt?: string;
}

export interface ChatConversationInterface {
  id: string;
  title: string;

  message: string;

  memberIds: string[];
  members: ChatUserInterface[];

  lastMessage?: ChatMessageInterface;
  lastMessageTimestamp: Date;

  
  ownerId: string;
  owner: ChatUserInterface;
  
  createdAt?: Date;
  messages?: ChatMessageInterface[];
  
  isOwner: boolean;
  unreadCount: number;
}

export interface ChatConversationSchemaInterface
  extends Omit<
    ChatConversationInterface,
    "createdAt" | "isOwner" | "lastMessageTimestamp" | "lastMessage"
  > {
  createdAt: string;
  lastMessageTimestamp: string;
  lastMessage?: ChatMessageSchemaInterface;
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
  lastTimestamp?: Date;
}

export interface ChatRecipientListInterface
  extends InfiniteListInterface<ChatUserInterface> {
  selectedIds: string[];
  filter: Pick<
    ChatFetchRecipientsVariablesInterface,
    "filter" | "ids" | "excludeIds" | "includeIds"
  >;
}

export interface ChatUserPresenceListInterface
  extends InfiniteListInterface<ChatUserPresenceInterface> {}
