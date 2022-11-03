import "./chat-members.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  ReactNode,
  useCallback,
  HTMLAttributes,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { ChatUserInterface } from "src/interfaces";
import { ChatMember } from "src";
import { ChatMemberPropsInterface } from "../chat-member/chat-member";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-members";

export interface ChatMembersPropsInterface {
  children?: ReactNode;
  members: ChatUserInterface[];
  selectedIds?: string[];
  getMemberId?: (member: ChatUserInterface) => string;
  onMemberSelect?: (memberId: string) => void;
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    inner?: string;
    top?: string;
    item?: string;
  };
  components?: {
    Container?: ComponentType<HTMLAttributes<HTMLElement>>;
    Inner?: ComponentType<HTMLAttributes<HTMLElement>>;
    Item?: ComponentType<ChatMemberPropsInterface>;
  };
}

const getMemberRoqIdentifier = (member: ChatUserInterface): string =>
  member.roqIdentifier;

export const ChatMembers = (props: ChatMembersPropsInterface) => {
  const { style, className, classNames, components } = props;
  const {
    children,
    members,
    selectedIds = [],
    getMemberId = getMemberRoqIdentifier,
    onMemberSelect,
  } = props;

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
      const id = getMemberId(member);

      return (
        <Item
          key={id}
          {...member}
          selected={isSelected(id)}
          memberId={id}
          className={clsx(classNames?.inner, _CLASS_IS + "__inner__item")}
          onClick={handleMemberClick(id)}
        />
      );
    },
    [Item, isSelected, handleMemberClick, getMemberId]
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
