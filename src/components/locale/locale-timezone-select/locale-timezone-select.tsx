import "./locale-timezone-select.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  HTMLAttributes,
  useCallback,
  SelectHTMLAttributes,
  OptionHTMLAttributes,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { LocaleTimzeoneInterface } from "src/interfaces";
import { withLocale } from "src/hocs";
import { useRoqTranslation } from "src/components/core/roq-provider";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "locale-timezone-select";

export interface LocaleTimezoneSelectPropsInterface<
  OptionInterface = LocaleTimzeoneInterface
> {
  label?: string;
  placeholder?: string;
  value?: OptionInterface;
  onChange?: (value: OptionInterface) => void;
  options?: OptionInterface[];

  showLabel?: boolean;
  getOptionId?: (option: OptionInterface) => string;
  getOptionValue?: (option: OptionInterface) => string;
  getOptionLabel?: (option: OptionInterface) => string;

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
      Pick<SelectHTMLAttributes<HTMLSelectElement>, "className" | "placeholder" | "onChange">
    >;
    Option?: ComponentType<
      Pick<OptionHTMLAttributes<HTMLOptionElement>, "className">
    >;
  };
}

const LocaleTimezoneSelect = <OptionInterface=LocaleTimzeoneInterface,>(
  props: LocaleTimezoneSelectPropsInterface<OptionInterface>
) => {
  const { t } = useRoqTranslation();
  const { style, className, classNames, components } = props;
  const {
    showLabel = true,
    label,
    placeholder,
    value,
    options,
    onChange,
    getOptionValue = (option: OptionInterface) => option as string,
    getOptionId = (option: OptionInterface) => option as string,
    getOptionLabel = (option: OptionInterface) => option as string,
  } = props;

  const Container = components?.Container ?? "div";
  const Label = components?.Label ?? "span";
  const Select = components?.Select ?? "select";
  const Option = components?.Option ?? "option";

  const handleValueChange = useCallback((e) => {
    const val = e.target.value;
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
          <Option key={getOptionId(option)} className={clsx(_CLASS_IS + "__select" + "__option", classNames?.option)}>{getOptionLabel(option)}</Option>
        ))}
      </>
    );
  }, [options, Option, isOptionSelected, getOptionId, getOptionLabel]);

  return (
    <Container
      className={clsx(_CLASS_IS, className, classNames?.container)}
      style={style}
    >
      {showLabel && <Label className={clsx(_CLASS_IS + "__label", classNames?.label)}>{label ?? t("locale.timezone.select.label")}</Label>}
      <Select
        className={clsx(_CLASS_IS + "__select", classNames?.select)}
        placeholder={placeholder ?? t("locale.timezone.select.label")}
        value={getOptionValue(value as OptionInterface)}
        onChange={handleValueChange}
      >
        {renderOptions()}
      </Select>
    </Container>
  );
};

export default withLocale<LocaleTimezoneSelectPropsInterface>(
  ({ timezone, timezones, onTimezoneChange }) => ({
    value: timezone,
    options: timezones,
    onChange: onTimezoneChange,
  })
)(LocaleTimezoneSelect);
