import { Socket } from "socket.io-client";

export interface ChatSocket extends Socket {}

export type ChatTimestampType = Date | number | string;

export interface ChatUserInterface {
  id: string;
  avatar?: string;
  fullName: string;
  initials: string;
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
  members: ChatUserInterface[];

  lastMessage?: ChatMessageInterface;

  unreadCount?: number;
  owner?: ChatUserInterface;
  createdAt?: Date;
  messages?: ChatMessageInterface[];
}

export interface ChatUserPresenceInterface {
  id: string;
  isOnline: boolean;
}
