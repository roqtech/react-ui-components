import "./chat-members-panel.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  ReactNode,
  useCallback,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatMemberList, ChatMembers, ChatPanel } from "src/index";
import { ChatMembersProps } from "../chat-members/chat-members";
import { ChatUserInterface } from "src/types";
import { withChatState } from "../chat-provider";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-members-panel";

export interface ChatMembersPanelProps
  extends Pick<ChatMembersProps, "selectedIds"> {
  titleLabel?: string;
  cancelLabel?: string;
  submitLabel?: string;

  onCancel?: () => void;
  onSubmit?: (ids: ChatUserInterface["id"][]) => void;

  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    header?: string;
    title?: string;
    list?: string;
    actions?: string;
    cancelButton?: string;
    submitButton?: string;
  };
  components?: {
    Container: ComponentType<any>;
    Header: ComponentType<any>;
    Title: ComponentType<any>;
    List: ComponentType<any>;
    Actions: ComponentType<any>;
    CancelButton: ComponentType<any>;
    CancelButtonLabel: ComponentType<any>;
    SubmitButton: ComponentType<any>;
    SubmitButtonLabel: ComponentType<any>;
  };
}

const ChatMembersPanel = (props: ChatMembersPanelProps) => {
  const { style, className, classNames, components } = props;
  const {
    titleLabel = "With whom would you like to start a conversation?",
    cancelLabel = "Cancel",
    submitLabel = "Submit",
    selectedIds,
    onCancel,
    onSubmit,
  } = props;

  const Container = components?.Container ?? ChatPanel;
  const Header = components?.Header ?? "div";
  const Title = components?.Title ?? "h4";
  const List = components?.List ?? ChatMemberList;
  const Actions = components?.Actions ?? "div";
  const CancelButton = components?.CancelButton ?? "button";
  const CancelButtonLabel = components?.CancelButtonLabel ?? "span";
  const SubmitButton = components?.SubmitButton ?? "button";
  const SubmitButtonLabel = components?.SubmitButtonLabel ?? "span";

  const handleMemberSelect = useCallback(() => {}, []);

  const handleCancelClick = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  const handleSubmitClick = useCallback(() => {
    onSubmit?.(selectedIds ?? []);
  }, [onSubmit, selectedIds]);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Header className={clsx(_CLASS_IS + "__header", classNames?.header)}>
        <Title
          className={clsx(_CLASS_IS + "__header__title", classNames?.header)}
        >
          {titleLabel}
        </Title>
      </Header>
      <List className={clsx(_CLASS_IS + "__list", classNames?.list)} />
      <Actions className={clsx(_CLASS_IS + "__actions", classNames?.list)}>
        <CancelButton
          className={clsx(_CLASS_IS + "__actions__cancel", classNames?.list)}
          onClick={handleCancelClick}
        >
          <CancelButtonLabel
            className={clsx(
              _CLASS_IS + "__actions__cancel__label",
              classNames?.list
            )}
          >
            {cancelLabel}
          </CancelButtonLabel>
        </CancelButton>
        <SubmitButton
          className={clsx(_CLASS_IS + "__actions__submit", classNames?.list)}
          onClick={handleSubmitClick}
        >
          <CancelButtonLabel
            className={clsx(
              _CLASS_IS + "__actions__submit__label",
              classNames?.list
            )}
          >
            {submitLabel}
          </CancelButtonLabel>
        </SubmitButton>
      </Actions>
    </Container>
  );
};

export default withChatState(({ recipients: { selectedIds } = {} }) => ({
  selectedIds,
}))(ChatMembersPanel);
