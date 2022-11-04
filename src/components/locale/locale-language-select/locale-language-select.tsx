import "./locale-language-select.scss";

import clsx from "classnames";
import React, { CSSProperties } from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "locale-language-select";

export interface LocaleLanguageSelectPropsInterface {
  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    header?: string;
    messages?: string;
    input?: string;
  };
  components?: {
    Container: unknown;
    Select: unknown;
  };
}

const LocaleLanguageSelect = (props: LocaleLanguageSelectPropsInterface) => {
  const { style, className, classNames, components } = props;
  const {} = props;

  const Container = components?.Container ?? "div";

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      LocaleLanguageSelect
    </Container>
  );
};

export default LocaleLanguageSelect;
