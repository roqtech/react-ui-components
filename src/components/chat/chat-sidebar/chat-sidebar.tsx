import "./chat-sidebar.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  useMemo,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatConversationList, Panel } from "src/index";
import { useRoqTranslation } from "src/components/core/roq-provider";
import { CreateConversationIcon as DefaultCreateConversationIcon } from "../chat-sidebar/create-conversation-icon";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-sidebar";

export interface ChatSidebarPropsInterface {
  title?: string;
  buttonLabel?: string;
  onActionClick?: () => void;
  showSearch?: boolean;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    message?: string;
  };
  components?: {
    Container: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "style" | "className" | "children">
    >;
    Message: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
  };
}

export const ChatSidebar = (props: ChatSidebarPropsInterface) => {
  const { t } = useRoqTranslation();
  const { style, className, classNames, components } = props;
  const { title, buttonLabel, onActionClick, showSearch } = props;

  const Container = components?.Container ?? Panel;
  const Message = components?.Message ?? "h4";

  const Header = components?.Header ?? "div";
  const Top = components?.Top ?? "div";
  const Title = components?.Title ?? "h4";

  const ActionButton = components?.Button ?? "button";
  const ActionButtonButtonLabel = components?.ButtonLabel ?? "span";
  const ActionButtonButtonIcon =
    components?.ButtonIcon ?? DefaultCreateConversationIcon;

  const Search = components?.Search ?? "input";
  const List = components?.List ?? ChatConversationList;

  const actionButtonLabel = useMemo(() => {
    const translation = t("chat.sidebar.action");

    return buttonLabel ?? translation === "chat.sidebar.action"
      ? false
      : translation;
  }, [buttonLabel, t]);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Header className={clsx(_CLASS_IS + "__header", classNames?.header)}>
        <Top className={clsx(_CLASS_IS + "__header__top", classNames?.top)}>
          <Title
            className={clsx(
              _CLASS_IS + "__header__top__title",
              classNames?.title
            )}
          >
            {title ?? t("chat.sidebar.title")}
          </Title>
          <ActionButton
            className={clsx(
              _CLASS_IS + "__header__top__action",
              classNames?.action
            )}
            onClick={onActionClick}
          >
            <ActionButtonButtonIcon
              className={clsx(
                _CLASS_IS + "__header__top__action__icon",
                classNames?.actionIcon
              )}
            />
            {actionButtonLabel && (
              <ActionButtonButtonLabel
                className={clsx(
                  _CLASS_IS + "__header__top__action__label",
                  classNames?.actionLabel
                )}
              >
                {actionButtonLabel}
              </ActionButtonButtonLabel>
            )}
          </ActionButton>
        </Top>
        {showSearch && (
          <Search
            className={clsx(_CLASS_IS + "__header__search", classNames?.search)}
          />
        )}
      </Header>
      <List className={clsx(_CLASS_IS + "__list", classNames?.list)} />
    </Container>
  );
};
