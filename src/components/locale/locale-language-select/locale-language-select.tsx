import "./locale-language-select.scss";


import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  HTMLAttributes,
  OptionHTMLAttributes,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { LocaleLanguageInterface } from "src/interfaces";
import { withLocale } from "src/hocs";
import { useRoqTranslation } from "src/components/core/roq-provider";
import { find } from "lodash";
import { Select as RoqSelect, SelectPropsInterface } from "src/components";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "locale-language-select";

export interface LocaleLanguageSelectPropsInterface<T = LocaleLanguageInterface> extends Omit<
  SelectPropsInterface<T>, 
  "style" | "className" | "classNames" | "components"
> {
  label?: string;
  showLabel?: boolean;

  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    label?: string;
    select?: string;
    option?: string;
  };
  components?: {
    Container?: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "className" | "style">
    >;
    Label?: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
    Select?: ComponentType<
      Pick<SelectPropsInterface<T>, "className" | "placeholder" | "onChange" | "value">
    >;
    Option?: ComponentType<
      Pick<OptionHTMLAttributes<HTMLOptionElement>, "className">
    >;
  };
}

const LocaleLanguageSelect = <T=LocaleLanguageInterface,>( props: LocaleLanguageSelectPropsInterface<T>) => {
  const { t } = useRoqTranslation();
  const { style, className, classNames, components, ...rest } = props;
  const {
    showLabel = true,
    label,
    placeholder,
    ...selectProps
  } = rest;

  const Container = components?.Container ?? "div";
  const Label = components?.Label ?? "span";
  const Select = components?.Select ?? RoqSelect<T>;
  
  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      {showLabel && <Label className={clsx(_CLASS_IS + "__label", classNames?.label)}>{label ?? t("locale.language.select.label")}</Label>}
      <Select
        className={clsx(_CLASS_IS + "__select", classNames?.select)}
        placeholder={placeholder ?? t("locale.language.select.label")}
        {...selectProps}
      />
    </Container>
  );
};

export default withLocale<LocaleLanguageSelectPropsInterface<LocaleLanguageInterface>, "value" | "options" | "onChange">(
  ({ locale, languages, onLocaleChange }) => ({
    value: find(languages, { value: locale }),
    options: languages,
    onChange: (language) => {
      if (!language) {
        return;
      }
      
      onLocaleChange(language.value)
    },
  })
)(LocaleLanguageSelect);