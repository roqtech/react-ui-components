import "./recipient.css";

import clsx from "classnames";
import React, { ReactElement } from "react";

import { CheckIcon as DefaultCheckIcon } from "./check-icon";

import { StackedText } from "../../common/stacked-text/stacked-text";
import { Avatar } from "../../common/avatar/avatar";

const _CLASS_IS = "roq-widget-" + "recipient";

interface RecipientProps {
  recipient: unknown;
  selected?: boolean;
  className?: string;
  classNames?: {
    container?: string;
    inner?: string;
    checkIcon?: string;
  };
  components?: {
    Container: ReactElement;
    Inner: ReactElement;
    CheckIcon: ReactElement;
  };
}

export const Recipient = (props: RecipientProps) => {
  const { recipient, selected, className, classNames, components } = props;

  const Container = components?.Container ?? "div";
  const Inner = components?.Inner ?? "div";
  const CheckIcon = components?.CheckIcon ?? DefaultCheckIcon;

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container, {
        [_CLASS_IS + "_selected"]: selected,
      })}
    >
      <Inner className={clsx(_CLASS_IS + "__inner", classNames?.message)}>
        <Avatar size="large" {...recipient} />
        <StackedText
          text={recipient?.name}
          className={clsx(_CLASS_IS + "__inner__name")}
        />
      </Inner>
      {selected && <CheckIcon />}
    </Container>
  );
};
