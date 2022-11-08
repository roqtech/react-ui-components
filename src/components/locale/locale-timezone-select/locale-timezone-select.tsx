import "./locale-timezone-select.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  HTMLAttributes,
  useCallback,
  OptionHTMLAttributes,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { LocaleTimzeoneInterface } from "src/interfaces";
import { withLocale } from "src/hocs";
import { useRoqTranslation } from "src/components/core/roq-provider";
import { Select as RoqSelect, SelectPropsInterface } from "src/components";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "locale-timezone-select";

export interface LocaleTimezoneSelectPropsInterface<T = LocaleTimzeoneInterface> extends Omit<
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

const LocaleTimezoneSelect = <T=LocaleTimzeoneInterface,>( props: LocaleTimezoneSelectPropsInterface<T>) => {
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
  const Select = components?.Select ?? RoqSelect<T>
  
  const handleGetOptionId = useCallback((option: T) => option as string, [])

  const handleGetOptionValue = useCallback((option: T) => option as string, [])

  const handleGetOptionLabel = useCallback((option: T) => option as string, [])


  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      {showLabel && <Label className={clsx(_CLASS_IS + "__label", classNames?.label)}>{label ?? t("locale.timezone.select.label")}</Label>}
      <Select
        className={clsx(_CLASS_IS + "__select", classNames?.select)}
        placeholder={placeholder ?? t("locale.timezone.select.label")}
        getOptionId={handleGetOptionId}
        getOptionValue={handleGetOptionValue}
        getOptionLabel={handleGetOptionLabel}
        {...selectProps}
      />
    </Container>
  );
};

export default withLocale<LocaleTimezoneSelectPropsInterface, "value" | "options" | "onChange">(
  ({ timezone, timezones, onTimezoneChange }) => ({
    value: timezone,
    options: timezones,
    onChange: timezone => onTimezoneChange(timezone as string),
  })
)(LocaleTimezoneSelect);
