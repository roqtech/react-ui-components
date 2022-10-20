import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

import find from "lodash/find";
import uniqueId from "lodash/uniqueId";
import { ChatConversationInterface, ChatMessageInterface } from "src/types";

export interface ChatStateContextInterface {
  currentConversation?: ChatConversationInterface;
  conversations: ChatConversationInterface[];
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
  sendMessage: (payload: unknown) => void;
  editMessage: (payload: unknown) => void;
  deleteMessage: (messageId: string) => void;
}

export const ChatStateContext =
  createContext<ChatStateContextInterface | null>(null);

export const ChatApiContext =
  createContext<ChatApiContextInterface | null>(null);

export interface ChatProviderPropsInterface {
  children?: ReactNode;
  socketUrl: string;
  platformToken: string;

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
  onUserOnline?: () => void;
  onUserOffline?: () => void;
}

export const ChatProvider = (
  props: ChatProviderPropsInterface
): ReactElement => {
  const { children } = props;

  const [messages, setMessages] = useState<ChatMessageInterface[]>([
    {
      id: uniqueId(),
      message: "Hello",
      timestamp: new Date(),
      user: {
        id: uniqueId(),
        fullName: "Mose Ewald",
        avatar: "https://i.pravatar.cc/60?img=15",
      },
    },
    {
      id: uniqueId(),
      message: "Hi. Is there an updates?",
      timestamp: new Date(),
      user: {
        id: uniqueId(),
        fullName: "Susan Gomez",
        avatar: "https://i.pravatar.cc/60?img=1",
      },
    },
    {
      id: uniqueId(),
      message: "Yeah, let`s sync up in 10m",
      timestamp: new Date(),
      user: {
        id: uniqueId(),
        fullName: "Piper Wong",
        avatar: "https://i.pravatar.cc/60?img=14",
      },
    },
    {
      id: uniqueId(),
      message: "Sounds good",
      timestamp: new Date(),
      user: {
        id: uniqueId(),
        fullName: "Jared Brewer",
        avatar: "https://i.pravatar.cc/60?img=12",
      },
    },
    {
      id: uniqueId(),
      message: "I'll let you know",
      timestamp: new Date(),
      user: {
        id: uniqueId(),
        fullName: "Jared Brewer",
        avatar: "https://i.pravatar.cc/60?img=12",
      },
    },
    {
      id: uniqueId(),
      message: "haha!",
      timestamp: new Date(),
      user: {
        id: uniqueId(),
        fullName: "Susan Gomez",
        avatar: "https://i.pravatar.cc/60?img=1",
      },
    },
    {
      id: uniqueId(),
      message: "Works well",
      timestamp: new Date(),
      user: {
        id: uniqueId(),
        fullName: "Piper Wong",
        avatar: "https://i.pravatar.cc/60?img=14",
      },
    },
  ]);

  const [currentConversation, setCurrentConversation] =
    useState<ChatConversationInterface>({
      title: "Marketing Chat Group",
      timestamp: new Date(),
      message: `Hi! How it's going?`,
      members: [
        {
          id: uniqueId(),
          fullName: "Mose Ewald",
          avatar: "https://i.pravatar.cc/60?img=15",
        },
        {
          id: uniqueId(),
          fullName: "Susan Gomez",
          avatar: "https://i.pravatar.cc/60?img=1",
        },
        {
          id: uniqueId(),
          fullName: "Piper Wong",
          avatar: "https://i.pravatar.cc/60?img=14",
        },
      ],
      messages,
    });

  const [conversations, setConversations] = useState<
    ChatConversationInterface[]
  >([
    {
      id: uniqueId(),
      title: "Marketing Chat Group",
      timestamp: new Date(),
      message: `Hi! How it's going?`,
      members: [
        {
          id: uniqueId(),
          fullName: "Mose Ewald",
          avatar: "https://i.pravatar.cc/60?img=15",
        },
        {
          id: uniqueId(),
          fullName: "Susan Gomez",
          avatar: "https://i.pravatar.cc/60?img=1",
        },
        {
          id: uniqueId(),
          fullName: "Piper Wong",
          avatar: "https://i.pravatar.cc/60?img=14",
        },
      ],
    },
    {
      id: uniqueId(),
      title: "Susan Gomez",
      timestamp: new Date(),
      message: `Hi! How it's going?`,
      members: [
        {
          id: uniqueId(),
          fullName: "Susan Gomez",
          avatar: "https://i.pravatar.cc/60?img=1",
        },
        {
          id: uniqueId(),
          fullName: "Piper Wong",
          avatar: "https://i.pravatar.cc/60?img=14",
        },
      ],
    },
    {
      id: uniqueId(),
      title: "Release Discsusion",
      timestamp: new Date(),
      message: `Hi! How it's going?`,
      members: [
        {
          id: uniqueId(),
          fullName: "Piper Wong",
          avatar: "https://i.pravatar.cc/60?img=14",
        },
        {
          id: uniqueId(),
          fullName: "Susan Gomez",
          avatar: "https://i.pravatar.cc/60?img=1",
        },
        {
          id: uniqueId(),
          fullName: "Jared Brewer",
          avatar: "https://i.pravatar.cc/60?img=12",
        },
      ],
    },
  ]);

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

  const selectConversation = (conversationId) => {
    const selectedConversation = find(conversations, { id: conversationId });

    setCurrentConversation({
      ...selectedConversation,
      messages,
    } as unknown as ChatConversationInterface);
  };

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

  const sendMessage = (message: unknown) => {
    const nextMessages = [
      ...messages,
      {
        id: uniqueId(),
        message: message as string,

        timestamp: new Date(),
        user: {
          fullName: "Piper Wong",
          avatar: "https://i.pravatar.cc/60?img=14",
        },
        isSent: true,
      },
    ];

    setCurrentConversation((ps) => ({
      ...ps,
      messages: nextMessages,
    }));
  };

  const editMessage = () => {
    console.log("editMessage");
  };

  const deleteMessage = () => {
    console.log("deleteMessage");
  };

  const state = useMemo<ChatStateContextInterface>(
    () => ({
      currentConversation,
      conversations,
    }),
    [currentConversation, conversations]
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
    }),
    []
  );

  return (
    <ChatStateContext.Provider value={state}>
      <ChatApiContext.Provider value={api}>{children}</ChatApiContext.Provider>
    </ChatStateContext.Provider>
  );
};

ChatProvider.displayName = "ChatProvider";
