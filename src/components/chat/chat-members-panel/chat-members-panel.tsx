import "./chat-members-panel.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatMemberList, ChatMembers, ChatPanel } from "src/index";
import { ChatUserInterface } from "src/interfaces";
import { withChatApi, withChatState } from "../chat-provider";
import { ChatFetchRecipientsVariablesInterface } from "src/interfaces/chat.interface";
import { ChatMemberListPropsInterface } from "../chat-member-list";
import { ChatPanelPropsInterface } from "../chat-panel";
import { ChatMembersPropsInterface } from "../chat-members/chat-members";
import { useRoqTranslation } from "src/components/core/roq-provider";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-members-panel";

export interface ChatMembersPanelPropsInterface
  extends Pick<ChatMembersPropsInterface, "selectedIds"> {
  titleLabel?: string;
  cancelLabel?: string;
  submitLabel?: string;

  onCancel?: () => void;
  onSubmit?: (ids: ChatUserInterface["id"][]) => void;
  onInitialize: ({
    initialSelectedIds,
    initialFilter,
  }: {
    initialSelectedIds: string[];
    initialFilter: Pick<
      ChatFetchRecipientsVariablesInterface,
      "filter" | "ids" | "excludeIds" | "includeIds"
    >;
  }) => void;

  initialSelectedIds: string[];
  initialFilter: Pick<
    ChatFetchRecipientsVariablesInterface,
    "filter" | "ids" | "excludeIds" | "includeIds"
  >;

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
    Container?: ComponentType<
      Pick<ChatPanelPropsInterface, "className" | "style" | "children">
    >;
    Header?: ComponentType<HTMLAttributes<HTMLElement>>;
    Title?: ComponentType<HTMLAttributes<HTMLElement>>;
    List?: ComponentType<
      Pick<ChatMemberListPropsInterface, "className" | "selectedIds">
    >;
    Actions?: ComponentType<HTMLAttributes<HTMLElement>>;
    CancelButton?: ComponentType<HTMLAttributes<HTMLButtonElement>>;
    CancelButtonLabel?: ComponentType<HTMLAttributes<HTMLElement>>;
    SubmitButton?: ComponentType<HTMLAttributes<HTMLButtonElement>>;
    SubmitButtonLabel?: ComponentType<HTMLAttributes<HTMLElement>>;
  };
}

const ChatMembersPanel = (props: ChatMembersPanelPropsInterface) => {
  const { t } = useRoqTranslation();
  const { style, className, classNames, components } = props;
  const {
    titleLabel,
    cancelLabel,
    submitLabel,
    selectedIds,
    initialSelectedIds,
    initialFilter,
    onCancel,
    onSubmit,
    onInitialize,
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

  useEffect(
    function handleInitialValuesChanged() {
      if (!initialSelectedIds && !initialFilter) {
        return;
      }

      onInitialize?.({
        initialSelectedIds,
        initialFilter,
      });
    },
    [
      initialFilter?.filter,
      initialFilter?.ids,
      initialFilter?.excludeIds,
      initialFilter?.includeIds,
    ]
  );

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
          {titleLabel ?? t('chat.panel.members.title')}
        </Title>
      </Header>
      <List
        className={clsx(_CLASS_IS + "__list", classNames?.list)}
        selectedIds={selectedIds}
      />
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
            {cancelLabel ?? t('chat.panel.members.cancel')}
          </CancelButtonLabel>
        </CancelButton>
        <SubmitButton
          className={clsx(_CLASS_IS + "__actions__submit", classNames?.list)}
          onClick={handleSubmitClick}
        >
          <SubmitButtonLabel
            className={clsx(
              _CLASS_IS + "__actions__submit__label",
              classNames?.list
            )}
          >
            {submitLabel ?? t('chat.panel.members.submit')}
          </SubmitButtonLabel>
        </SubmitButton>
      </Actions>
    </Container>
  );
};

export default withChatState<ChatMembersPanelPropsInterface>(
  ({ recipients: { selectedIds } = {} }) => ({
    selectedIds,
  })
)(
  withChatApi<ChatMembersPanelPropsInterface>(
    ({
      resetRecipientList,
      setSelectedRecipients,
      setRecipientListFilter,
    }) => ({
      onInitialize: ({ initialSelectedIds, initialFilter }) => {
        resetRecipientList();

        if (initialSelectedIds) {
          setSelectedRecipients(initialSelectedIds);
        }

        if (initialFilter) {
          setRecipientListFilter(initialFilter);
        }
      },
    })
  )(ChatMembersPanel)
);
