import "./message-center.scss";

import clsx from "classnames";
import React, { ComponentType, CSSProperties, ReactNode, useCallback } from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { Chat, ChatConversationList, ChatPanel } from "src/index";
import { CreateConversationIcon as DefaultCreateConversationIcon } from "./create-conversation-icon";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "message-center";

export interface MessageCenterProps {
  title?: string;
  buttonLabel?: string;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    header?: string;
    title?: string;
    button?: string;
    buttonLabel?: string;
    buttonIcon?: string;
    content?: string;
    sidebar?: string;
    panel?: string;
  };
  components?: {
    Container: ComponentType<any>;
    Header: ComponentType<any>;
    Title: ComponentType<any>;
    Button: ComponentType<any>;
    ButtonLabel: ComponentType<any>;
    ButtonIcon: ComponentType<any>;
    Content: ComponentType<any>;
    Sidebar: ComponentType<any>;
    Panel: ComponentType<any>;
  };
}

export const MessageCenter = (props: MessageCenterProps) => {
  const { style, className, classNames, components } = props;
  const { title = "Message Center", buttonLabel = "CREATE NEW CHAT" } = props;

  const Container = components?.Container ?? "div";
  const Header = components?.Header || "div";
  const Title = components?.Title || "h4";
  const Button = components?.Button ?? "button";
  const ButtonLabel = components?.ButtonLabel ?? "span";
  const ButtonIcon = components?.ButtonIcon ?? DefaultCreateConversationIcon;
  const Content = components?.Content || "div";

  const Sidebar = components?.Sidebar ?? ChatConversationList;
  const Panel = components?.Panel ?? Chat;


  const handleActionButtonClick = useCallback(() => {
    alert('in development :)')
  }, [])

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Header className={clsx(_CLASS_IS + "__header", classNames?.header)}>
        <Title
          className={clsx(_CLASS_IS + "__header__title", classNames?.title)}
        >
          {title}
        </Title>
        <Button
          className={clsx(_CLASS_IS + "__header__button", classNames?.button)}
          onClick={handleActionButtonClick}
        >
          <ButtonIcon className={clsx(_CLASS_IS + "__header__button__icon")} />
          {buttonLabel && (
            <ButtonLabel
              className={clsx(_CLASS_IS + "__header__button__label")}
            >
              {buttonLabel}
            </ButtonLabel>
          )}
        </Button>
      </Header>
      <Content className={clsx(_CLASS_IS + "__content", classNames?.content)}>
        <Sidebar
          className={clsx(
            _CLASS_IS + "__content__sidebar",
            classNames?.sidebar
          )}
        />
        <Panel
          className={clsx(_CLASS_IS + "__content__panel", classNames?.panel)}
        />
      </Content>
    </Container>
  );
};
