import "./select.scss";

import clsx from "classnames";
import React, {
  CSSProperties,
  ComponentType,
  useCallback,
  SelectHTMLAttributes,
  OptionHTMLAttributes,
} from "react";

import { COMPONENT_CLASS_PREFIX } from "src/utils/constant";
import { SelectOptionInterface } from "src/interfaces";
import { find } from "lodash";

const _CLASS_IS = COMPONENT_CLASS_PREFIX + "select";

export interface SelectPropsInterface<T = SelectOptionInterface>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> {
  value: T | undefined | null;
  onChange?: (value: T | undefined | null) => void;
  options?: T[];

  getOptionId?: (option: T) => string;
  getOptionValue?: (option: T) => string;
  getOptionLabel?: (option: T) => string;

  style?: CSSProperties;
  className?: string;
  classNames?: {
    container?: string;
    label?: string;
    select?: string;
    option?: string;
  };
  components?: {
    Select?: ComponentType<
      Pick<
        SelectHTMLAttributes<HTMLSelectElement>,
        "className" | "placeholder" | "onChange"
      >
    >;
    Option?: ComponentType<
      Pick<OptionHTMLAttributes<HTMLOptionElement>, "className">
    >;
  };
}

export const Select = <T = SelectOptionInterface,>(props: SelectPropsInterface<T>) => {
  const { className, classNames, components, ...rest } = props;
  const {
    value,
    options,
    onChange,
    getOptionValue = (option: T) => option && (option as unknown as  SelectOptionInterface).value,
    getOptionId = (option: T) => option && (option as  unknown as SelectOptionInterface).value,
    getOptionLabel = (option: T) => option && (option as  unknown as SelectOptionInterface).label,
    ...selectProps
  } = rest;

  const Select = components?.Select ?? "select";
  const Option = components?.Option ?? "option";

  const handleValueChange = useCallback(
    (e) => {
      const id = e.target.value;
      const option = find(options, opt => getOptionValue(opt) === id);
      onChange?.(option);
    },
    [onChange, options, getOptionValue]
  );

  const isOptionSelected = useCallback(
    (option) => {
      if (!option) {
        return false;
      }

      return getOptionValue(option as T) === getOptionValue(value as T);
    },
    [value, getOptionValue]
  );

  const renderOptions = useCallback(() => {
    return (
      <>
        {options?.map((option) => (
          <option
            key={getOptionId(option)}
            className={clsx(
              _CLASS_IS + "__select" + "__option",
              classNames?.option
            )}
            value={getOptionValue(option)}
            defaultValue="test"
            selected={isOptionSelected(option)}
          >
            {getOptionLabel(option)}
          </option>
        ))}
      </>
    );
  }, [
    options,
    Option,
    isOptionSelected,
    getOptionId,
    getOptionLabel,
    getOptionValue,
  ]);

  return (
    <Select
      className={clsx(_CLASS_IS, className, classNames?.container)}
      onChange={handleValueChange}
      {...selectProps}
    >
      {renderOptions()}
    </Select>
  );
};
