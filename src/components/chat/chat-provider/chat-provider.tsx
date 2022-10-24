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
  ChatMessageRecieivedResponsePayloadInterface,
  ChatSendMessageRequestPayloadInterface,
  ChatSocket,
  ChatSocketInterface,
  ChatUserConnectedResponsePayload,
} from "src/utils/chat-socket.util";

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
  selectConversation: (conversationId: string) => void;
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
  editMessage: (payload: unknown) => void;
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

export interface ChatProviderPropsInterface
  extends Pick<SocketClientProps, "secure" | "platformUrl" | "platformToken"> {
  children?: ReactNode;

  userId: string;
  socketUrl?: SocketClientProps["url"];
  socketConfiguration?: Omit<
    SocketClientProps,
    "platformUrl" | "url" | "platformToken"
  >;

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

const normalizeMessage = (
  message: Partial<ChatMessageInterface>
): ChatMessageInterface => {
  message.createdAt = new Date(message.createdAt);
  message.updatedAt = new Date(message.updatedAt);
  return message;
};

const sortComparer = (a, b) => +a.createdAt - +b.createdAt;

const normalizeMessageHistory = (history: ChatMessageInterface[]) =>
  history.sort(sortComparer);

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
  } = props;

  const [socket, setSocket] = useState<ChatSocketInterface | null>(null);
  const [online, setOnline] = useState<boolean>(false);
  const [error, setError] = useState<ComplexError | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [currentConversationId, setCurrentConversationId] =
    useState<ChatConversationInterface["id"] | null>(null);

  const [conversations, setConversations] = useState<
    InfiniteListInterface<ChatConversationInterface>
  >({
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
  });

  const [messages, setMessages] = useState<
    InfiniteListInterface<ChatMessageInterface>
  >({
    // active: null,
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
  });

  const currentConversation: ChatConversationInterface = useMemo(
    () =>
      find(conversations.data, {
        id: currentConversationId,
      }) ?? null,
    [conversations?.data, currentConversationId]
  );

  useLayoutEffect(function windowIsReady() {
    if (socket) {
      return;
    }

    const clientProps: SocketClientProps = {
      platformUrl,
      url: socketUrl,
      platformToken,

      ...socketConfiguration,
    };

    const client = socketClient(clientProps);

    setSocket(new ChatSocket(client));
  }, []);

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
    ]
  );

  const initializeSocketListeners = useCallback(() => {
    if (!socket) {
      return;
    }

    socket?.onConnect(handleConnect);
    socket?.onDisconnect(handleDisconnect);
    socket?.onError(handleError);
    socket?.onServerException(handleError);

    return () => {
      socket?.offConnect(handleConnect);
      socket?.offDisconnect(handleDisconnect);
      socket?.offError(handleError);
      socket?.offServerException(handleError);
    };
  }, [
    socket,
    handleConnect,
    handleDisconnect,
    handleError,
    handleMessageReceived,
    handleConnect,
    handleDisconnect,
  ]);

  useEffect(
    function attachSocketListeners() {
      if (!online) {
        return;
      }

      socket?.onMessageRecieived(handleMessageReceived);

      return () => {
        socket?.offMessageRecieived(handleMessageReceived);
      };
    },
    [online, handleMessageReceived]
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

  const archiveConversation = () => {
    console.log("archiveConversation");
  };

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
    (
      message: Omit<ChatSendMessageRequestPayloadInterface, "conversationId">
    ) => {
      socket?.sendMessage({
        ...message,
        conversationId: currentConversationId,
      });
    },
    [socket, currentConversationId]
  );

  const editMessage = () => {
    console.log("editMessage");
  };

  const deleteMessage = () => {
    console.log("deleteMessage");
  };

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
    [socket, setMessages]
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
