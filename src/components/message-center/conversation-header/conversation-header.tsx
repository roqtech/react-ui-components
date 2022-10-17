import './conversation-header.css';

import clsx from 'classnames';
import React, { Element, useMemo } from 'react';

import { AvatarGroup } from '../../common/avatar-group/avatar-group';
import { StackedText } from '../../common/stacked-text/stacked-text';

const _CLASS_IS = 'roq-widget-' + 'conversation-header';

interface ConversationHeaderProps {
  title: string;
  members: any[];
  className?: string;
  classNames?: {
    container?: string;
    message?: string;
  };
  components?: {
    container: Element;
    message: Element;
  };
}

const formatGroupMembers = (
  members: MessageCenterConversationMemberInterface[],
  ownerId: string,
  ownerLabel: string,
  membersLabel: string,
): ReactNode => (
  <>
    <span>
      {members.length} {membersLabel}:{' '}
    </span>
    {members.map((member, index) => (
      <span key={index}>
        <span>
          {formatOnlineStatus(member)}
          {member.id === ownerId && `(${ownerLabel})`}
        </span>
        {index !== members.length - 1 && <span>{`, `}</span>}
      </span>
    ))}
  </>
);

export const ConversationHeader = (props: ConversationHeaderProps) => {
  const { title, members, className, classNames, components = { container: 'div', message: 'p' } } = props;

  const Container = components.container;
  const Message = components.message;

  const membersLine = useMemo(() => {
    return `${members.length - 1} members: ` + members.map(({ name }) => name).join(', ');
  }, [members]);

  return (
    <Container className={clsx(_CLASS_IS, className, classNames?.container)}>
      <AvatarGroup data={members} maxCount={3} size="large" />
      <StackedText primaryText={title} secondaryText={membersLine} className={clsx(_CLASS_IS + '__title')} />
    </Container>
  );
};
