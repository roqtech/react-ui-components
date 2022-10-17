import './create-conversation-button.css';

import clsx from 'classnames';
import React, { Element } from 'react';

import { AvatarGroup } from '../../common/avatar-group/avatar-group';
import { StackedText } from '../../common/stacked-text/stacked-text';

const _CLASS_IS = 'roq-widget-' + 'conversation-card';

interface CreateConversationButtonProps {
  className?: string;
  classNames?: {
    button?: string;
  };
  components?: {
    button: Element;
  };
}

export const CreateConversationButton = (props: CreateConversationButtonProps) => {
  const { children, className, classNames, components } = props;

  const Button = components?.button ?? 'button';

  return <Button className={clsx(_CLASS_IS, className, classNames?.button)}>{children}</Button>;
};
