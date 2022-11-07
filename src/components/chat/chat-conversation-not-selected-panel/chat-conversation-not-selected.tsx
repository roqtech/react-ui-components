import "./chat-conversation-not-selected-panel.scss";

import clsx from "classnames";
import React, { ComponentType, CSSProperties, HTMLAttributes } from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { Panel } from "src/index";
import { useRoqTranslation } from "src/components/core/roq-provider";

const _CLASS_IS =
  COMPONENT_CLASS_PREFIX + "chat-conversation-not-selected-panel";

export interface ChatConversationNotSelectedPanelPropsInterface {
  message?: string;
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

export const ChatConversationNotSelectedPanel = (
  props: ChatConversationNotSelectedPanelPropsInterface
) => {
  const { t } = useRoqTranslation();
  const { style, className, classNames, components } = props;
  const { message } = props;

  const Container = components?.Container ?? Panel;
  const Message = components?.Message ?? "h4";

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Message className={clsx(_CLASS_IS + "__message", classNames?.message)}>
        {message ?? t("chat.panel.conversation-not-selected")}
      </Message>
    </Container>
  );
};
