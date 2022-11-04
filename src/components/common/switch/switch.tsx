import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx'
import type { ClassValue } from 'clsx'
import PropTypes from 'prop-types';
import './switch.scss'

export interface SwitchProps {
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  className?: ClassValue;
  onCheckedChange?: (checked: boolean) => void;
}
export const Switch: React.FC<SwitchProps & React.HTMLProps<HTMLInputElement>> = (props) => {
  const { checked, disabled, className, defaultChecked, onCheckedChange, ...rest } = props
  const [toggle, setToggle] = useState(checked ?? defaultChecked ?? false);

  useEffect(() => {
    if (typeof checked === 'boolean') {
      setToggle(checked);
    }
  }, [checked]);

  const triggerToggle = useCallback(() => {
    if (disabled) { return }
    setToggle((v) => {
      if ( typeof onCheckedChange === 'function' ) {
        onCheckedChange(!v);
      }
      return !v
    })
  }, [disabled])
  
  return (
    <div
      onClick={triggerToggle}
      className={clsx(
        'roq-switch-toggle',
        { 'roq-switch-toggle--checked': toggle, 'roq-switch-toggle--disabled': disabled },
        className,
      )}
    >
      <div className={clsx('roq-switch-toggle-container', {'checked': toggle})}>
        <div className='roq-switch-toggle-check'>
          <span></span>
        </div>
        <div className='roq-switch-toggle-uncheck'>
          <span></span>
        </div>
      </div>
      <div className='roq-switch-toggle-circle'></div>
      <input
        className='roq-switch-toggle-input'
        type='checkbox'
        aria-label='Toggle Button'
        {...rest}
      />
    </div>
  )
}

Switch.propTypes = {
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onCheckedChange: PropTypes.func,
};