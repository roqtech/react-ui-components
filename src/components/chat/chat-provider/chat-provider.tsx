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
import {
  ChatConversationInterface,
  ChatMessageInterface,
  ComplexError,
} from "src/types";
import {
  ChatConversationCreatedResponsePayloadInterface,
  ChatConversationExistsResponsePayloadInterface,
  ChatConversationListRequestPayloadInterface,
  ChatConversationListResponsePayloadInterface,
  ChatConversationMembersChangedResponsePayloadInterface,
  ChatConversationTitleChangedResponsePayloadInterface,
  ChatCreateConversationRequestPayloadInterface,
  ChatFetchMessagesRequestPayloadInterface,
  ChatMarkAsReadUnreadMessagesRequestPayloadInterface,
  ChatMemberQuitConversationResponsePayloadInterface,
  ChatMessageDeletedResponsePayloadInterface,
  ChatMessageEditRequestPayloadInterface,
  ChatMessageRecieivedResponsePayloadInterface,
  ChatMessagesReadResponsePayloadInterface,
  ChatMessageUpdatedResponsePayloadInterface,
  ChatRenameConversationRequestPayloadInterface,
  ChatSendMessageRequestPayloadInterface,
  ChatSocket,
  ChatSocketInterface,
  ChatUpdateConversationMembersRequestPayloadInterface,
  ChatUserConnectedResponsePayload,
} from "src/utils/chat-socket.util";
import { useSocket } from "src/components/socket";
import { useRoq } from "src/index";
import gql from "graphql-tag";
import { request } from "src/utils";
import {
  ChatConversationListInterface,
  ChatConversationSchemaInterface,
  ChatFetchRecipientsResponseInterface,
  ChatFetchRecipientsVariablesInterface,
  ChatMessageListInterface,
  ChatMessageSchemaInterface,
  ChatRecipientListInterface,
  ChatUserInterface,
  ChatUserPresenceListInterface,
} from "src/types/chat.type";

export interface ChatStateContextInterface {
  online: boolean;
  error?: ComplexError | null;
  clientId?: string;
  unreadCount: number;
  currentConversationId: string | null;
  currentConversation?: ChatConversationInterface;
  conversations: ChatConversationListInterface;
  messages: ChatMessageListInterface;
  recipients: ChatRecipientListInterface;
  presense: ChatUserPresenceListInterface;
}

export interface ChatApiContextInterface {
  getId: () => string | null;
  isConnected: () => boolean;
  connect: () => void;
  disconnect: () => void;
  selectConversation: (conversationId: string | null) => void;
  createConversation: (
    payload: ChatCreateConversationRequestPayloadInterface
  ) => void;
  archiveConversation: (conversationId: string) => void;
  renameConversation: (title: string) => void;
  getConversationDetails: (conversationId: string) => void;
  updateConversationMembers: (payload: unknown) => void;
  leaveConversation: (conversationId: string) => void;
  markAsReadUnreadConversationMessages: (payload: unknown) => void;
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
}

export const ChatStateContext =
  createContext<ChatStateContextInterface | null>(null);

export const ChatApiContext =
  createContext<ChatApiContextInterface | null>(null);

export interface ChatProviderPropsInterface {
  children?: ReactNode;

  userId: string;
  platformToken: string;
  conversationId?: string;

  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: () => void;
  onServerException?: () => void;
  onConversationCreated?: () => void;
  onConversationMembersChanged?: () => void;
  onConversationTitleChanged?: () => void;
  onConversationExists?: () => void;
  onConversationArchived?: () => void;
  onMessageRecieived?: () => void;
  onMessageUpdated?: () => void;
  onMessageDeleted?: () => void;
  onMessagesRead?: () => void;
  onMemberQuitConversation?: () => void;
  onUserConnected?: () => void;
  onUserOnline?: () => void;
  onUserOffline?: () => void;
}

const messageSortComparer = (
  a: ChatMessageInterface,
  b: ChatMessageInterface
): number => +a.createdAt - +b.createdAt;

const conversatonSortComparer = (
  a: ChatConversationInterface,
  b: ChatConversationInterface
): number => +b.lastMessageTimestamp - +a.lastMessageTimestamp;

const markMessageAsStartOfTheGroup = (message: ChatMessageInterface) => {
  // showUser
  // showTime

  message.showUser = true;
  message.showTime = true;

  return message;
};

const groupMessages = (
  currentMessage: ChatMessageInterface,
  index: number,
  messages: ChatMessageInterface[]
) => {
  const prevMessage = messages[index - 1];

  currentMessage.showUser = false;
  currentMessage.showTime = false;

  if (!prevMessage) {
    return markMessageAsStartOfTheGroup(currentMessage);
  }

  if (currentMessage.authorId !== prevMessage.authorId) {
    return markMessageAsStartOfTheGroup(currentMessage);
  }

  if (
    !!currentMessage.bodyUpdatedAt &&
    currentMessage.bodyUpdatedAt !== currentMessage.updatedAt
  ) {
    currentMessage.showTime = true;
  }

  return currentMessage;
};

const normalizeMessageHistory = (history: ChatMessageInterface[]) =>
  history.sort(messageSortComparer).map(groupMessages);

const INITIAL_CONVERSATIONS_STATE = {
  editableId: null,
  error: null,
  isLoading: false,
  hasMore: false,
  offset: 0,
  limit: 10,
  totalCount: 0,
  loadedTotal: 0,
  data: [],
};

const INITIAL_MESSAGES_STATE = {
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

const INITIAL_RECIPIENTS_STATE = {
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

const normalizeRecipient = (
  recipient: ChatUserInterface
): ChatUserInterface => {
  recipient.fullName = `${recipient.firstName ?? ""} ${
    recipient.lastName ?? ""
  }`.trim();
  return recipient;
};

export const ChatProvider = (
  props: ChatProviderPropsInterface
): ReactElement => {
  const { children, userId, platformToken, conversationId } = props;

  const { host, token } = useRoq();

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
    INITIAL_RECIPIENTS_STATE
  );

  const currentConversation: ChatConversationInterface | null = useMemo(
    () =>
      _find(conversations.data, {
        id: currentConversationId,
      }) ?? null,
    [conversations?.data, currentConversationId]
  );

  const editableMessage: ChatMessageInterface | null = useMemo(
    () =>
      _find(messages.data, {
        id: messages?.editableId,
      }) ?? null,
    [messages?.data, messages?.editableId]
  );

  const resetState = useCallback(() => {
    setConversations(INITIAL_CONVERSATIONS_STATE);
    setMessages(INITIAL_MESSAGES_STATE);
    setError(null);
    setClientId(null);
    setUnreadCount(0);
    setCurrentConversationId(null);
  }, [
    setSocket,
    setOnline,
    setError,
    setClientId,
    setUnreadCount,
    setCurrentConversationId,
    setConversations,
    setMessages,
  ]);

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
      const { createdAt, ownerId, lastMessageTimestamp, lastMessage, ...rest } =
        conversationSchema;

      return {
        ...rest,
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

  const { socket: socketClient } = useSocket();

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
    },
    [setUnreadCount, setOnline]
  );

  const handleConnect = useCallback(() => {
    setClientId(socket?.getId());
    socket?.authorize({ userId }, handleUserConnected);
  }, [socket, userId, setClientId, handleUserConnected]);

  const handleDisconnect = useCallback(() => {
    setOnline(false);
  }, [setOnline]);

  const handleError = useCallback((error) => {
    console.error(error);
  }, []);

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
    },
    [normalizeConversation, normalizeMessage, setCurrentConversationId]
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
    },
    [
      setCurrentConversationId,
      conversations,
      setCurrentConversationId,
      normalizeConversation,
      normalizeMessage,
      resetMessageList,
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
    },
    [setConversations]
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
    },
    [setConversations]
  );

  const handleConversationArchived = useCallback(
    (payload) => {
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
    },
    [currentConversationId, setConversations, setCurrentConversationId]
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
    },
    [currentConversationId, setCurrentConversationId, setConversations]
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
    },
    [currentConversationId, setMessages, normalizeMessage]
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
    },
    [currentConversationId, setMessages, normalizeMessage]
  );

  const handleUserOnline = useCallback(
    (payload) => {
      console.log("handleUserOnline");
      const { id, isOnline } = payload;
      const userPresenceChanges = { isOnline };

      // messageCenterPresenceAdapter.updateOne(state.presence, { id, changes: userPresenceChanges });
    },
    [socket, setPresence]
  );

  const handleUserOffline = useCallback(
    (payload) => {
      console.log("handleUserOffline");
      const { id, isOnline } = payload;
      const userPresenceChanges = { isOnline };

      // messageCenterPresenceAdapter.updateOne(state.presence, { id, changes: userPresenceChanges });
    },
    [socket, setPresence]
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
    },
    [
      currentConversationId,
      userId,
      normalizeMessageHistory,
      setUnreadCount,
      setMessages,
      normalizeMessageHistory,
      setConversations,
    ]
  );

  const initializeSocketListeners = useCallback(() => {
    if (!socket) {
      return;
    }

    socket.onConnect(handleConnect);
    socket.onDisconnect(handleDisconnect);
    socket.onError(handleError);
    socket.onServerException(handleError);

    return () => {
      socket.offConnect(handleConnect);
      socket.offDisconnect(handleDisconnect);
      socket.offError(handleError);
      socket.offServerException(handleError);
    };
  }, [socket, handleConnect, handleDisconnect, handleError]);

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
    function reinitializeSocketWithUserOrPlatformToken() {
      resetState();
      socket?.disconnect();
      initializeSocket();
    },
    [userId, platformToken]
  );

  const getId = () => {
    console.log("getId");

    return "conversationId";
  };

  const isConnected = () => {
    console.log("isConnected");

    return false;
  };

  const connect = () => {
    console.log("connect");
  };

  const disconnect = () => {
    console.log("disconnect");
  };

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
    (conversationId: string) => {
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
    (title) => {
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

  const leaveConversation = useCallback((conversationId: string) => {
    socket?.leaveConversation(conversationId);
  }, [socket])

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
      socket?.sendMessage({
        conversationId: currentConversationId,
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
      socket?.editMessage({
        id: messages?.editableId,
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
          (response.data ?? []).map(normalizeRecipient)
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

  const fetchRecipientList = useCallback(
    async (params: ChatFetchRecipientsVariablesInterface) => {
      onFetchRecipientListRequest(params);
      const variables = {
        ...params,
      };

      const query = gql`
        query getRecipients(
          $limit: Int!
          $offset: Int!
          $ids: [String!]
          $excludeIds: [String!]
        ) {
          users(
            limit: $limit
            offset: $offset
            filter: {
              roqIdentifier: { valueIn: $ids, valueNotIn: $excludeIds }
            }
          ) {
            data {
              id
              firstName
              lastName
              fullName
              initials
              roqIdentifier
              initials
              avatar
            }
            totalCount
          }
        }
      `;

      const result = await request(
        {
          url: host,
          query,
          variables,
          headers: {
            authorization: process.env.STORYBOOK_TOKEN,
            "roq-platform-authorization": token as string,
          },
        },
        "data"
      ).catch(() => []);

      onFetchRecipientListSuccess(result.users);
    },
    [host, token, onFetchRecipientListRequest, onFetchRecipientListSuccess]
  );

  const state = useMemo<ChatStateContextInterface>(
    () => ({
      online,
      error,
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
      getId,
      isConnected,
      connect,
      disconnect,
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
    }),
    [
      getId,
      isConnected,
      connect,
      disconnect,
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
    ]
  );

  return (
    <ChatStateContext.Provider value={state}>
      <ChatApiContext.Provider value={api}>{children}</ChatApiContext.Provider>
    </ChatStateContext.Provider>
  );
};

ChatProvider.displayName = "ChatProvider";
