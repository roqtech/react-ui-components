import {
  ChatConversationSchemaInterface,
  ChatMessageSchemaInterface,
  ChatUserInterface,
  ChatUserPresenceInterface,
  PaginationInterface,
} from "src/types";
import { SocketClientInterface } from "./socket-client.util";

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

type ChatSocketRequestPayload =
  | ChatArchiveConversationRequestPayloadInterface
  | ChatUserListRequestPayloadInterface
  | ChatCreateConversationRequestPayloadInterface
  | ChatConversationListRequestPayloadInterface
  | ChatConversationDetailsRequestPayloadInterface
  | ChatSendMessageRequestPayloadInterface
  | ChatRenameConversationRequestPayloadInterface
  | ChatLeaveConversationRequestPayloadInterface
  | ChatMessageDeleteRequestPayloadInterface
  | ChatUpdateConversationMembersRequestPayloadInterface
  | ChatMarkAsReadUnreadMessagesRequestPayloadInterface;

type ChatSocketResponsePayload =
  | ChatConversationCreatedResponsePayloadInterface
  | ChatConversationMembersChangedResponsePayloadInterface
  | ChatConversationTitleChangedResponsePayloadInterface
  | ChatConversationExistsResponsePayloadInterface
  | ChatConverstionArchivedResponsePayloadInterface
  | ChatMessageRecieivedResponsePayloadInterface
  | ChatMessageUpdatedResponsePayloadInterface
  | ChatMessageDeletedResponsePayloadInterface
  | ChatMessagesReadResponsePayloadInterface
  | ChatMemberQuitConversationResponsePayloadInterface
  | ChatUserOnlineResponsePayloadInterface
  | ChatUserOfflineResponsePayloadInterface
  | ChatUserListResponsePayloadInterface
  | ChatConversationDetailsResponsePayloadInterface
  | ChatFetchMoreMessagesResponsePayloadInterface
  | ChatConversationListResponsePayloadInterface
  | ChatUserConnectedResponsePayload;

type SocketResponeHanlder<T = ChatSocketResponsePayload | Error> = (
  payload?: T | Error
) => void;

export interface ChatSocketInterface {
  getId: () => string | null;
  setPlatformToken: (platformToken: string) => void;
  isConnected: () => boolean;
  connect: () => void;
  disconnect: () => void;
  onConnect: (clb: SocketResponeHanlder) => void;
  onDisconnect: (clb: SocketResponeHanlder) => void;
  onError: (clb: SocketResponeHanlder<Error>) => void;
  onServerException: (clb: SocketResponeHanlder<Error>) => void;
  offConnect: (clb: SocketResponeHanlder) => void;
  offDisconnect: (clb: SocketResponeHanlder) => void;
  offError: (clb: SocketResponeHanlder<Error>) => void;
  offServerException: (clb: SocketResponeHanlder<Error>) => void;
  onConversationCreated: (
    clb: SocketResponeHanlder<ChatConversationCreatedResponsePayloadInterface>
  ) => void;
  offConversationCreated: (
    clb: SocketResponeHanlder<ChatConversationCreatedResponsePayloadInterface>
  ) => void;
  onConversationMembersChanged: (
    clb: SocketResponeHanlder<ChatConversationMembersChangedResponsePayloadInterface>
  ) => void;
  offConversationMembersChanged: (
    clb: SocketResponeHanlder<ChatConversationMembersChangedResponsePayloadInterface>
  ) => void;
  onConversationTitleChanged: (
    clb: SocketResponeHanlder<ChatConversationTitleChangedResponsePayloadInterface>
  ) => void;
  offConversationTitleChanged: (
    clb: SocketResponeHanlder<ChatConversationTitleChangedResponsePayloadInterface>
  ) => void;
  onConversationExists: (
    clb: SocketResponeHanlder<ChatConversationExistsResponsePayloadInterface>
  ) => void;
  offConversationExists: (
    clb: SocketResponeHanlder<ChatConversationExistsResponsePayloadInterface>
  ) => void;
  onConversationArchived: (
    clb: SocketResponeHanlder<ChatConverstionArchivedResponsePayloadInterface>
  ) => void;
  offConversationArchived: (
    clb: SocketResponeHanlder<ChatConverstionArchivedResponsePayloadInterface>
  ) => void;
  onMessageRecieived: (
    clb: SocketResponeHanlder<ChatMessageRecieivedResponsePayloadInterface>
  ) => void;
  offMessageRecieived: (
    clb: SocketResponeHanlder<ChatMessageRecieivedResponsePayloadInterface>
  ) => void;
  onMessageUpdated: (
    clb: SocketResponeHanlder<ChatMessageUpdatedResponsePayloadInterface>
  ) => void;
  offMessageUpdated: (
    clb: SocketResponeHanlder<ChatMessageUpdatedResponsePayloadInterface>
  ) => void;
  onMessageDeleted: (
    clb: SocketResponeHanlder<ChatMessageDeletedResponsePayloadInterface>
  ) => void;
  offMessageDeleted: (
    clb: SocketResponeHanlder<ChatMessageDeletedResponsePayloadInterface>
  ) => void;
  onMessagesRead: (
    clb: SocketResponeHanlder<ChatMessagesReadResponsePayloadInterface>
  ) => void;
  offMessagesRead: (
    clb: SocketResponeHanlder<ChatMessagesReadResponsePayloadInterface>
  ) => void;
  onMemberQuitConversation: (
    clb: SocketResponeHanlder<ChatMemberQuitConversationResponsePayloadInterface>
  ) => void;
  offMemberQuitConversation: (
    clb: SocketResponeHanlder<ChatMemberQuitConversationResponsePayloadInterface>
  ) => void;
  onUserOnline: (
    clb: SocketResponeHanlder<ChatUserOnlineResponsePayloadInterface>
  ) => void;
  offUserOnline: (
    clb: SocketResponeHanlder<ChatUserOnlineResponsePayloadInterface>
  ) => void;
  onUserOffline: (
    clb: SocketResponeHanlder<ChatUserOfflineResponsePayloadInterface>
  ) => void;
  offUserOffline: (
    clb: SocketResponeHanlder<ChatUserOfflineResponsePayloadInterface>
  ) => void;
  authorize: (
    payload: ChatUserConnectedRequestPayload,
    clb?: SocketResponeHanlder<ChatUserConnectedResponsePayload>
  ) => void;
  userList: (
    payload: ChatUserListRequestPayloadInterface,
    clb?: SocketResponeHanlder<ChatUserListResponsePayloadInterface>
  ) => void;
  createConversation: (
    payload: ChatCreateConversationRequestPayloadInterface
  ) => void;
  conversationList: (
    payload: ChatConversationListRequestPayloadInterface,
    clb?: SocketResponeHanlder<ChatConversationListResponsePayloadInterface>
  ) => void;
  conversationDetails: (
    conversationId: string,
    clb?: SocketResponeHanlder<ChatConversationDetailsResponsePayloadInterface>
  ) => void;
  archiveConversation: (conversationId: string) => void;
  renameConversation: (
    payload: ChatRenameConversationRequestPayloadInterface
  ) => void;
  leaveConversation: (conversationId: string) => void;
  updateConversationMembers: (
    payload: ChatUpdateConversationMembersRequestPayloadInterface
  ) => void;
  messageList: (
    payload: ChatFetchMessagesRequestPayloadInterface,
    clb?: SocketResponeHanlder<ChatFetchMoreMessagesResponsePayloadInterface>
  ) => void;
  markAsReadUnreadMessages: (
    payload: ChatMarkAsReadUnreadMessagesRequestPayloadInterface
  ) => void;
  sendMessage: (payload: ChatSendMessageRequestPayloadInterface) => void;
  editMessage: (payload: ChatMessageEditRequestPayloadInterface) => void;
  deleteMessage: (messageId: string) => void;
}

export class ChatSocket implements ChatSocketInterface {
  socket: SocketClientInterface;

  constructor(socket: SocketClientInterface) {
    this.socket = socket;
  }

  listen(event: ChatSocketResponseMessageEnum, clb?: any) {
    this.socket.on(event, clb as () => {});
  }

  removeListener(
    event: ChatSocketResponseMessageEnum,
    clb?: SocketResponeHanlder
  ) {
    this.socket.off(event, clb as () => {});
  }

  request(
    requestType: ChatSocketRequestMessageEnum,
    payload: ChatSocketRequestPayload,
    clb?: SocketResponeHanlder
  ) {
    if (clb) {
      return this.socket.emit(requestType, payload, clb);
    }

    return this.socket.emit(requestType, payload);
  }

  getId() {
    return this.socket?.id;
  }

  connect(): void {
    this.socket?.connect();
  }

  disconnect(): void {
    this.socket?.disconnect();
  }

  isConnected(): boolean {
    return this.socket?.connected;
  }

  setPlatformToken(platformToken: string) {
    // TODO: update socket header platform token
    // this.socket.setPlatformToken(platformToken);
  }

  onConnect(clb: SocketResponeHanlder) {
    return this.listen(ChatSocketResponseMessageEnum.CONNECT, clb);
  }

  onDisconnect(clb: SocketResponeHanlder) {
    return this.listen(ChatSocketResponseMessageEnum.DISCONNECT, clb);
  }

  onError(clb: SocketResponeHanlder<Error>) {
    return this.listen(ChatSocketResponseMessageEnum.CONNECT_ERROR, clb);
  }

  onServerException(clb: SocketResponeHanlder<Error>) {
    return this.listen(ChatSocketResponseMessageEnum.EXCEPTION, clb);
  }

  offConnect(clb: SocketResponeHanlder) {
    return this.removeListener(ChatSocketResponseMessageEnum.CONNECT, clb);
  }

  offDisconnect(clb: SocketResponeHanlder) {
    return this.removeListener(ChatSocketResponseMessageEnum.DISCONNECT, clb);
  }

  offError(clb: SocketResponeHanlder<Error>) {
    return this.removeListener(
      ChatSocketResponseMessageEnum.CONNECT_ERROR,
      clb
    );
  }

  offServerException(clb: SocketResponeHanlder<Error>) {
    return this.removeListener(ChatSocketResponseMessageEnum.EXCEPTION, clb);
  }

  onConversationCreated(
    clb: SocketResponeHanlder<ChatConversationCreatedResponsePayloadInterface>
  ) {
    return this.listen(ChatSocketResponseMessageEnum.CONVERSATION_CREATED, clb);
  }

  offConversationCreated(
    clb: SocketResponeHanlder<ChatConversationCreatedResponsePayloadInterface>
  ) {
    return this.removeListener(
      ChatSocketResponseMessageEnum.CONVERSATION_CREATED,
      clb
    );
  }

  onConversationMembersChanged(
    clb: SocketResponeHanlder<ChatConversationMembersChangedResponsePayloadInterface>
  ) {
    return this.listen(
      ChatSocketResponseMessageEnum.CONVERSATION_MEMBERS_CHANGED,
      clb
    );
  }

  offConversationMembersChanged(
    clb: SocketResponeHanlder<ChatConversationMembersChangedResponsePayloadInterface>
  ) {
    return this.removeListener(
      ChatSocketResponseMessageEnum.CONVERSATION_MEMBERS_CHANGED,
      clb
    );
  }

  onConversationTitleChanged(
    clb: SocketResponeHanlder<ChatConversationTitleChangedResponsePayloadInterface>
  ) {
    return this.listen(
      ChatSocketResponseMessageEnum.CONVERSATION_TITLE_CHANGED,
      clb
    );
  }

  offConversationTitleChanged(
    clb: SocketResponeHanlder<ChatConversationTitleChangedResponsePayloadInterface>
  ) {
    return this.removeListener(
      ChatSocketResponseMessageEnum.CONVERSATION_TITLE_CHANGED,
      clb
    );
  }

  onConversationExists(
    clb: SocketResponeHanlder<ChatConversationExistsResponsePayloadInterface>
  ) {
    return this.listen(ChatSocketResponseMessageEnum.CONVERSATION_EXISTS, clb);
  }

  offConversationExists(
    clb: SocketResponeHanlder<ChatConversationExistsResponsePayloadInterface>
  ) {
    return this.removeListener(
      ChatSocketResponseMessageEnum.CONVERSATION_EXISTS,
      clb
    );
  }

  onConversationArchived(
    clb: SocketResponeHanlder<ChatConverstionArchivedResponsePayloadInterface>
  ) {
    return this.listen(
      ChatSocketResponseMessageEnum.CONVERSATION_ARCHIVED,
      clb
    );
  }

  offConversationArchived(
    clb: SocketResponeHanlder<ChatConverstionArchivedResponsePayloadInterface>
  ) {
    return this.removeListener(
      ChatSocketResponseMessageEnum.CONVERSATION_ARCHIVED,
      clb
    );
  }

  onMessageRecieived(
    clb: SocketResponeHanlder<ChatMessageRecieivedResponsePayloadInterface>
  ) {
    return this.listen(ChatSocketResponseMessageEnum.MESSAGE_RECEIVED, clb);
  }

  offMessageRecieived(
    clb: SocketResponeHanlder<ChatMessageRecieivedResponsePayloadInterface>
  ) {
    return this.removeListener(
      ChatSocketResponseMessageEnum.MESSAGE_RECEIVED,
      clb
    );
  }

  onMessageUpdated(
    clb: SocketResponeHanlder<ChatMessageUpdatedResponsePayloadInterface>
  ) {
    return this.listen(ChatSocketResponseMessageEnum.MESSAGE_UPDATED, clb);
  }

  offMessageUpdated(
    clb: SocketResponeHanlder<ChatMessageUpdatedResponsePayloadInterface>
  ) {
    return this.removeListener(
      ChatSocketResponseMessageEnum.MESSAGE_UPDATED,
      clb
    );
  }

  onMessageDeleted(
    clb: SocketResponeHanlder<ChatMessageDeletedResponsePayloadInterface>
  ) {
    return this.listen(ChatSocketResponseMessageEnum.MESSAGE_DELETED, clb);
  }

  offMessageDeleted(
    clb: SocketResponeHanlder<ChatMessageDeletedResponsePayloadInterface>
  ) {
    return this.removeListener(
      ChatSocketResponseMessageEnum.MESSAGE_DELETED,
      clb
    );
  }

  onMessagesRead(
    clb: SocketResponeHanlder<ChatMessagesReadResponsePayloadInterface>
  ) {
    return this.listen(ChatSocketResponseMessageEnum.MESSAGES_READ, clb);
  }

  offMessagesRead(
    clb: SocketResponeHanlder<ChatMessagesReadResponsePayloadInterface>
  ) {
    return this.removeListener(
      ChatSocketResponseMessageEnum.MESSAGES_READ,
      clb
    );
  }

  onMemberQuitConversation(
    clb: SocketResponeHanlder<ChatMemberQuitConversationResponsePayloadInterface>
  ) {
    return this.listen(
      ChatSocketResponseMessageEnum.MEMBER_QUIT_CONVERSATION,
      clb
    );
  }

  offMemberQuitConversation(
    clb: SocketResponeHanlder<ChatMemberQuitConversationResponsePayloadInterface>
  ) {
    return this.removeListener(
      ChatSocketResponseMessageEnum.MEMBER_QUIT_CONVERSATION,
      clb
    );
  }

  onUserOnline(
    clb: SocketResponeHanlder<ChatUserOnlineResponsePayloadInterface>
  ) {
    return this.listen(ChatSocketResponseMessageEnum.USER_ONLINE, clb);
  }

  offUserOnline(
    clb: SocketResponeHanlder<ChatUserOnlineResponsePayloadInterface>
  ) {
    return this.removeListener(ChatSocketResponseMessageEnum.USER_ONLINE, clb);
  }

  onUserOffline(
    clb: SocketResponeHanlder<ChatUserOfflineResponsePayloadInterface>
  ) {
    return this.listen(ChatSocketResponseMessageEnum.USER_OFFLINE, clb);
  }

  offUserOffline(
    clb: SocketResponeHanlder<ChatUserOfflineResponsePayloadInterface>
  ) {
    return this.removeListener(ChatSocketResponseMessageEnum.USER_OFFLINE, clb);
  }

  authorize(
    payload: ChatUserConnectedRequestPayload,
    clb?: SocketResponeHanlder<ChatUserConnectedResponsePayload>
  ) {
    this.request(ChatSocketRequestMessageEnum.USER_CONNECTED, payload, clb);
  }

  userList(
    payload: ChatUserListRequestPayloadInterface,
    clb?: SocketResponeHanlder<ChatUserListResponsePayloadInterface>
  ) {
    this.request(ChatSocketRequestMessageEnum.USER_LIST, payload, clb);
  }

  createConversation(payload: ChatCreateConversationRequestPayloadInterface) {
    this.request(ChatSocketRequestMessageEnum.CREATE_CONVERSATION, payload);
  }

  conversationList(
    payload: ChatConversationListRequestPayloadInterface,
    clb?: SocketResponeHanlder<ChatConversationListResponsePayloadInterface>
  ) {
    this.request(ChatSocketRequestMessageEnum.CONVERSATION_LIST, payload, clb);
  }

  conversationDetails(
    conversationId: string,
    clb?: SocketResponeHanlder<ChatConversationDetailsResponsePayloadInterface>
  ) {
    const payload: ChatConversationDetailsRequestPayloadInterface = {
      conversationId,
    };
    this.request(
      ChatSocketRequestMessageEnum.CONVERSATION_DETAILS,
      payload,
      clb
    );
  }

  archiveConversation(conversationId: string) {
    const payload: ChatArchiveConversationRequestPayloadInterface = {
      conversationId,
    };
    this.request(ChatSocketRequestMessageEnum.ARCHIVE_CONVERSATION, payload);
  }

  renameConversation(payload: ChatRenameConversationRequestPayloadInterface) {
    this.request(ChatSocketRequestMessageEnum.RENAME_CONVERSATION, payload);
  }

  leaveConversation(conversationId: string) {
    const payload: ChatLeaveConversationRequestPayloadInterface = {
      conversationId,
    };
    this.request(ChatSocketRequestMessageEnum.LEAVE_CONVERSATION, payload);
  }

  updateConversationMembers(
    payload: ChatUpdateConversationMembersRequestPayloadInterface
  ) {
    this.request(
      ChatSocketRequestMessageEnum.UPDATE_CONVERSATION_MEMBERS,
      payload
    );
  }

  messageList(
    payload: ChatFetchMessagesRequestPayloadInterface,
    clb?: SocketResponeHanlder<ChatFetchMoreMessagesResponsePayloadInterface>
  ) {
    this.request(ChatSocketRequestMessageEnum.MESSAGE_LIST, payload, clb);
  }

  markAsReadUnreadMessages(
    payload: ChatMarkAsReadUnreadMessagesRequestPayloadInterface
  ) {
    this.request(
      ChatSocketRequestMessageEnum.MARK_AS_READ_UNREAD_MESSAGES,
      payload
    );
  }

  sendMessage(payload: ChatSendMessageRequestPayloadInterface) {
    this.request(ChatSocketRequestMessageEnum.SEND_MESSAGE, payload);
  }

  editMessage(payload: ChatMessageEditRequestPayloadInterface) {
    this.request(ChatSocketRequestMessageEnum.EDIT_MESSAGE, payload);
  }

  deleteMessage(messageId: string) {
    const paylaod: ChatMessageDeleteRequestPayloadInterface = { id: messageId };
    this.request(ChatSocketRequestMessageEnum.DELETE_MESSAGE, paylaod);
  }
}
