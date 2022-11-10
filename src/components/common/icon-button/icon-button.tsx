import React from 'react';

export interface IconButtonPropsInterface extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    Icon: React.FC,
}

export default function IconButton(props: IconButtonPropsInterface) {
    const {
        Icon,
        ...buttonProps
    } = props;
    return (
        <button {...buttonProps}>
            {Icon && <Icon/>}
        </button>
    );
}
