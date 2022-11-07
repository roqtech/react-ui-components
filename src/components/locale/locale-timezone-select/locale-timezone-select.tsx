import "./locale-timezone-select.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  ReactHTMLElement,
  HTMLAttributes,
  useCallback,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { LocaleInterface } from "src/interfaces";
import { withLocale } from "src/hocs";
import { locale } from "dayjs";
import { T } from "lodash/fp";
import { useRoqTranslation } from "src/components/core/roq-provider";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "locale-language-select";

export interface LocaleTimezoneSelectPropsInterface<
  LocaleOptionInterface = LocaleInterface
> {
  label?: string;
  placeholder?: string;
  value?: LocaleOptionInterface;
  onChange?: (value: LocaleOptionInterface) => void;
  options?: LocaleOptionInterface[];

  showLabel?: boolean;

  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    select?: string;
    label?: string;
  };
  components?: {
    Container?: ComponentType<
      Pick<HTMLAttributes<HTMLElement>, "className" | "style">
    >;
    Label?: ComponentType<Pick<HTMLAttributes<HTMLElement>, "className">>;
    Select?: ComponentType<
      Pick<HTMLAttributes<HTMLSelectElement>, "className">
    >;
    Option?: ComponentType<
      Pick<HTMLAttributes<HTMLOptionElement>, "className">
    >;
  };
}

const LocaleTimezoneSelect = <LocaleOptionInterface,>(
  props: LocaleTimezoneSelectPropsInterface<LocaleOptionInterface>
) => {
  const { t } = useRoqTranslation();
  const { style, className, classNames, components } = props;
  const { label, placeholder, value, options, onChange } = props;

  const Container = components?.Container ?? "select";
  const Label = components?.Label ?? "span";
  const Select = components?.Select ?? "select";
  const Option = components?.Option ?? "option";

  const handleValueChange = useCallback(() => {
    const val = "";
    onChange?.(val);
  }, [onChange]);

  const isOptionSelected = useCallback(
    (option) => {
      return option === value;
    },
    [value]
  );

  const renderOptions = useCallback(() => {
    return (
      <>
        {options?.map((option) => (
          <Option>{option}</Option>
        ))}
      </>
    );
  }, [options, Option, isOptionSelected]);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      <Label>{label ?? t("locale.timezone.select.label")}</Label>
      <select
        className={clsx(_CLASS_IS + "__select", classNames?.select)}
        placeholder={placeholder ?? t("locale.timezone.select.label")}
        onChange={handleValueChange}
      >
        {renderOptions()}
      </select>
    </Container>
  );
};

export default withLocale<LocaleTimezoneSelectPropsInterface>(
  ({ locale, locales, onLocaleChange }) => ({
    value: locale,
    options: locales,
    onChange: onLocaleChange,
  })
)(LocaleTimezoneSelect);
