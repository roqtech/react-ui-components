import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import _find from "lodash/find";
import _uniq from "lodash/uniq";
import _omit from "lodash/omit";
import _without from "lodash/without";
import { formatTimeAgo } from "src/utils/format-time-ago.util";
import gql from "graphql-tag";
import {
  ChatConversationCreatedResponsePayloadInterface,
  ChatConversationExistsResponsePayloadInterface,
  ChatConversationListInterface,
  ChatConversationListRequestPayloadInterface,
  ChatConversationListResponsePayloadInterface,
  ChatConversationMembersChangedResponsePayloadInterface,
  ChatConversationSchemaInterface,
  ChatConversationTitleChangedResponsePayloadInterface,
  ChatCreateConversationRequestPayloadInterface,
  ChatFetchMessagesRequestPayloadInterface,
  ChatFetchRecipientsResponseInterface,
  ChatFetchRecipientsVariablesInterface,
  ChatMarkAsReadUnreadMessagesRequestPayloadInterface,
  ChatMemberQuitConversationResponsePayloadInterface,
  ChatMessageDeletedResponsePayloadInterface,
  ChatMessageEditRequestPayloadInterface,
  ChatMessageListInterface,
  ChatMessageRecieivedResponsePayloadInterface,
  ChatMessageSchemaInterface,
  ChatMessagesReadResponsePayloadInterface,
  ChatMessageUpdatedResponsePayloadInterface,
  ChatRecipientListInterface,
  ChatRenameConversationRequestPayloadInterface,
  ChatSendMessageRequestPayloadInterface,
  ChatUpdateConversationMembersRequestPayloadInterface,
  ChatUserConnectedResponsePayload,
  ChatUserInterface,
  ChatUserPresenceListInterface,
  ChatConversationInterface,
  ChatMessageInterface,
  ComplexError,
  ChatConverstionArchivedResponsePayloadInterface,
  ChatUserOfflineResponsePayloadInterface,
  ChatUserOnlineResponsePayloadInterface,
  ChatUserPresenceInterface,
} from "src/interfaces";
import { useRoqComponents, useSocket } from "src/components";
import { useLazyPlatformQuery } from "src/hooks";
import { ChatSocket, ChatSocketInterface } from "src/utils";
import find from "lodash/find";

export interface ChatStateContextInterface {
  online: boolean;
  error?: ComplexError | null;
  clientId?: string;
  userId: string;
  unreadCount: number;
  currentConversationId: string | null;
  currentConversation?: ChatConversationInterface;
  conversations: ChatConversationListInterface;
  messages: ChatMessageListInterface;
  editableMessage: ChatMessageInterface | null;
  recipients: ChatRecipientListInterface;
  presense: ChatUserPresenceListInterface;
}

export interface ChatApiContextInterface {
  selectConversation: (conversationId: string | null) => void;
  createConversation: (
    payload: ChatCreateConversationRequestPayloadInterface
  ) => void;
  archiveConversation: (conversationId: string) => void;
  renameConversation: (title: string) => void;
  getConversationDetails: (conversationId: string) => void;
  updateConversationMembers: (memberIds: string[]) => void;
  leaveConversation: (conversationId: string) => void;
  markAsReadUnreadConversationMessages: () => void;
  sendMessage: (payload: ChatSendMessageRequestPayloadInterface) => void;
  editMessage: (
    payload: Partial<ChatMessageEditRequestPayloadInterface>
  ) => void;
  setEditableMessage: (messageId: string) => void;
  deleteMessage: (messageId: string) => void;
  fetchConversationList: (
    query: ChatConversationListRequestPayloadInterface
  ) => void;
  resetEditableConversation: () => void;
  setEditableConversation: (conversationId: string) => void;
  resetMessageList: () => void;
  fetchMessageList: (query: ChatFetchMessagesRequestPayloadInterface) => void;
  resetSelectedRecipients: () => void;
  resetRecipientList: () => void;
  setSelectedRecipients: (selectedIds: string[]) => void;
  setRecipientListFilter: (
    filter: ChatRecipientListInterface["filter"]
  ) => void;
  fetchRecipientList: (query: ChatFetchRecipientsVariablesInterface) => void;
  getUserPresence: (userId: string) => ChatUserPresenceInterface["isOnline"];
}

export const ChatStateContext =
  createContext<ChatStateContextInterface | null>(null);

export const ChatApiContext =
  createContext<ChatApiContextInterface | null>(null);

export interface ChatProviderPropsInterface {
  children?: ReactNode;

  userId: string;
  conversationId?: string;

  groupMessages?: (
    currentMessage: ChatMessageInterface,
    index: number,
    messages: ChatMessageInterface[]
  ) => ChatMessageInterface;

  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
  onServerException?: (error: Error) => void;
  onConversationCreated?: (
    payload: ChatConversationCreatedResponsePayloadInterface
  ) => void;
  onConversationMembersChanged?: (
    payload: ChatConversationMembersChangedResponsePayloadInterface
  ) => void;
  onConversationTitleChanged?: (
    payload: ChatConversationTitleChangedResponsePayloadInterface
  ) => void;
  onConversationExists?: (
    payload: ChatConversationExistsResponsePayloadInterface
  ) => void;
  onConversationArchived?: (
    payload: ChatConverstionArchivedResponsePayloadInterface
  ) => void;
  onMessageRecieived?: (
    payload: ChatMessageRecieivedResponsePayloadInterface
  ) => void;
  onMessageUpdated?: (
    payload: ChatMessageUpdatedResponsePayloadInterface
  ) => void;
  onMessageDeleted?: (
    payload: ChatMessageDeletedResponsePayloadInterface
  ) => void;
  onMessagesRead?: (payload: ChatMessagesReadResponsePayloadInterface) => void;
  onMemberQuitConversation?: (
    payload: ChatMemberQuitConversationResponsePayloadInterface
  ) => void;
  onUserConnected?: (payload: ChatUserConnectedResponsePayload) => void;
  onUserOnline?: (payload: ChatUserOnlineResponsePayloadInterface) => void;
  onUserOffline?: (payload: ChatUserOfflineResponsePayloadInterface) => void;
}

const messageSortComparer = (
  a: ChatMessageInterface,
  b: ChatMessageInterface
): number => +a.createdAt - +b.createdAt;

const conversatonSortComparer = (
  a: ChatConversationInterface,
  b: ChatConversationInterface
): number => +b.lastMessageTimestamp - +a.lastMessageTimestamp;

export const INITIAL_CONVERSATIONS_STATE: ChatConversationListInterface = {
  editableId: null,
  error: null,
  isLoading: false,
  hasMore: false,
  offset: 0,
  limit: 5,
  totalCount: 0,
  loadedTotal: 0,
  data: [],
};

export const INITIAL_MESSAGES_STATE: ChatMessageListInterface = {
  editableId: null,
  error: null,
  isLoading: false,
  hasMore: true,
  offset: 0,
  limit: 20,
  totalCount: 0,
  loadedTotal: 0,
  data: [],
  lastTimestamp: undefined,
};

export const INITIAL_RECIPIENTS_STATE: ChatRecipientListInterface = {
  selectedIds: [],
  error: null,
  isLoading: false,
  hasMore: true,
  offset: 0,
  limit: 10,
  totalCount: 0,
  loadedTotal: 0,
  data: [],
  filter: {
    filter: undefined,
    ids: undefined,
    excludeIds: undefined,
    includeIds: undefined,
  },
};

const INITIAL_PRESENCE_STATE = [];

const normalizeRecipient = (
  recipient: ChatUserInterface
): ChatUserInterface => {
  return {
    ...recipient,
    fullName: `${recipient.firstName ?? ""} ${recipient.lastName ?? ""}`.trim(),
  };
};

const markMessageAsStartOfTheUserGroup = (message: ChatMessageInterface) => {
  message.isFirstInUserGroup = true;

  return message;
};

const markMessageAsStartOfTheTimeGroup = (message: ChatMessageInterface) => {
  message.isFirstInTimeGroup = true;

  return message;
};

const defaultGroupMessages = (
  currentMessage: ChatMessageInterface,
  index: number,
  messages: ChatMessageInterface[]
): ChatMessageInterface => {
  const prevMessage = messages[index - 1];
  const nextMessage = messages[index + 1];

  if (!prevMessage) {
    currentMessage = markMessageAsStartOfTheUserGroup(currentMessage);
  }

  if (prevMessage && currentMessage.authorId !== prevMessage.authorId) {
    currentMessage = markMessageAsStartOfTheUserGroup(currentMessage);
  }

  if (nextMessage && currentMessage.authorId !== nextMessage.authorId) {
    currentMessage = markMessageAsStartOfTheTimeGroup(currentMessage);
  }

  if (
    nextMessage &&
    formatTimeAgo(nextMessage.createdAt) !==
      formatTimeAgo(currentMessage.createdAt)
  ) {
    currentMessage = markMessageAsStartOfTheTimeGroup(currentMessage);
  }

  if (
    !!currentMessage.bodyUpdatedAt &&
    currentMessage.bodyUpdatedAt !== currentMessage.updatedAt
  ) {
    currentMessage = markMessageAsStartOfTheTimeGroup(currentMessage);
  }

  currentMessage = markMessageAsStartOfTheTimeGroup(currentMessage);

  return currentMessage;
};

export const ChatProvider = (props: ChatProviderPropsInterface) => {
  const {
    children,
    userId,

    conversationId,
    groupMessages = defaultGroupMessages,

    ...callbacks
  } = props;

  const {
    onConnect,
    onDisconnect,
    onError,
    onServerException,
    onConversationCreated,
    onConversationMembersChanged,
    onConversationTitleChanged,
    onConversationExists,
    onConversationArchived,
    onMessageRecieived,
    onMessageUpdated,
    onMessageDeleted,
    onMessagesRead,
    onMemberQuitConversation,
    onUserConnected,
    onUserOnline,
    onUserOffline,
  } = callbacks;

  const { host, token, userToken } = useRoqComponents();
  const { socket: socketClient } = useSocket();

  const [socket, setSocket] = useState<ChatSocketInterface | null>(null);
  const [online, setOnline] = useState<boolean>(false);
  const [error, setError] = useState<ComplexError | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [currentConversationId, setCurrentConversationId] = useState<
    ChatConversationInterface["id"] | null
  >(conversationId ?? null);

  const [conversations, setConversations] =
    useState<ChatConversationListInterface>(INITIAL_CONVERSATIONS_STATE);

  const [messages, setMessages] = useState<ChatMessageListInterface>(
    INITIAL_MESSAGES_STATE
  );

  const [recipients, setRecipients] = useState<ChatRecipientListInterface>(
    INITIAL_RECIPIENTS_STATE
  );

  const [presence, setPresence] = useState<ChatUserPresenceListInterface>(
    INITIAL_PRESENCE_STATE
  );

  const currentConversation: ChatConversationInterface | undefined = useMemo(
    () =>
      !currentConversationId
        ? undefined
        : _find<ChatConversationInterface | undefined>(conversations.data, {
            id: `${currentConversationId}`,
          }),
    [conversations.data, currentConversationId]
  );

  const editableMessage: ChatMessageInterface | undefined = useMemo(
    () =>
      !messages?.editableId
        ? undefined
        : _find<ChatMessageInterface | undefined>(messages.data, {
            id: messages?.editableId,
          }),
    [(messages.data, messages?.editableId)]
  );

  const normalizeMessageHistory = useCallback(
    (history: ChatMessageInterface[]) => {
      return history.sort(messageSortComparer).map(groupMessages);
    },
    [groupMessages]
  );

  const normalizeMessage = useCallback(
    (messageSchema: ChatMessageSchemaInterface): ChatMessageInterface => {
      const {
        createdAt,
        authorId,
        updatedAt,
        deletedAt,
        bodyUpdatedAt,
        readBy,
        ...rest
      } = messageSchema;

      return {
        ...rest,
        readBy,
        authorId,
        createdAt: new Date(createdAt),
        deletedAt: deletedAt ? new Date(deletedAt) : undefined,
        bodyUpdatedAt: bodyUpdatedAt ? new Date(bodyUpdatedAt) : undefined,
        isSent: authorId === userId,
        isUnread: !readBy.includes(userId),
      };
    },
    [userId]
  );

  const normalizeConversation = useCallback(
    (
      conversationSchema: ChatConversationSchemaInterface
    ): ChatConversationInterface => {
      const {
        createdAt,
        ownerId,
        lastMessageTimestamp,
        lastMessage,
        isGroup,
        ...rest
      } = conversationSchema;

      return {
        ...rest,
        isGroup,
        ownerId,
        createdAt: new Date(createdAt),
        isOwner: ownerId === userId,
        lastMessageTimestamp: new Date(lastMessageTimestamp),
        lastMessage: lastMessage && normalizeMessage(lastMessage),
      };
    },
    [userId, normalizeMessage]
  );

  const normalizeConversations = useCallback(
    (conversations: ChatConversationInterface[]) =>
      conversations.sort(conversatonSortComparer),
    []
  );

  const resetMessageList = useCallback(() => {
    setMessages(INITIAL_MESSAGES_STATE);
  }, [setMessages]);

  useEffect(
    function whaitForSocketReady() {
      if (!socketClient) {
        return;
      }

      setSocket(new ChatSocket(socketClient));
    },
    [socketClient]
  );

  const handleUserConnected = useCallback(
    (payload: ChatUserConnectedResponsePayload) => {
      setOnline(true);
      setUnreadCount(payload.unreadCount);

      onUserConnected?.(payload);
    },
    [setUnreadCount, setOnline, onUserConnected]
  );

  const handleConnect = useCallback(() => {
    if (!socket) {
      return;
    }

    setError(null);
    setClientId(socket.getId());
    socket.authorize({ userId }, handleUserConnected);
    onConnect?.();
  }, [socket, userId, setClientId, setError, handleUserConnected, onConnect]);

  const handleDisconnect = useCallback(() => {
    setOnline(false);
    onDisconnect?.();
  }, [setOnline, onDisconnect]);

  const handleError = useCallback(
    (error) => {
      setError(error);
      onError?.(error);
    },
    [onError, setError]
  );

  const handleServerException = useCallback(
    (error) => {
      setError(error);
      onServerException?.(error);
    },
    [onServerException, setError]
  );

  const handleMessageReceived = useCallback(
    (response: ChatMessageRecieivedResponsePayloadInterface) => {
      const recipientConversation = _find(conversations.data, {
        id: response.conversationId,
      });

      const newMessage = normalizeMessage(response);

      if (recipientConversation) {
        const { id, unreadCount = 0 } = recipientConversation;

        const isSelectedConversationRecipient = currentConversationId === id;

        const conversationChanges = {
          lastMessage: newMessage,
          lastMessageTimestamp: newMessage.createdAt,
          unreadCount,
        };

        if (isSelectedConversationRecipient) {
          setMessages((ps) => ({
            ...ps,
            data: normalizeMessageHistory([...ps.data, newMessage]),
            totalCount: ps.totalCount + 1,
            loadedTotal: ps.loadedTotal + 1,
          }));
        }

        setMessages((ps) => ({
          ...ps,
          lastTimestamp: newMessage.createdAt,
        }));

        if (newMessage.isUnread) {
          conversationChanges.unreadCount += 1;
          state.unreadCount += 1;
        }

        setConversations((ps) => ({
          ...ps,
          data: normalizeConversations(
            ps.data.map((_conversation) =>
              _conversation.id === newMessage.conversationId
                ? { ..._conversation, ...conversationChanges }
                : _conversation
            )
          ),
        }));
      } else {
        if (newMessage.isUnread) {
          setUnreadCount((ps) => ps + 1);
        }
      }

      onMessageRecieived?.(response);
    },
    [
      currentConversationId,
      conversations,
      userId,
      setMessages,
      setConversations,
      setUnreadCount,
      normalizeMessage,
      normalizeMessageHistory,
      normalizeConversations,
      onMessageRecieived,
    ]
  );

  const handleConversationCreated = useCallback(
    (payload: ChatConversationCreatedResponsePayloadInterface) => {
      const newConversation = normalizeConversation(payload);

      if (newConversation.lastMessage) {
        newConversation.lastMessage = normalizeMessage(
          newConversation.lastMessage
        );
      }

      setConversations((ps) => {
        const nextConversations = [newConversation, ...ps.data];
        const totalCount = ps.totalCount + 1;

        return {
          ...ps,
          data: nextConversations,
          totalCount,
          loadedTotal: nextConversations.length,
          hasMore: nextConversations.length < totalCount,
        };
      });

      setCurrentConversationId(newConversation.id);

      onConversationCreated?.(payload);
    },
    [
      normalizeConversation,
      normalizeMessage,
      setCurrentConversationId,
      onConversationCreated,
    ]
  );

  const handleConversationExists = useCallback(
    (payload: ChatConversationExistsResponsePayloadInterface) => {
      const { id, conversation } = payload;

      const existConversation = _find(conversations.data, { id });
      if (existConversation) {
        setCurrentConversationId(id);
      } else {
        const newConversation = normalizeConversation(conversation);

        if (newConversation.lastMessage) {
          newConversation.lastMessage = normalizeMessage(
            newConversation.lastMessage
          );
        }

        setConversations((ps) => {
          const nextConversations = [newConversation, ...ps.data];
          const totalCount = ps.totalCount + 1;

          return {
            ...ps,
            data: nextConversations,
            totalCount,
            loadedTotal: nextConversations.length,
            hasMore: nextConversations.length < totalCount,
          };
        });
      }

      resetMessageList();

      onConversationExists?.(payload);
    },
    [
      setCurrentConversationId,
      conversations,
      setCurrentConversationId,
      normalizeConversation,
      normalizeMessage,
      resetMessageList,
      onConversationExists,
    ]
  );

  const handleConversationMembersChanged = useCallback(
    (payload: ChatConversationMembersChangedResponsePayloadInterface) => {
      const { conversationId, memberIds, members } = payload;

      const conversationChanges = {
        memberIds,
        members,
      };

      setConversations((ps) => ({
        ...ps,
        data: ps.data.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                ...conversationChanges,
              }
            : conversation
        ),
      }));

      onConversationMembersChanged?.(payload);
    },
    [setConversations, onConversationMembersChanged]
  );

  const handleConversationTitleChanged = useCallback(
    (payload: ChatConversationTitleChangedResponsePayloadInterface) => {
      const { conversationId, title } = payload;

      const conversationChanges = {
        title,
      };

      setConversations((ps) => ({
        ...ps,
        data: ps.data.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                ...conversationChanges,
              }
            : conversation
        ),
      }));

      onConversationTitleChanged?.(payload);
    },
    [setConversations, onConversationTitleChanged]
  );

  const handleConversationArchived = useCallback(
    (payload: ChatConverstionArchivedResponsePayloadInterface) => {
      const { conversationId } = payload;
      const isSelectedConversationRecipient =
        currentConversationId === conversationId;

      if (isSelectedConversationRecipient) {
        setCurrentConversationId(null);
      }

      setConversations((ps) => ({
        ...ps,
        data: ps.data.filter(
          (conversation) => conversation.id !== conversationId
        ),
        loadedTotal: ps.loadedTotal - 1,
        totalCount: ps.totalCount - 1,
      }));

      onConversationArchived?.(payload);
    },
    [
      currentConversationId,
      setConversations,
      setCurrentConversationId,
      onConversationArchived,
    ]
  );

  const handleMemberQuitConversation = useCallback(
    (payload: ChatMemberQuitConversationResponsePayloadInterface) => {
      const { conversationId } = payload;
      const isSelectedConversationRecipient =
        currentConversationId === conversationId;

      if (isSelectedConversationRecipient) {
        setCurrentConversationId(null);
      }

      setConversations((ps) => ({
        ...ps,
        data: ps.data.filter(
          (conversation) => conversation.id !== conversationId
        ),
        loadedTotal: ps.loadedTotal - 1,
        totalCount: ps.totalCount - 1,
      }));

      onMemberQuitConversation?.(payload);
    },
    [
      currentConversationId,
      setCurrentConversationId,
      setConversations,
      onMemberQuitConversation,
    ]
  );

  const handleMessageUpdated = useCallback(
    (payload: ChatMessageUpdatedResponsePayloadInterface) => {
      const { id, body, conversationId, bodyUpdatedAt } = payload;

      if (conversationId !== currentConversationId) {
        return;
      }

      const messageUpdates = { body, bodyUpdatedAt };

      setMessages((ps) => ({
        ...ps,
        data: normalizeMessageHistory(
          ps.data.map((message) =>
            message.id === id
              ? normalizeMessage({
                  ...message,
                  ...messageUpdates,
                })
              : message
          )
        ),
      }));

      onMessageUpdated?.(payload);
    },
    [currentConversationId, setMessages, normalizeMessage, onMessageUpdated]
  );

  const handleMessageDeleted = useCallback(
    (payload: ChatMessageDeletedResponsePayloadInterface) => {
      const { id, body, deletedAt, conversationId } = payload;
      if (conversationId !== currentConversationId) {
        return;
      }

      const messageUpdates = { body, deletedAt };

      setMessages((ps) => ({
        ...ps,
        data: normalizeMessageHistory(
          ps.data.map((message) =>
            message.id === id
              ? normalizeMessage({
                  ...message,
                  ...messageUpdates,
                })
              : message
          )
        ),
      }));

      onMessageDeleted?.(payload);
    },
    [currentConversationId, setMessages, normalizeMessage, onMessageDeleted]
  );

  const handleUserOnline = useCallback(
    (payload: ChatUserOnlineResponsePayloadInterface) => {
      const { id, isOnline } = payload;
      const userPresenceChanges = { isOnline };

      setPresence((data) =>
        data.map((userPresence) =>
          userPresence.id === id
            ? {
                ...userPresence,
                ...userPresenceChanges,
              }
            : userPresence
        )
      );

      onUserOnline?.(payload);
    },
    [socket, setPresence, onUserOnline]
  );

  const handleUserOffline = useCallback(
    (payload: ChatUserOfflineResponsePayloadInterface) => {
      const { id, isOnline } = payload;
      const userPresenceChanges = { isOnline };

      setPresence((data) =>
        data.map((userPresence) =>
          userPresence.id === id
            ? {
                ...userPresence,
                ...userPresenceChanges,
              }
            : userPresence
        )
      );

      onUserOffline?.(payload);
    },
    [socket, setPresence, onUserOffline]
  );

  const handleMessagesRead = useCallback(
    (payload: ChatMessagesReadResponsePayloadInterface) => {
      const { messageIds, conversationId, memberId } = payload;
      const isSelectedConversationRecipient =
        currentConversationId === conversationId;

      if (isSelectedConversationRecipient) {
        setMessages((ps) => ({
          ...ps,
          data: normalizeMessageHistory(
            ps.data.map((message) =>
              messageIds.includes(message.id)
                ? {
                    ...message,
                    isUnread: false,
                    readBy: [...message.readBy, memberId],
                  }
                : message
            )
          ),
        }));

        setConversations((ps) => ({
          ...ps,
          data: ps.data.map((conversation) =>
            conversation.id === conversationId
              ? {
                  ...conversation,
                  unreadCount: 0,
                }
              : conversation
          ),
        }));
      }

      if (userId === memberId) {
        setUnreadCount((_unreadCount) => _unreadCount - messageIds.length);
      }

      onMessagesRead?.(payload);
    },
    [
      currentConversationId,
      userId,
      normalizeMessageHistory,
      setUnreadCount,
      setMessages,
      normalizeMessageHistory,
      setConversations,
      onMessagesRead,
    ]
  );

  const initializeSocketListeners = useCallback(() => {
    if (!socket) {
      return;
    }

    socket.onConnect(handleConnect);
    socket.onDisconnect(handleDisconnect);
    socket.onError(handleError);
    socket.onServerException(handleServerException);

    return () => {
      socket.offConnect(handleConnect);
      socket.offDisconnect(handleDisconnect);
      socket.offError(handleError);
      socket.offServerException(handleServerException);
    };
  }, [
    socket,
    handleConnect,
    handleDisconnect,
    handleError,
    handleServerException,
  ]);

  useEffect(
    function attachSocketListeners() {
      if (!online || !socket) {
        return;
      }

      socket.onMessageRecieived(handleMessageReceived);
      socket.onConversationCreated(handleConversationCreated);
      socket.onConversationExists(handleConversationExists);
      socket.onConversationMembersChanged(handleConversationMembersChanged);
      socket.onConversationTitleChanged(handleConversationTitleChanged);
      socket.onConversationArchived(handleConversationArchived);
      socket.onMemberQuitConversation(handleMemberQuitConversation);
      socket.onMessageUpdated(handleMessageUpdated);
      socket.onMessageDeleted(handleMessageDeleted);
      socket.onUserOnline(handleUserOnline);
      socket.onUserOffline(handleUserOffline);
      socket.onMessagesRead(handleMessagesRead);

      return () => {
        socket.offMessageRecieived(handleMessageReceived);
        socket.offConversationCreated(handleConversationCreated);
        socket.offConversationExists(handleConversationExists);
        socket.offConversationMembersChanged(handleConversationMembersChanged);
        socket.offConversationTitleChanged(handleConversationTitleChanged);
        socket.offConversationArchived(handleConversationArchived);
        socket.offMemberQuitConversation(handleMemberQuitConversation);
        socket.offMessageUpdated(handleMessageUpdated);
        socket.offMessageDeleted(handleMessageDeleted);
        socket.offUserOnline(handleUserOnline);
        socket.offUserOffline(handleUserOffline);
        socket.offMessagesRead(handleMessagesRead);
      };
    },
    [
      online,
      handleMessageReceived,
      handleConversationCreated,
      handleConversationExists,
      handleConversationMembersChanged,
      handleConversationTitleChanged,
      handleConversationArchived,
      handleMemberQuitConversation,
      handleMessageUpdated,
      handleMessageDeleted,
      handleUserOnline,
      handleUserOffline,
      handleMessagesRead,
    ]
  );

  const initializeSocket = useCallback(() => {
    socket?.connect();
    initializeSocketListeners();
  }, [socket, initializeSocketListeners]);

  useEffect(
    function whaitForSocketReadyToUse() {
      if (!socket) {
        return;
      }

      initializeSocket();
    },
    [initializeSocket]
  );

  useEffect(
    function reinitializeSocketWithUserOrtoken() {
      socket?.disconnect();
      initializeSocket();
    },
    [userId, token]
  );

  const createConversation = useCallback(
    (payload: ChatCreateConversationRequestPayloadInterface) => {
      const createConversationPayload = {
        ...payload,
        memberIds: _uniq([...payload.memberIds, userId]),
      };

      socket?.createConversation(createConversationPayload);
    },
    [socket, userId]
  );

  const selectConversation = useCallback(
    (conversationId: string | null) => {
      setCurrentConversationId(conversationId);
    },
    [setCurrentConversationId]
  );

  const archiveConversation = useCallback(
    (conversationId) => {
      socket?.archiveConversation(conversationId);
    },
    [socket]
  );

  const renameConversation = useCallback(
    (title: string) => {
      const { editableId } = conversations;

      if (!editableId) {
        return;
      }

      const payload: ChatRenameConversationRequestPayloadInterface = {
        conversationId: editableId,
        title,
      };

      socket?.renameConversation(payload);
    },
    [socket, conversations]
  );

  const getConversationDetails = () => {
    console.log("getConversationDetails");
  };

  const updateConversationMembers = useCallback(
    (memberIds: string[]) => {
      if (!currentConversationId) {
        return;
      }

      const payload: ChatUpdateConversationMembersRequestPayloadInterface = {
        conversationId: currentConversationId,
        memberIds,
      };

      socket?.updateConversationMembers(payload);
    },
    [socket, currentConversationId]
  );

  const leaveConversation = useCallback(
    (conversationId: string) => {
      socket?.leaveConversation(conversationId);

      if (currentConversationId === conversationId) {
        setCurrentConversationId(null);
      }
    },
    [socket, currentConversationId, setCurrentConversationId]
  );

  const markAsReadUnreadConversationMessages = useCallback(() => {
    if (!currentConversation) {
      return;
    }

    const { unreadCount = 0 } = currentConversation;
    const { lastTimestamp } = messages;

    if (!lastTimestamp || unreadCount === 0) {
      return;
    }

    const payload: ChatMarkAsReadUnreadMessagesRequestPayloadInterface = {
      conversationId: currentConversation.id,
      lastTimestamp,
    };

    socket?.markAsReadUnreadMessages(payload);
  }, [socket, currentConversation, messages?.lastTimestamp]);

  const setEditableConversation = useCallback(
    (conversationId: string | null) => {
      setConversations((ps) => ({
        ...ps,
        editableId: conversationId,
      }));
    },
    [setConversations]
  );

  const resetEditableConversation = useCallback(() => {
    setEditableConversation(null);
  }, [setEditableConversation]);

  const sendMessage = useCallback(
    (message: Partial<ChatSendMessageRequestPayloadInterface>) => {
      if (!currentConversationId) {
        return;
      }

      socket?.sendMessage({
        conversationId: currentConversationId as string,
        ...message,
      });
    },
    [socket, currentConversationId]
  );

  const setEditableMessage = useCallback(
    (messageId: string | null) => {
      setMessages((ps) => ({
        ...ps,
        editableId: messageId,
      }));
    },
    [setMessages]
  );

  const resetEditableMessage = useCallback(() => {
    setEditableMessage(null);
  }, [setEditableMessage]);

  const editMessage = useCallback(
    (payload: Partial<ChatMessageEditRequestPayloadInterface>) => {
      if (!messages.editableId) {
        return;
      }

      socket?.editMessage({
        id: messages.editableId as string,
        ...payload,
      });

      resetEditableMessage();
    },
    [messages?.editableId, resetEditableMessage]
  );

  const deleteMessage = useCallback(
    (messageId) => {
      socket?.deleteMessage(messageId);
    },
    [socket]
  );

  const onFetchConversationListSuccess = useCallback(
    (response: ChatConversationListResponsePayloadInterface) => {
      setConversations((ps) => {
        const loadedConversations = [].concat(
          response.data.map(normalizeConversation)
        );

        const nextConversations = normalizeConversations([
          ...ps.data,
          ...loadedConversations,
        ]);

        return {
          ...ps,
          isLoading: false,
          data: nextConversations,
          totalCount: response.totalCount,
          loadedTotal: nextConversations.length,
          hasMore: nextConversations.length < response.totalCount,
        };
      });
    },
    [
      socket,
      conversations,
      setConversations,
      normalizeConversations,
      normalizeConversation,
    ]
  );

  const onFetchConversationListRequest = useCallback(
    (query: ChatConversationListRequestPayloadInterface) => {
      setConversations((ps) => ({
        ...ps,
        error: null,
        isLoading: true,
        offset: query.offset,
        filter: query.filter || "",
      }));
    },
    [socket, setConversations]
  );

  const fetchConversationList = useCallback(
    (query: ChatConversationListRequestPayloadInterface) => {
      onFetchConversationListRequest(query);
      socket?.conversationList(
        {
          includeArchived: true,
          ...query,
        },
        onFetchConversationListSuccess
      );
    },
    [
      socket,
      onFetchConversationListRequest,
      onFetchConversationListSuccess,
      setConversations,
    ]
  );

  const onFetchMessageListSuccess = useCallback(
    (response: ChatConversationListResponsePayloadInterface) => {
      setMessages((ps) => {
        const fetchedMessages = [].concat(response.data.map(normalizeMessage));

        const nextMessages = normalizeMessageHistory([
          ...fetchedMessages,
          ...ps.data,
        ]);

        const lastMessage = nextMessages[nextMessages.length - 1];
        const lastTimestamp = lastMessage && lastMessage.createdAt;

        return {
          ...ps,
          isLoading: false,
          data: nextMessages,
          totalCount: response.totalCount,
          loadedTotal: nextMessages.length,
          hasMore: nextMessages.length < response.totalCount,
          lastTimestamp,
        };
      });
    },
    [socket, setMessages, normalizeMessage]
  );

  const onFetchMessageListRequest = useCallback(
    (query: ChatFetchMessagesRequestPayloadInterface) => {
      setMessages((ps) => ({
        ...ps,
        error: null,
        isLoading: true,
        offset: query.offset,
        data: query?.reset ? [] : ps.data,
        filter: query.filter || "",
      }));
    },
    [socket, setMessages]
  );

  const fetchMessageList = useCallback(
    (
      query: Omit<ChatFetchMessagesRequestPayloadInterface, "conversationId">
    ) => {
      const payload: ChatFetchMessagesRequestPayloadInterface = {
        ...query,
        offset: query.reset ? 0 : query.offset,
        conversationId: currentConversationId,
      };

      onFetchMessageListRequest(payload);
      socket?.messageList(payload, onFetchMessageListSuccess);
    },
    [
      socket,
      currentConversationId,
      onFetchMessageListSuccess,
      onFetchMessageListRequest,
    ]
  );

  const resetSelectedRecipients = useCallback(() => {
    setRecipients((ps) => ({
      ...ps,
      selectedIds: [],
    }));
  }, [setRecipients]);

  const setSelectedRecipients = useCallback(
    (selectedIds: string[]) => {
      setRecipients((ps) => ({
        ...ps,
        selectedIds,
      }));
    },
    [setRecipients]
  );

  const setRecipientListFilter = useCallback(
    (initialFilter) => {
      const { filter, ids, excludeIds, includeIds } = initialFilter;

      setRecipients((ps) => ({
        ...ps,
        filter: {
          ...ps.filter,
          filter: filter ?? ps.filter.filter,
          ids: ids ? _without(ids, userId) : ps?.ids,
          includeIds: includeIds ?? ps.filter.includeIds,
          excludeIds: _uniq([...(excludeIds ?? []), userId]),
        },
      }));
    },
    [setRecipients, userId]
  );

  const resetRecipientList = useCallback(() => {
    setRecipients(INITIAL_RECIPIENTS_STATE);
  }, [setRecipients]);

  const onFetchRecipientListRequest = useCallback(
    (query: ChatFetchRecipientsVariablesInterface) => {
      const { filter, ids, excludeIds, includeIds } = query;

      setRecipients((ps) => ({
        ...ps,
        error: null,
        isLoading: true,
        offset: query.offset,
        filter: {
          ...ps.filter,
          filter: filter ?? ps.filter.filter,
          ids: ids ? _without(ids, userId) : ps?.ids,
          includeIds: includeIds ?? ps.filter.includeIds,
          excludeIds: _uniq([...(excludeIds ?? []), userId]),
        },
      }));
    },
    [setRecipients, userId]
  );

  const onFetchRecipientListSuccess = useCallback(
    (response: ChatFetchRecipientsResponseInterface) => {
      setRecipients((ps) => {
        const nextRecipients = ps.data.concat(
          [...response?.data].map(normalizeRecipient)
        );

        return {
          ...ps,
          error: null,
          isLoading: false,
          data: nextRecipients,
          totalCount: response.totalCount,
          loadedTotal: nextRecipients.length,
          hasMore: nextRecipients.length < response.totalCount,
        };
      });
    },
    [setRecipients]
  );

  const GET_RECIPIENTS = gql`
    query getRecipients(
      $limit: Int!
      $offset: Int!
      $ids: [ID!]
      $excludeIds: [ID!]
    ) {
      users(
        limit: $limit
        offset: $offset
        filter: { id: { valueIn: $ids, valueNotIn: $excludeIds } }
      ) {
        data {
          id
          firstName
          lastName
        }
        totalCount
      }
    }
  `;

  const [
    getRecipients,
    {
      loading: recipientsLoading,
      error: recipientsError,
      data: recipientsData,
    },
  ] = useLazyPlatformQuery(GET_RECIPIENTS);

  useEffect(
    function handleFetchRecipientListSuccess() {
      if (recipientsLoading) {
        return;
      }

      if (recipientsError) {
        return;
      }

      if (!recipientsData) {
        return;
      }

      onFetchRecipientListSuccess(recipientsData.users);
    },
    [recipientsLoading, recipientsError, recipientsData]
  );

  const fetchRecipientList = useCallback(
    async (params: ChatFetchRecipientsVariablesInterface) => {
      onFetchRecipientListRequest(params);
      const variables = {
        ...params,
      };

      getRecipients({ variables });
    },
    [
      host,
      userToken,
      token,
      onFetchRecipientListRequest,
      onFetchRecipientListSuccess,
      getRecipients,
    ]
  );

  const getUserPresence = useCallback(
    (userId: string) => {
      const userPresence = find(presence, { id: userId });

      return userPresence?.isOnline ?? false;
    },
    [presence]
  );

  const state = useMemo<ChatStateContextInterface>(
    () => ({
      online,
      error,
      userId,
      clientId,
      unreadCount,
      currentConversationId,
      currentConversation,
      conversations,
      messages,
      editableMessage,
      recipients,
    }),
    [
      online,
      error,
      userId,
      clientId,
      unreadCount,
      currentConversationId,
      currentConversation,
      conversations,
      messages,
      editableMessage,
      recipients,
    ]
  );

  const api = useMemo<ChatApiContextInterface>(
    () => ({
      selectConversation,
      createConversation,
      archiveConversation,
      renameConversation,
      getConversationDetails,
      updateConversationMembers,
      leaveConversation,
      resetEditableConversation,
      setEditableConversation,
      markAsReadUnreadConversationMessages,
      sendMessage,
      editMessage,
      setEditableMessage,
      deleteMessage,
      fetchConversationList,
      resetMessageList,
      fetchMessageList,
      fetchRecipientList,
      resetSelectedRecipients,
      setSelectedRecipients,
      setRecipientListFilter,
      resetRecipientList,
      getUserPresence,
    }),
    [
      selectConversation,
      createConversation,
      archiveConversation,
      renameConversation,
      getConversationDetails,
      updateConversationMembers,
      leaveConversation,
      resetEditableConversation,
      setEditableConversation,
      markAsReadUnreadConversationMessages,
      sendMessage,
      editMessage,
      setEditableMessage,
      deleteMessage,
      fetchConversationList,
      resetMessageList,
      fetchMessageList,
      fetchRecipientList,
      resetSelectedRecipients,
      setSelectedRecipients,
      setRecipientListFilter,
      resetRecipientList,
      getUserPresence,
    ]
  );

  return (
    <ChatStateContext.Provider value={state}>
      <ChatApiContext.Provider value={api}>{children}</ChatApiContext.Provider>
    </ChatStateContext.Provider>
  );
};
