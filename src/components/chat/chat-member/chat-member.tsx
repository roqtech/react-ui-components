import "./chat-member.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  useCallback,
  useMemo,
  ReactElement,
  HTMLAttributes,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatUserInterface } from "src/interfaces";
import { CheckedIcon as DefaultCheckedIcon } from "./checked-icon";
import { Avatar, AvatarPropsInterface } from "src/components/common/avatar";
import { StackedText } from "src/components/common";
import { StackedTextPropsInterface } from "src/components/common/stacked-text";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-member";

export interface ChatMemberPropsInterface
  extends Omit<ChatUserInterface, "id"> {
  memberId: ChatUserInterface["id"];
  selected?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    inner?: string;
    avatar?: string;
    content?: string;
    name?: string;
    actions?: string;
    checkedIcon?: string;
  };
  components?: {
    Container?: ComponentType<HTMLAttributes<HTMLElement>>;
    Inner?: ComponentType<HTMLAttributes<HTMLElement>>;
    Avatar?: ComponentType<AvatarPropsInterface>;
    Content?: ComponentType<HTMLAttributes<HTMLElement>>;
    Name?: ComponentType<StackedTextPropsInterface>;
    Actions?: ComponentType<HTMLAttributes<HTMLElement>>;
    CheckedIcon?: ComponentType<HTMLAttributes<HTMLElement>>;
  };
}

export const ChatMember = (props: ChatMemberPropsInterface) => {
  const { style, className, classNames, components } = props;
  const { selected, onClick, memberId, avatar, fullName, initials } = props;

  const user = useMemo(
    () => ({
      id: memberId,
      avatar,
      fullName,
      initials,
    }),
    [memberId, avatar, fullName, initials]
  );

  const Container = components?.Container ?? "div";
  const AvatarComponent = components?.Avatar ?? Avatar;
  const Content = components?.Content ?? "span";
  const Name = components?.Name ?? StackedText;
  const Actions = components?.Actions ?? "div";
  const CheckedIcon = components?.CheckedIcon ?? DefaultCheckedIcon;

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "--selected"]: selected,
      })}
      style={style}
      onClick={onClick}
    >
      <AvatarComponent
        className={clsx(_CLASS_IS + "__avatar", classNames?.avatar)}
        size="large"
        {...user}
      />
      <Content className={clsx(_CLASS_IS + "__content", classNames?.content)}>
        <Name className={clsx(_CLASS_IS + "__content__name", classNames?.name)}>
          {fullName}
        </Name>
      </Content>
      {selected && (
        <Actions className={clsx(_CLASS_IS + "__actions", classNames?.actions)}>
          <CheckedIcon
            className={clsx(
              _CLASS_IS + "__actions__icon",
              classNames?.checkedIcon
            )}
          />
        </Actions>
      )}
    </Container>
  );
};
