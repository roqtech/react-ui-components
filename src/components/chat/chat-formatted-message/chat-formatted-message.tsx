import "./chat-formatted-message.scss";

import clsx from "classnames";
import React, {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useMemo,
} from "react";

import {
  AvatarGroup,
  AvatarGroupProps,
} from "../../common/avatar-group/avatar-group";
import {
  StackedText,
  StackedTextProps,
} from "../../common/stacked-text/stacked-text";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { withChatState } from "../chat-provider";
import { ChatConversationInterface } from "src/interfaces";
import { ChatMessageProps } from "../chat-message";
import { ChatMessageBubbleProps } from "../chat-message-bubble";

import parser, {
  attributesToProps,
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
  Text,
} from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import { ChatMention, ChatLink } from "src/index";

const isElement = (domNode: DOMNode): domNode is Element => {
  const isTag = domNode.type === "tag";
  const hasAttributes = (domNode as Element).attribs !== undefined;

  return isTag && hasAttributes;
};

const isParagraph = (domNode: DOMNode): boolean => {
  if (!isElement(domNode)) {
    return false;
  }

  return domNode.tagName === "p";
};

const isMention = (domNode: DOMNode): boolean => {
  if (!isElement(domNode)) {
    return false;
  }

  const { attribs, children } = domNode;

  return (
    attribs.href &&
    attribs.href.indexOf("user:") > -1 &&
    children &&
    !!(children[0] as Text).data.match(/\@\[(([^\:]*):([^\]]*))]/g)
  );
};

const isLink = (domNode: DOMNode): boolean => {
  if (!isElement(domNode)) {
    return false;
  }

  return domNode.tagName === "a";
};

const extractMentionData = (el: Element): [id: string, name: string] => {
  const { children } = el;
  const text = (children[0] as Text).data;

  const groups = /\@\[(([^\:]*):([^\]]*))]/g.exec(text);

  const id = groups[2];
  const name = groups[3];

  return [id, name];
};

const formatParagraph = (
  el: Element,
  options?: HTMLReactParserOptions
): ReactElement => {
  const { ...props } = attributesToProps(el.attribs);
  const paragraphClass = clsx(props.class, "leading-6 min-h-6");

  return (
    <p {...props} className={paragraphClass}>
      {domToReact(el.children, options)}
    </p>
  );
};

const formatMention = (el: Element): ReactElement => {
  const [id, name] = extractMentionData(el);
  return <ChatMention userId={id} name={name} />;
};

const formatLink = (el: Element, ignoreClick?: boolean): ReactElement => (
  <ChatLink href={el.attribs.href} ignoreClick={ignoreClick} />
);

const defaultOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (isParagraph(domNode)) {
      return formatParagraph(domNode as Element, defaultOptions);
    }

    if (isMention(domNode)) {
      return formatMention(domNode as Element);
    }

    if (isLink(domNode)) {
      return formatLink(domNode as Element);
    }
  },
};

const previewOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (isParagraph(domNode)) {
      if ((domNode as Element).children.length > 0) {
        return false;
      }

      return formatParagraph(domNode as Element, previewOptions);
    }

    if (isMention(domNode)) {
      return formatMention(domNode as Element);
    }

    if (isLink(domNode)) {
      return formatLink(domNode as Element, true);
    }
  },
};

export const sanitize = (content: string): string =>
  sanitizeHtml(content, {
    allowedTags: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "p",
      "br",
      "img",
      "span",
      "strong",
      "sub",
    ],
    allowedSchemes: ["http", "https", "ftp", "mailto", "tel", "user"],
  });

export const formatContent = (content: string): ReactNode =>
  parser(sanitize(content), defaultOptions);

export const formatPreviewContent = (content: string): ReactNode =>
  parser(sanitize(content), previewOptions);

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-formatted-message";

export interface ChatFormattedMessagePropsInterface {
  content: string;
  preview?: boolean;
  style?: CSSProperties;
  className?: string;
  Component?: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
}

export const ChatFormattedMessage = (
  props: ChatFormattedMessagePropsInterface
) => {
  const { style, className, Component } = props;
  const { content, preview } = props;

  const Container = Component ?? "p";

  const format = useMemo(
    () => (preview ? formatPreviewContent : formatContent),
    [preview]
  );

  const message = useMemo(() => format(content), [content, format]);

  return (
    <Container className={clsx(_CLASS_IS, className)} style={style}>
      {message}
    </Container>
  );
};
