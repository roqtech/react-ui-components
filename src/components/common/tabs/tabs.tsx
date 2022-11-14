import React, { Children, cloneElement, useEffect, useState } from 'react';
import clsx from 'clsx'
import { COMPONENT_CLASS_PREFIX } from 'src/utils/constant';
import type { ClassValue } from 'clsx'
import './tabs.scss'

const _CLASS_IS =  COMPONENT_CLASS_PREFIX + 'toggle-group-tabs';
export interface TabsProps {
  defaultValue?: string 
  value?: string 
  onValueChange?: (value: string | unknown) => void
  className?: ClassValue;
  children?: React.ReactNode;
}
export const Tabs: React.FC<TabsProps> = (props) => {
  const { children, defaultValue, value, onValueChange, className } = props
  const arrayChildren = Children.toArray(children);
  const [toggle, setToggle] = useState(value ?? defaultValue);

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

export interface TabItemProps {
  value?: string
}
interface TabItemInternalProps extends TabItemProps {
  selected?: boolean
  onChange?: (value?: string) => void
  className?: ClassValue;
  children?: React.ReactNode;
}
export const TabItem: React.FC<TabItemInternalProps> = (props) => {
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
