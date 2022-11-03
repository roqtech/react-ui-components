import { Socket } from "socket.io-client";
import { InfiniteListInterface, PaginationInterface } from "src/interfaces";

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
  body: string;
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

  isFirstInUserGroup?: boolean;
  isFirstInTimeGroup?: boolean;
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

export enum ChatSocketRequestMessageEnum {
  USER_CONNECTED = "userConnected",
  USER_LIST = "userList",
  CONVERSATION_LIST = "conversationList",
  CONVERSATION_DETAILS = "conversationDetails",
  CREATE_CONVERSATION = "createConversation",
  MESSAGE_LIST = "messageList",
  SEND_MESSAGE = "sendMessage",
  MARK_AS_READ_UNREAD_MESSAGES = "markAsReadUnreadMessages",
  EDIT_MESSAGE = "editMessage",
  DELETE_MESSAGE = "deleteMessage",
  UPDATE_CONVERSATION_MEMBERS = "updateConversationMembers",
  LEAVE_CONVERSATION = "leaveConversation",
  RENAME_CONVERSATION = "renameConversation",
  ARCHIVE_CONVERSATION = "archiveConversation",
}

export enum ChatSocketResponseMessageEnum {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  CONNECT_ERROR = "connect_error",
  CONVERSATION_CREATED = "conversationCreated",
  CONVERSATION_MEMBERS_CHANGED = "conversationMembersChanged",
  CONVERSATION_TITLE_CHANGED = "conversationTitleChanged",
  CONVERSATION_EXISTS = "conversationExists",
  CONVERSATION_ARCHIVED = "conversationArchived",
  MESSAGE_RECEIVED = "messageReceived",
  MESSAGE_UPDATED = "messageUpdated",
  MESSAGE_DELETED = "messageDeleted",
  MESSAGES_READ = "messagesRead",
  MEMBER_QUIT_CONVERSATION = "memberQuitConversation",
  USER_ONLINE = "userOnline",
  USER_OFFLINE = "userOffline",
  EXCEPTION = "exception",
}

export interface ChatConversationCreatedResponsePayloadInterface
  extends ChatConversationSchemaInterface {}

export interface ChatConversationMembersChangedResponsePayloadInterface {
  conversationId: string;
  memberIds: string[];
  members: ChatUserInterface[];
}

export interface ChatConversationTitleChangedResponsePayloadInterface {
  conversationId: string;
  title: string;
}

export interface ChatConversationExistsResponsePayloadInterface {
  id: string;
  conversation: ChatConversationSchemaInterface;
}

export interface ChatConverstionArchivedResponsePayloadInterface {
  conversationId: string;
}

export interface ChatMessageRecieivedResponsePayloadInterface
  extends ChatMessageSchemaInterface {
  body: string;
}

export interface ChatMessageUpdatedResponsePayloadInterface
  extends ChatMessageSchemaInterface {
  body: string;
}

export interface ChatMessageDeletedResponsePayloadInterface {
  id: string;
  conversationId: string;
  deletedAt: Date;
  body: string;
}

export interface ChatMessagesReadResponsePayloadInterface {
  messageIds: string[];
  conversationId: string;
  memberId: string;
}

export interface ChatMemberQuitConversationResponsePayloadInterface {
  conversationId: string;
  memberIds: string[];
}

export interface ChatUserOnlineResponsePayloadInterface {
  id: string;
  isOnline: boolean;
}

export interface ChatUserOfflineResponsePayloadInterface {
  id: string;
  isOnline: boolean;
}

export interface ChatUserConnectedRequestPayload {
  userId: string;
}

export interface ChatUserConnectedResponsePayload {
  unreadCount: number;
}

export interface ChatArchiveConversationRequestPayloadInterface {
  conversationId: string;
}

export interface ChatUserListRequestPayloadInterface {
  userId: string;
}

export interface ChatUserListResponsePayloadInterface {
  users: ChatUserPresenceInterface[];
}

export interface ChatCreateConversationRequestPayloadInterface {
  title: string;
  memberIds: string[];
  firstMessage?: string;
  mentionedIds?: string[];
}

export interface ChatConversationListRequestPayloadInterface {
  limit: number;
  offset: number;
  filter: string;
  includeArchived?: boolean;
}

export interface ChatConversationListResponsePayloadInterface {
  data: ChatConversationSchemaInterface[];
  totalCount: number;
}

export interface ChatConversationDetailsRequestPayloadInterface {
  conversationId: string;
}

export interface ChatConversationDetailsResponsePayloadInterface {
  conversation: ChatConversationSchemaInterface;
}

export interface ChatSendMessageRequestPayloadInterface {
  conversationId: string;
  body: string;
  mentionedIds?: string[];
}

export interface ChatRenameConversationRequestPayloadInterface {
  conversationId: string;
  title: string;
}

export interface ChatLeaveConversationRequestPayloadInterface {
  conversationId: string;
}

export interface ChatMessageDeleteRequestPayloadInterface {
  id: string;
}

export interface ChatMessageEditRequestPayloadInterface
  extends Omit<ChatSendMessageRequestPayloadInterface, "conversationId"> {
  id: string;
}

export interface ChatUpdateConversationMembersRequestPayloadInterface {
  conversationId: string;
  memberIds: string[];
}

export interface ChatMarkAsReadUnreadMessagesRequestPayloadInterface {
  conversationId: string;
  lastTimestamp: Date;
}

export interface ChatFetchMessagesRequestPayloadInterface
  extends PaginationInterface {
  conversationId: string;
  reset?: string;
}

export interface ChatFetchMoreMessagesResponsePayloadInterface {
  data: ChatMessageSchemaInterface[];
  totalCount: number;
}
