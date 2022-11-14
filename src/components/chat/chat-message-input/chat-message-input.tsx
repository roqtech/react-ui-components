import "./chat-message-input.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ReactNode,
  ComponentType,
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
  useLayoutEffect,
  HTMLAttributes,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { SendIcon as DefaultSendIcon } from "./send-icon";
import { AttachmentIcon as DefaultAttachmentIcon } from "./attachment-icon";
import { withChatApi, withChatState } from "../chat-provider";
import { ChatSendMessageRequestPayloadInterface } from "src/interfaces";
import { ChatMessageEditor } from "../chat-message-editor";
import { isEmpty } from "lodash";
import { useRoqTranslation } from "src/components/core/roq-provider";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message-input";

export interface ChatMessageInputPropsInterface {
  textareaRef?: any;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  hideSendButton?: boolean;
  sendLabel?: string;
  hideAttachmentButton?: boolean;
  attachmentLabelabel?: string;
  onChange?: (value: string) => void;
  onFocus: () => void;
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
    Container: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "style" | "className" | "children">
    >;
    Textarea: ComponentType<any>;
    SendButton: ComponentType<any>;
    SendLabel: ComponentType<any>;
    SendIcon: ComponentType<any>;
    AttachmentButton: ComponentType<any>;
    AttachmentLabel: ComponentType<any>;
    AttachmentIcon: ComponentType<any>;
  };
}

const ChatMessageInput = (props: ChatMessageInputPropsInterface) => {
  const { t } = useRoqTranslation();
  const {
    textareaRef,
    value,
    defaultValue = "<p></p>",
    placeholder,
    hideSendButton = false,
    sendLabel,
    hideAttachmentButton = false,
    attachmentLabel,
    onChange,
    onFocus,
    onBeforeSend = (p) => p,
    onSend = (p) => {},
  } = props;
  const { style, className, classNames, components } = props;

  const Container = components?.Container ?? "form";
  const Textarea = components?.Textarea ?? ChatMessageEditor;
  const SendButton = components?.SendButton ?? "button";
  const SendLabel = components?.SendLabel ?? "span";
  const SendIcon = components?.SendIcon ?? DefaultSendIcon;
  const AttachmentButton = components?.AttachmentButton ?? "button";
  const AttachmentLabel = components?.AttachmentLabel ?? "span";
  const AttachmentIcon = components?.AttachmentIcon ?? DefaultAttachmentIcon;

  const [textareaValue, setValue] = useState<string | null>(
    value ?? defaultValue
  );

  const focusTextarea = useCallback(() => {
    window.requestAnimationFrame(() => {
      if (!textareaRef?.current) {
        return;
      }

      textareaRef.current.focus();
      onFocus?.();
    });
  }, [textareaRef, onFocus]);

  const isValueEmpty = useMemo(() => {
    return isEmpty(textareaValue) || textareaValue === defaultValue;
  }, [textareaValue, defaultValue]);

  useEffect(
    function handleValueChanged() {
      setValue(value);
      focusTextarea();
    },
    [value, focusTextarea]
  );

  const reset = useCallback(() => {
    setValue(defaultValue);
  }, [setValue]);

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
      {!hideAttachmentButton && (
        <AttachmentButton
          className={clsx(
            _CLASS_IS + "__attachment-button",
            classNames?.attachmentButton,
            {
              [_CLASS_IS + "__attachment-button" + "--disabled"]: isValueEmpty,
            }
          )}
          disabled={isValueEmpty}
        >
          {attachmentLabel && (
            <AttachmentLabel
              className={clsx(_CLASS_IS + "__attachment-button__label")}
            >
              {attachmentLabel}
            </AttachmentLabel>
          )}
          <AttachmentIcon
            className={clsx(_CLASS_IS + "__attachment-button__icon")}
          />
        </AttachmentButton>
      )}
      <Textarea
        ref={textareaRef}
        name="message"
        value={textareaValue ?? ""}
        className={clsx(_CLASS_IS + "__textarea", classNames?.textarea)}
        placeholder={placeholder ?? t("chat.message-input.placeholder")}
        onChange={handleTextareaChange}
        onEnter={handleTextareaEnter}
      />
      {!hideSendButton && (
        <SendButton
          className={clsx(_CLASS_IS + "__send-button", classNames?.sendButton, {
            [_CLASS_IS + "__send-button" + "--disabled"]: isValueEmpty,
          })}
          disabled={isValueEmpty}
        >
          {sendLabel && (
            <SendLabel className={clsx(_CLASS_IS + "__send-button__label")}>
              {sendLabel}
            </SendLabel>
          )}
          <SendIcon className={clsx(_CLASS_IS + "__send-button__icon")} />
        </SendButton>
      )}
    </Container>
  );
};

export default withChatState<
  Omit<ChatMessageInputPropsInterface, "onSend">,
  "value",
  "edit"
>(({ messages: { editableId }, editableMessage }) => ({
  value: editableId ? editableMessage?.body : undefined,
  edit: !!editableId,
}))(
  withChatApi<Omit<ChatMessageInputPropsInterface, "value" | "edit">, "onSend">(
    ({ sendMessage, editMessage }, { edit }) => ({
      onSend: edit ? editMessage : sendMessage,
    })
  )(ChatMessageInput)
);
