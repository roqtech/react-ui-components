import React, { Children, cloneElement, useEffect, useState } from 'react';
import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import './toggle-group.scss'

const _CLASS_IS = 'roq-' + 'toggle-group-button';
export interface ToggleGroupProps {
  defaultValue?: string 
  value?: string 
  onValueChange?: (value: string | unknown) => void
  className?: ClassValue;
  children?: React.ReactNode;
}
export const ToggleGroup: React.FC<ToggleGroupProps> = (props) => {
  const { children, defaultValue, value, onValueChange, className } = props
  const arrayChildren = Children.toArray(children);
  const [toggle, setToggle] = useState(value ?? defaultValue);
  console.log('toggle', toggle)

  useEffect(() => {
    if (typeof value !== 'undefined') {
      setToggle(value);
    }
  }, [value]);

  const onItemChange = (_value: string) => {
    if (typeof _value !== 'undefined') {
      setToggle(_value)
      onValueChange?.(_value)
    }
  }
  
  return (
    <div className={clsx(_CLASS_IS, className)}>
      {Children.map(arrayChildren, (child: any) => {
        return cloneElement(
          child as JSX.Element,
          { selected: child?.props?.value === toggle, onChange: onItemChange },
        )}
      )}
    </div>
  )
}

export interface ToggleGroupItemProps {
  value?: string
}
interface ToggleGroupItemInternalProps extends ToggleGroupItemProps {
  selected?: boolean
  onChange?: (value?: string) => void
  className?: ClassValue;
  children?: React.ReactNode;
}
export const ToggleGroupItem: React.FC<ToggleGroupItemInternalProps> = (props) => {
  const { selected, onChange, className, children, value } = props

  return (
    <button
      onClick={() => onChange?.(value)}
      className={clsx(
        _CLASS_IS + (selected ? '-item__selected' : '-item'),
        className,
      )}
    >
      {children}
    </button>
  )
}
