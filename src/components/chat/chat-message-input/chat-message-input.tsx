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
import { ChatMessageEditor } from "../chat-message-editor";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message-input";

export interface ChatMessageInputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  hideSendButton?: boolean;
  sendLabel?: string;
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
    SendLabel: ComponentType<any>;
    SendIcon: ComponentType<any>;
  };
}

const ChatMessageInput = (props: ChatMessageInputProps) => {
  const {
    value,
    defaultValue = "<p></p>",
    placeholder = "Type your message...",
    hideSendButton,
    sendLabel,
    onChange,
    onBeforeSend = (p) => p,
    onSend = (p) => {},
  } = props;
  const { style, className, classNames, components } = props;

  const Container = components?.Container ?? "form";
  const Textarea = components?.Textarea ?? ChatMessageEditor;
  const SendButton = components?.SendButton ?? "button";
  const SendLabel = components?.SendLabel ?? "span";
  const SendIcon = components?.SendIcon ?? DefaultSendIcon;

  const [textareaValue, setValue] = useState<string>(value ?? defaultValue);

  const reset = useCallback(() => setValue(defaultValue), [setValue]);

  const handleTextareaChange = useCallback(
    (value) => {
      setValue(value);
    },
    [onChange]
  );

  const send = useCallback(
    async (payload: Partial<ChatSendMessageRequestPayloadInterface>) => {
      const messagePayload = await onBeforeSend(payload);

      reset();

      onSend(messagePayload);
    },
    [reset, onBeforeSend, onSend]
  );

  const handleSend = useCallback(
    () =>
      send({
        body: textareaValue,
      }),
    [send, textareaValue]
  );

  const handleTextareaEnter = useCallback(() => {
    send({
      body: textareaValue,
    });
  }, [send]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      send({
        body: textareaValue,
      });
    },
    [send]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
      onSubmit={handleSubmit}
    >
      <Textarea
        name="message"
        value={textareaValue}
        className={clsx(_CLASS_IS + "__textarea", classNames?.textarea)}
        placeholder={placeholder}
        onChange={handleTextareaChange}
        onEnter={handleTextareaEnter}
      />
      {(!hideSendButton ?? true) && (
        <SendButton
          className={clsx(_CLASS_IS + "__send-button", classNames?.sendButton)}
          onClick={handleSend}
        >
          {sendLabel && (
            <SendLabel className={clsx(_CLASS_IS + "__send-button__label")}>
              sendLabel
            </SendLabel>
          )}
          <SendIcon className={clsx(_CLASS_IS + "__send-button__icon")} />
        </SendButton>
      )}
    </Container>
  );
};

export default withChatApi(({ sendMessage }) => ({
  onSend: sendMessage,
}))(ChatMessageInput);
