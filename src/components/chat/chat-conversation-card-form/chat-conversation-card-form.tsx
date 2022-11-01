import "./chat-conversation-card-form.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  useCallback,
  useMemo,
  KeyboardEventHandler,
  MouseEventHandler,
  useState,
  useRef,
  useEffect,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatConversationInterface, ChatUserInterface } from "src/types";
import { Avatar, AvatarProps } from "src/components/common/avatar";
import { StackedText } from "src/components/common";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-conversation-card-form";

export interface ChatConversatonCardFormPropsInterface {
  title?: string;
  initialValues: ChatConversationInterface;
  onCancel: () => void;
  onSubmit: (values: Partial<ChatConversationInterface>) => void;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    title?: string;
    input?: string;
  };
  components?: {
    Container?: ComponentType<any>;
    Title?: ComponentType<any>;
    Input?: ComponentType<any>;
  };
}

export const ChatConversationCardForm = (
  props: ChatConversatonCardFormPropsInterface
) => {
  const { style, className, classNames, components } = props;
  const { title = "Rename Group", initialValues, onCancel, onSubmit } = props;

  const [values, setValues] = useState(initialValues);
  const inputRef = useRef<HTMLInputElement>();

  const Container = components?.Container ?? "form";
  const Title = components?.Title ?? "h4";
  const Input = components?.Input ?? "input";

  useEffect(
    function handleInitialValuesChanged() {
      focusInput();
    },
    [initialValues]
  );

  const focusInput = useCallback(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  const handleCancel = useCallback(() => onCancel?.(), [onCancel]);

  const handleSubmit = useCallback(
    () => onSubmit?.(values),
    [onSubmit, values]
  );

  const handleMouseDown: MouseEventHandler<HTMLFormElement> = (event) => {
    event.stopPropagation();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      console.dir(event.key);

      if (event.key === "Escape") {
        event.preventDefault();

        return handleCancel();
      }

      if (event.key === "Enter") {
        event.preventDefault();

        return handleSubmit();
      }
    },
    [handleCancel, handleSubmit]
  );

  const handleInputChange = useCallback(
    (e) => {
      const {
        target: { value },
      } = e;

      setValues((ps) => ({
        ...ps,
        title: value,
      }));
    },
    [setValues]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
      onMouseDown={handleMouseDown}
    >
      <Title className={clsx(_CLASS_IS + "__title", classNames?.title)}>
        {title}
      </Title>
      <Input
        ref={inputRef}
        className={clsx(_CLASS_IS + "__input", classNames?.input)}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        defaultValue={values?.title}
      />
    </Container>
  );
};
