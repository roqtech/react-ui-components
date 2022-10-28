import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import find from "lodash/find";
import update from "lodash/update";
import {
  ChatConversationInterface,
  ChatMessageInterface,
  ComplexError,
  InfiniteListInterface,
} from "src/types";
import { socketClient, SocketClientProps } from "src/utils/socket-client.util";
import {
  ChatConversationListRequestPayloadInterface,
  ChatConversationListResponsePayloadInterface,
  ChatFetchMessagesRequestPayloadInterface,
  ChatMessageDeletedResponsePayloadInterface,
  ChatMessageEditRequestPayloadInterface,
  ChatMessageRecieivedResponsePayloadInterface,
  ChatMessageUpdatedResponsePayloadInterface,
  ChatSendMessageRequestPayloadInterface,
  ChatSocket,
  ChatSocketInterface,
  ChatUserConnectedResponsePayload,
} from "src/utils/chat-socket.util";
import { useSocket } from "src/components/socket";

export interface ChatStateContextInterface {
  online: boolean;
  error?: ComplexError | null;
  clientId?: string;
  unreadCount: number;
  currentConversationId: string | null;
  currentConversation?: ChatConversationInterface;
  conversations: InfiniteListInterface<ChatConversationInterface>;
  messages: InfiniteListInterface<ChatMessageInterface>;
}

export interface ChatApiContextInterface {
  getId: () => string | null;
  isConnected: () => boolean;
  connect: () => void;
  disconnect: () => void;
  selectConversation: (conversationId: string | null) => void;
  createConversation: (payload: unknown) => void;
  archiveConversation: (conversationId: string) => void;
  renameConversation: (payload: unknown) => void;
  getConversationDetails: (conversationId: string) => void;
  updateConversationMembers: (payload: unknown) => void;
  leaveConversation: (conversationId: string) => void;
  getConversationList: (payload: unknown) => void;
  getConversationMessageList: (payload: unknown) => void;
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

  fetchMessageList: (query: ChatFetchMessagesRequestPayloadInterface) => void;
}

export const ChatStateContext =
  createContext<ChatStateContextInterface | null>(null);

export const ChatApiContext =
  createContext<ChatApiContextInterface | null>(null);

export interface ChatProviderPropsInterface {
  children?: ReactNode;

  userId: string;
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

const sortComparer = (a, b) => +a.createdAt - +b.createdAt;

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
  history.sort(sortComparer).map(groupMessages);

const INITIAL_CONVERSATIONS_STATE = {
  // editingId: null,
  // editingType: null,
  // selected: null,
  error: null,
  isLoading: false,
  hasMore: false,
  offset: 0,
  limit: 10,
  totalCount: 0,
  loadedTotal: 0,
  data: [],
  // filter: '',
};

const INITIAL_MESSAGES_STATE = {
  editableMessageId: null,
  error: null,
  isLoading: false,
  hasMore: true,
  offset: 0,
  limit: 20,
  totalCount: 0,
  loadedTotal: 0,
  data: [],
  // filter: '',
  // history: [],
  // lastTimestamp: null,
};

export const ChatProvider = (
  props: ChatProviderPropsInterface
): ReactElement => {
  const {
    children,
    userId,
    platformUrl,
    socketUrl,
    platformToken,
    socketConfiguration = {},
    conversationId,
  } = props;

  const [socket, setSocket] = useState<ChatSocketInterface | null>(null);
  const [online, setOnline] = useState<boolean>(false);
  const [error, setError] = useState<ComplexError | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [currentConversationId, setCurrentConversationId] = useState<
    ChatConversationInterface["id"] | null
  >(conversationId ?? null);

  const [conversations, setConversations] = useState<
    InfiniteListInterface<ChatConversationInterface>
  >(INITIAL_CONVERSATIONS_STATE);

  const [messages, setMessages] = useState<
    InfiniteListInterface<ChatMessageInterface>
  >(INITIAL_MESSAGES_STATE);

  const currentConversation: ChatConversationInterface = useMemo(
    () =>
      find(conversations.data, {
        id: currentConversationId,
      }) ?? null,
    [conversations?.data, currentConversationId]
  );

  const editableMessage: ChatMessageInterface = useMemo(
    () =>
      find(messages.data, {
        id: messages?.editableMessageId,
      }) ?? null,
    [messages?.data, messages?.editableMessageId]
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

  const normalizeMessage = useCallback(
    (message: Partial<ChatMessageInterface>): ChatMessageInterface => {
      message.createdAt = new Date(message.createdAt);
      message.isSent = userId === message.authorId;

      if (message.updatedAt) {
        message.updatedAt = new Date(message.updatedAt);
      }

      if (message.deletedAt) {
        message.deletedAt = new Date(message.deletedAt);
      }

      if (message.bodyUpdatedAt) {
        message.bodyUpdatedAt = new Date(message.bodyUpdatedAt);
      }

      return message;
    },
    [userId]
  );

  const handleMessageReceived = useCallback(
    (response: ChatMessageRecieivedResponsePayloadInterface) => {
      const recipientConversation = find(conversations.data, {
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
            data: [...ps.data, newMessage],
            totalCount: ps.totalCount + 1,
            loadedTotal: ps.loadedTotal + 1,
          }));
        }

        // state.messages.lastTimestamp = action.payload.message.createdAt;
        //   if (action.payload.message.isUnread) {
        //     conversationChanges.unreadCount += 1;
        //     state.unreadCount += 1;
        //   }

        setConversations((ps) => ({
          ...ps,
          data: ps.data.map((_conversation) =>
            _conversation.id === newMessage.conversationId
              ? { ..._conversation, ...conversationChanges }
              : _conversation
          ),
        }));
      } else {
        if (!response.readBy?.includes(userId)) {
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
    ]
  );

  const handleConversationCreated = useCallback(() => {
    alert("handleConversationCreated");
  }, []);

  const handleConversationExists = useCallback(() => {
    alert("handleConversationExists");
  }, []);

  const handleConversationMembersChanged = useCallback(() => {
    alert("handleConversationMembersChanged");
  }, []);

  const handleConversationTitleChanged = useCallback(() => {
    alert("handleConversationTitleChanged");
  }, []);

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

  const handleMemberQuitConversation = useCallback(() => {
    alert("handleMemberQuitConversation");
  }, []);

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

  const handleUserOnline = useCallback(() => {
    console.log("handleUserOnline");
  }, []);

  const handleUserOffline = useCallback(() => {
    console.log("handleUserOffline");
  }, []);

  const handleMessagesRead = useCallback(() => {
    alert("handleMessagesRead");
  }, []);

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

  const createConversation = () => {
    console.log("createConversation");
  };

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

  const renameConversation = () => {
    console.log("renameConversation");
  };

  const getConversationDetails = () => {
    console.log("getConversationDetails");
  };

  const updateConversationMembers = () => {
    console.log("updateConversationMembers");
  };

  const leaveConversation = () => {
    console.log("leaveConversation");
  };

  const getConversationList = () => {
    console.log("getConversationList");
  };

  const getConversationMessageList = () => {
    console.log("getConversationMessageList");
  };

  const markAsReadUnreadConversationMessages = () => {
    console.log("markAsReadUnreadConversationMessages");
  };

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
      debugger;

      setMessages((ps) => ({
        ...ps,
        editableMessageId: messageId,
      }));
    },
    [setMessages]
  );

  const editMessage = useCallback(
    (payload: Partial<ChatMessageEditRequestPayloadInterface>) => {
      socket?.editMessage({
        id: messages?.editableMessageId,
        ...payload,
      });

      setEditableMessage(null);
    },
    [messages?.editableMessageId, setEditableMessage]
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
        const loadedConversations = [].concat(response.data);
        const nextConversations = [...ps.data, ...loadedConversations];

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
    [socket, conversations, setConversations]
  );

  const onFetchConversationListRequest = useCallback(
    (query: ChatConversationListRequestPayloadInterface) => {
      setConversations((ps) => ({
        ...ps,
        error: null,
        isLoading: true,
        offset: query.offset,
        // filter: query.filter || '';
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

        return {
          ...ps,
          isLoading: false,
          data: nextMessages,
          totalCount: response.totalCount,
          loadedTotal: nextMessages.length,
          hasMore: nextMessages.length < response.totalCount,
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
        // filter: query.filter || '';
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
      getConversationList,
      getConversationMessageList,
      markAsReadUnreadConversationMessages,
      sendMessage,
      editMessage,
      setEditableMessage,
      deleteMessage,
      fetchConversationList,
      fetchMessageList,
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
      getConversationList,
      getConversationMessageList,
      markAsReadUnreadConversationMessages,
      sendMessage,
      editMessage,
      setEditableMessage,
      deleteMessage,
      fetchConversationList,
    ]
  );

  return (
    <ChatStateContext.Provider value={state}>
      <ChatApiContext.Provider value={api}>{children}</ChatApiContext.Provider>
    </ChatStateContext.Provider>
  );
};

ChatProvider.displayName = "ChatProvider";
