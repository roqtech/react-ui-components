import "./chat-member.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  useCallback,
  useMemo,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatUserInterface } from "src/types";
import { CheckedIcon as DefaultCheckedIcon } from "./checked-icon";
import { Avatar, AvatarProps } from "src/components/common/avatar";
import { StackedText } from "src/components/common";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-member";

export interface ChatMemberProps extends Omit<ChatUserInterface, "id"> {
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
    Container?: ComponentType<any>;
    Inner?: ComponentType<any>;
    Avatar?: ComponentType<AvatarProps>;
    Content?: ComponentType<any>;
    Name?: ComponentType<AvatarProps>;
    Actions?: ComponentType<any>;
    CheckedIcon?: ComponentType<any>;
  };
}

export const ChatMember = (props: ChatMemberProps) => {
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
