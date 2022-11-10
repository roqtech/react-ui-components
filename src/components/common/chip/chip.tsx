import React, { PropsWithChildren } from 'react';
import './chip.scss';
import clsx from 'clsx';

export interface ChipPropsInterface extends PropsWithChildren {
    label?: string
    type?: 'primary' | 'error'
}

const _CLASS_IS = 'roq-chip';
export const Chip = (props: ChipPropsInterface) => {
    const { children, label, type } = props;
    return (
        <span className={clsx(_CLASS_IS)}>
            {label && (<span className={clsx(`${_CLASS_IS}-label`, `${_CLASS_IS}-${type}`)}>{label}</span>)}
            {children}
        </span>
    )
}

Chip.defaultProps = {
    type: 'primary'
}
