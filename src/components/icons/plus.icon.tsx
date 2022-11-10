import React from 'react';

export interface PlusIconPropsInterface extends React.SVGProps<SVGSVGElement> {

}

export const PlusIcon = (props: PlusIconPropsInterface) => (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"/>
    </svg>
)

PlusIcon.defaultProps = {
    width: '24px',
    height: '24px'
}
