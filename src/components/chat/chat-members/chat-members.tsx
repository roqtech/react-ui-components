import "./chat-members.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  ReactNode,
  useCallback,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatUserInterface } from "src/types";
import { ChatMember } from "src";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-members";

export interface ChatMembersProps {
  children?: ReactNode;
  members: ChatUserInterface[];
  selectedIds: ChatUserInterface["id"][];
  onMemberSelect: (memberId) => void;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    inner?: string;
    top?: string;
    item?: string;
  };
  components?: {
    Container?: ComponentType<any>;
    Inner?: ComponentType<any>;
    Item?: ComponentType<any>;
  };
}

export const ChatMembers = (props: ChatMembersProps) => {
  const { style, className, classNames, components } = props;
  const { children, members, selectedIds = [], onMemberSelect } = props;

  const Container = components?.Container ?? "div";
  const Inner = components?.Inner ?? "div";
  const Item = components?.Item ?? ChatMember;

  const isSelected = useCallback(
    (memberId): boolean => selectedIds?.includes(memberId),
    [selectedIds]
  );

  const handleMemberClick = useCallback(
    (memberId) => () => {
      onMemberSelect?.(memberId);
    },
    [onMemberSelect]
  );

  const renderMemberItem = useCallback(
    (member: ChatUserInterface) => {
      return (
        <Item
          {...member}
          selected={isSelected(member.id)}
          memberId={member.id}
          className={clsx(classNames?.inner, _CLASS_IS + "__inner__item")}
          onClick={handleMemberClick(member.id)}
        />
      );
    },
    [Item, isSelected, handleMemberClick]
  );

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Inner className={clsx(classNames?.inner, _CLASS_IS + "__inner")}>
        {members?.map(renderMemberItem)}
        {children}
      </Inner>
    </Container>
  );
};
