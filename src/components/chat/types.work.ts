export enum MessageCenterScreenEnum {
  CONVERSATION_SELECTED = "conversation_selected",
  CONVERSATION_NOT_SELECTED = "conversation_not_selected",
  CONVERSATION_ADD_MEMBERS = "conversation_add_users",
  CONVERSATION_REMOVE_MEMBERS = "conversation_remove_users",
  CREATE_NEW = "create_new",
}

export enum MessageCenterConversationEditingTypeEnum {
  LIST = "list",
  TOPBAR = "topbar",
}

export interface MessageCenterConversationMemberInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  fullName?: string;
  initials?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageCenterMessageInterface {
  id: string;
  authorId: string;
  body: string;
  createdAt: Date;
  deletedAt: Date;
  bodyUpdatedAt: Date;
  readBy: string[];
  author: MessageCenterConversationMemberInterface;
  isAuthor: boolean;
  isUnread: boolean;
  isEditing: boolean;
  isSelected: boolean;
}

export interface MessageCenterUserGroupInterface {
  author: MessageCenterConversationMemberInterface;
  messages: MessageCenterMessageInterface[];
}

export interface MessageCenterDateGroupInterface {
  date: Date;
  groups: MessageCenterUserGroupInterface[];
}

export interface MessageCenterConversationInterface {
  id: string;
  ownerId: string;
  title?: string;
  preview: string;
  createdAt: Date;
  lastMessage?: MessageCenterMessageInterface;
  lastMessageTimestamp: Date;
  unreadCount?: number;
  memberIds?: string[];
  archived?: boolean;
  isGroup: boolean;
  isOwner: boolean;
  isNew?: boolean;
  isEditing?: boolean;
  members?: MessageCenterConversationMemberInterface[];
  owner?: MessageCenterConversationMemberInterface;
}

export interface MessageCenterUserInterface {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  initials?: string;
  avatar?: string;
  roqIdentifier?: string;
}

export interface MessageCenterUserPresenceInterface {
  id: string;
  isOnline: boolean;
}
