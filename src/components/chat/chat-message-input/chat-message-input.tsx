import "./chat-message-input.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ReactNode,
  ComponentType,
  useCallback,
  useState,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { SendIcon as DefaultSendIcon } from "./send-icon";
import { withChatApi } from "../chat-provider";
import { ChatSendMessageRequestPayloadInterface } from "src/utils/chat-socket.util";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message-input";

export interface ChatMessageInputProps {
  value?: string;
  placeholder?: string;
  hideSendButton?: boolean;
  onChange?: (value: string) => void;
  onBeforeSend?: (
    message: Partial<ChatSendMessageRequestPayloadInterface>
  ) => Partial<ChatSendMessageRequestPayloadInterface>;
  onSend?: (message: Partial<ChatSendMessageRequestPayloadInterface>) => void;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    textarea?: string;
    sendButton?: string;
  };
  components?: {
    Container: ComponentType<any>;
    Textarea: ComponentType<any>;
    SendButton: ComponentType<any>;
    SendIcon: ComponentType<any>;
  };
}

const ChatMessageInput = (props: ChatMessageInputProps) => {
  const {
    value,
    placeholder = "Type your message...",
    hideSendButton,
    onChange,
    onBeforeSend = (p) => p,
    onSend = (p) => {},
  } = props;
  const { style, className, classNames, components } = props;

  const Container = components?.Container ?? "div";
  const Textarea = components?.Textarea ?? "input";
  const SendButton = components?.SendButton ?? "button";
  const SendIcon = components?.SendIcon ?? DefaultSendIcon;

  const [textareaValue, setValue] = useState<string>(value ?? "");

  const reset = useCallback(() => setValue(""), [setValue]);

  const handleTextareaChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [onChange]
  );

  const handleSend = useCallback(
    async (payload: Partial<ChatSendMessageRequestPayloadInterface>) => {
      const messagePayload = await onBeforeSend(payload);

      reset();

      onSend(messagePayload);
    },
    [reset, onBeforeSend, onSend]
  );

  const handleSendButtonClick = useCallback(
    () =>
      handleSend({
        body: textareaValue,
      }),
    [handleSend, textareaValue]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Textarea
        value={textareaValue}
        className={clsx(_CLASS_IS + "__textarea", classNames?.textarea)}
        placeholder={placeholder}
        onChange={handleTextareaChange}
      />
      {(!hideSendButton ?? true) && (
        <SendButton
          className={clsx(_CLASS_IS + "__send-button", classNames?.sendButton)}
          onClick={handleSendButtonClick}
        >
          <SendIcon className={clsx(_CLASS_IS + "__send-button__icon")} />
        </SendButton>
      )}
    </Container>
  );
};

export default withChatApi(({ sendMessage }) => ({
  onSend: sendMessage,
}))(ChatMessageInput);
