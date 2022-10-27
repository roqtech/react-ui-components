import "./chat-message-editor.scss";
import "draft-js/dist/Draft.css";

import Editor, { PluginEditorProps } from "@draft-js-plugins/editor";
import {
  convertFromHTML,
  convertToHTML,
  IConvertFromHTMLConfig,
  IConvertToHTMLConfig,
} from "draft-convert";
import {
  ContentState,
  DraftHandleValue,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  Modifier,
  SelectionState,
} from "draft-js";
import _noop from "lodash/fp/noop";
import createMentionPlugin, { MentionData } from "@draft-js-plugins/mention";
import { EditorPlugin } from "@draft-js-plugins/editor";

import clsx from "classnames";
import React, {
  CSSProperties,
  ReactNode,
  ComponentType,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useState,
} from "react";
import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import createLinkDetectionPlugin from "draft-js-link-detection-plugin";
import { ChatUserInterface } from "src/types";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "chat-message-editor";

export interface ChatMessageEditorProps {
  // children?: ReactNode;
  // rounded?: boolean;
  // rows?: number;
  id?: string;
  name?: string;
  max?: number;
  value?: string;
  placeholder?: string;
  // placeholder?: string;
  // className?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  convertToHTMLConfig?: IConvertToHTMLConfig;
  convertFromHTMLConfig?: IConvertFromHTMLConfig;
  //
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    textarea?: string;
  };
  components?: {
    Container: ComponentType<any>;
  };
}

const formatUserLink = (id: string) => `user:${id}`;

const formatRecipientToSuggestion = (
  recipient: ChatUserInterface
): ChatUserInterface & MentionData => ({
  ...recipient,
  name: recipient.fullName,
  link: formatUserLink(recipient.id),
});

const positionSuggestions = ({ decoratorRect }): CSSProperties => {
  const top = decoratorRect.top;
  const left = decoratorRect.left;

  return {
    left: left + "px",
    top: top + "px",
    display: "block",
    position: "fixed",
    transform: "scale(1) translateY(-100%)",
    transformOrigin: "1em 0% 0px",
    transition: "all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1)",
  };
};

const defaultConvertToHTMLConfig: IConvertToHTMLConfig = {
  entityToHTML: (entity, originalText) => {
    if (entity.type === "mention") {
      return (
        <a href={entity.data.mention.link}>
          @[{entity.data.mention.id}:{entity.data.mention.name}]
        </a>
      );
    }

    if (entity.type === "LINK") {
      return (
        <a
          href={entity.data.url}
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          {entity.data.url}
        </a>
      );
    }

    return originalText;
  },
};

const defaultConvertFromHTMLConfig: IConvertFromHTMLConfig = {
  textToEntity: (text, createEntity) => {
    const result = [];
    text.replace(/\@\[(([^\:]*):([^\]]*))]/g, (match, userLink, offset) => {
      const [id, name] = userLink.split(":");

      const entityKey = createEntity("mention", "IMMUTABLE", {
        mention: {
          id,
          name,
          link: formatUserLink(id),
          avatar: "",
        },
      });

      result.push({
        entity: entityKey,
        offset,
        length: match.length,
        result: `@${name}`,
      });

      return "";
    });

    return result;
  },
};

export const ChatMessageEditor = (props: ChatMessageEditorProps) => {
  const { style, className, classNames, components } = props;
  const {
    id = "textarea",
    name,
    max = 1000,
    value = "<p></p>",
    placeholder,
    onChange,
    onEnter,
    convertToHTMLConfig = defaultConvertToHTMLConfig,
    convertFromHTMLConfig = defaultConvertFromHTMLConfig,
    ...rest
  } = props;

  const Container = components?.Container ?? "div";

  const [rawValue, setRawValue] = useState(value ?? "<p></p>");
  const textareaRef = useRef<Editor>(null);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(convertFromHTML(convertFromHTMLConfig)(value))
  );

  const [open, setOpen] = useState(true);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const linkifyPlugin = createLinkDetectionPlugin();

    const mentionPlugin = createMentionPlugin({
      entityMutability: "IMMUTABLE",
      mentionPrefix: "@",
      supportWhitespace: true,
      positionSuggestions,
      // mentionComponent: TextareaMentionPartial,
    });

    return {
      plugins: [] as EditorPlugin[],
      MentionSuggestions: mentionPlugin.MentionSuggestions,
    };
  }, []);

  useEffect(() => {
    const needUpdate = value !== rawValue;

    if (needUpdate) {
      const nextContentState = convertFromHTML(convertFromHTMLConfig)(value);
      let nextEditorState = EditorState.push(
        editorState,
        nextContentState,
        "apply-entity"
      );
      nextEditorState = EditorState.moveFocusToEnd(nextEditorState);
      setEditorState(nextEditorState);
      setRawValue(value);
    }
  }, [value]);

  const getRawValue = (stateToConvert?: EditorState): string =>
    convertToHTML(convertToHTMLConfig)(stateToConvert?.getCurrentContent());

  const handleEditorClick = () => textareaRef.current?.focus();

  const handleChange = (nextState: EditorState) => {
    setEditorState(nextState);
    const nextRawValue = getRawValue(nextState);
    if (rawValue !== nextRawValue) {
      setRawValue(nextRawValue);
      onChange(nextRawValue);
    }
  };

  const keyBindingFn = (e) => {
    const hasCommandKeys =
      KeyBindingUtil.isCtrlKeyCommand(e) ||
      KeyBindingUtil.isOptionKeyCommand(e) ||
      KeyBindingUtil.hasCommandModifier(e) ||
      e.nativeEvent.shiftKey;

    if (!hasCommandKeys && e.key === "Enter") {
      return "submit";
    }

    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = useCallback(
    (command) => {
      if (command === "submit") {
        onEnter?.();
        return "handled";
      }
      return "not-handled";
    },
    [onEnter]
  );

  const handleBeforeInput = (
    chars: string,
    latestEditorState: EditorState
  ): DraftHandleValue => {
    // if the user is selecting the whole message from the editor,
    // then type something to replace it, then it let happen
    if (!latestEditorState.getSelection().isCollapsed()) {
      return "not-handled";
    }

    return latestEditorState.getCurrentContent().getPlainText().length === max
      ? "handled"
      : "not-handled";
  };

  /**
   * On Chrome and Safari, calling focus on contenteditable focuses the
   * cursor at the first character. Use this helper to move that cursor.
   */
  const moveSelectionTo = (
    es: EditorState,
    focusOffset: number
  ): EditorState => {
    const blockSelection = SelectionState.createEmpty(
      es.getSelection().getAnchorKey()
    ).merge({
      anchorOffset: focusOffset,
      focusOffset,
    });

    return EditorState.forceSelection(es, blockSelection);
  };

  const handlePastedText = (
    pastedText: string,
    html,
    latestEditorState: EditorState
  ): DraftHandleValue => {
    const currentContent = latestEditorState.getCurrentContent();
    const currentContentLength = currentContent.getPlainText().length;
    const currentSelection = latestEditorState.getSelection();
    const selectedAnchorOffset = currentSelection.getAnchorOffset();
    const selectedFocusOffset = currentSelection.getFocusOffset();
    const pastedTextLength = pastedText.length;

    const isTextPastedOverSelectedWords =
      currentContent.hasText() &&
      pastedTextLength + currentContentLength >= max;

    const isTextPastedOnEmptyEditor =
      !currentContent.hasText() && pastedTextLength >= max;

    const blockSelection = SelectionState.createEmpty(
      currentSelection.getAnchorKey()
    ).merge({
      anchorOffset: selectedAnchorOffset,
      focusOffset: selectedFocusOffset,
    });

    // to handle scenario where the users pasted text into selected text non-empty chat box
    if (isTextPastedOverSelectedWords) {
      return onReplaceSelectedText(
        currentContent,
        pastedText,
        latestEditorState,
        blockSelection
      );
    }

    // to handle scenario where the users pasted text into empty chat box
    if (isTextPastedOnEmptyEditor) {
      return onTextPastedOnEmptyEditor(
        currentContent,
        pastedText,
        latestEditorState,
        blockSelection
      );
    }

    return "not-handled";
  };

  /**
   * Workflow:
   * - Slice the pasted text if the length is greater than the limit
   * - Insert the sliced text
   * - Move the cursor to end of new text
   * - Update states
   * @param currentContent
   * @param pastedText
   * @param latestEditorState
   * @param blockSelection
   * @returns
   */
  const onTextPastedOnEmptyEditor = (
    currentContent: ContentState,
    pastedText: string,
    latestEditorState: EditorState,
    blockSelection: SelectionState
  ): DraftHandleValue => {
    const newText = pastedText.slice(0, max);

    let nextEditorState = EditorState.push(
      latestEditorState,
      Modifier.insertText(currentContent, blockSelection, newText),
      "insert-characters"
    );
    nextEditorState = EditorState.moveFocusToEnd(nextEditorState);
    const nextRawValue = getRawValue(nextEditorState);
    setEditorState(nextEditorState);
    setRawValue(nextRawValue);
    onChange(nextRawValue);
    return "handled";
  };

  const getSelectedTextLength = (latestEditorState: EditorState) => {
    const currentContent = latestEditorState.getCurrentContent();
    const currentSelection = latestEditorState.getSelection();
    const selectedAnchorOffset = currentSelection.getAnchorOffset();
    const selectedFocusOffset = currentSelection.getFocusOffset();
    const currentContentPlainText = currentContent.getPlainText();
    const selectedText = currentContentPlainText.slice(
      selectedAnchorOffset,
      selectedFocusOffset
    );
    return selectedText.length;
  };

  /**
   * Workflow:
   * - Slice the pasted text if there is enough space
   * - Replace the selected text with the sliced text
   * - Move the cursor to end of new text
   * - Update states
   * @param currentContent
   * @param pastedText
   * @param latestEditorState
   * @param blockSelection
   * @returns
   */
  const onReplaceSelectedText = (
    currentContent: ContentState,
    pastedText: string,
    latestEditorState: EditorState,
    blockSelection: SelectionState
  ): DraftHandleValue => {
    const currentContentLength = currentContent.getPlainText().length;
    const currentSelection = latestEditorState.getSelection();
    const selectedFocusOffset = currentSelection.getFocusOffset();
    const pastedTextLength = pastedText.length;
    const selectedTextLength = getSelectedTextLength(latestEditorState);
    const offset = max - currentContentLength + selectedTextLength;
    const redactedText =
      selectedTextLength > pastedTextLength
        ? pastedText
        : pastedText.slice(0, offset);

    let nextEditorState = EditorState.push(
      latestEditorState,
      Modifier.replaceText(currentContent, blockSelection, redactedText),
      "insert-characters"
    );

    nextEditorState = moveSelectionTo(
      nextEditorState,
      selectedFocusOffset + redactedText.length - selectedTextLength
    );
    const nextRawValue = getRawValue(nextEditorState);
    setEditorState(nextEditorState);
    setRawValue(nextRawValue);
    onChange(nextRawValue);

    return "handled";
  };

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);

  const onSearchChange = useCallback((props) => {}, []);

  const suggestions = [];

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
      onClick={handleEditorClick}
    >
      <Editor
        ref={textareaRef}
        plugins={plugins}
        editorKey={id || `${name}-id`}
        editorState={editorState}
        placeholder={placeholder}
        onChange={handleChange}
        keyBindingFn={keyBindingFn}
        handleKeyCommand={handleKeyCommand}
        handleBeforeInput={handleBeforeInput}
        handlePastedText={handlePastedText}
        className={clsx(_CLASS_IS + "__textarea", classNames?.textarea)}
        {...rest}
      />

      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        // popoverComponent={<MentionsPopoverPartial />}
        // entryComponent={MentionItemPartial}
      />
    </Container>
  );
};
