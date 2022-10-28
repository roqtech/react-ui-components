import { useState } from "react";

export enum ChatScreenEnum {
  CONVERSATION_SELECTED = "conversation_selected",
  CONVERSATION_NOT_SELECTED = "conversation_not_selected",
  CONVERSATION_ADD_MEMBERS = "conversation_add_users",
  CONVERSATION_REMOVE_MEMBERS = "conversation_remove_users",
  CREATE_NEW_CONVERSATION = "create_new",
}

export interface UseChatScreenHookInterface {
  screen: ChatScreenEnum;
  setScreen: (screen: ChatScreenEnum) => void;
}

export interface UseChatScreenPropsInterface {
  defaultScreen?: ChatScreenEnum;
}

export const useChatScreen = (
  props?: UseChatScreenPropsInterface
): UseChatScreenHookInterface => {
  const { defaultScreen = ChatScreenEnum.CONVERSATION_NOT_SELECTED } =
    props ?? {};

  const [screen, setScreen] = useState<ChatScreenEnum>(defaultScreen);

  return {
    screen,
    setScreen,
  };
};
