import "./chat-sidebar.scss";

import clsx from "classnames";
import React, { ComponentType, CSSProperties, HTMLAttributes } from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatConversationList, Panel } from "src/index";
import { useRoqTranslation } from "src/components/core/roq-provider";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-sidebar";

export interface ChatSidebarPropsInterface {
  title?: string;
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
  const { title } = props;

  const Container = components?.Container ?? Panel;
  const Message = components?.Message ?? "h4";

  const Header = components?.Header ?? "div";
  const Top = components?.Top ?? "div";
  const Title = components?.Title ?? "h4";
  const ActionButton = components?.ActionButton ?? "div";
  const Search = components?.Search ?? "input";
  const List = components?.List ?? ChatConversationList;

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
          <ActionButton></ActionButton>
        </Top>
        <Search className={clsx(_CLASS_IS + "__header__search", classNames?.search)}/>
      </Header>
      <List className={clsx(_CLASS_IS + "__list", classNames?.list)} />
    </Container>
  );
};
