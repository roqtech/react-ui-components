import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

export interface ChatStateContextInterface {
  currentConversationId?: unknown;
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

  const selectConversation = () => {
    console.log("selectConversation");
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

  const sendMessage = () => {
    console.log("sendMessage");
  };

  const editMessage = () => {
    console.log("editMessage");
  };

  const deleteMessage = () => {
    console.log("deleteMessage");
  };

  const state = useMemo<ChatStateContextInterface>(() => ({}), []);

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
