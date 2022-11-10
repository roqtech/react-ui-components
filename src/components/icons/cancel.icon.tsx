import React from 'react';

export interface CancelIconPropsInterface extends React.SVGProps<SVGSVGElement> {
    width?: string,
    height?: string
}

export const CancelIcon = (props: CancelIconPropsInterface) => (
    <svg {...props} viewBox="0 0 200 200" data-name="Layer 1" id="Layer_1"
         xmlns="http://www.w3.org/2000/svg"><title/>
        <path
            d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/>
    </svg>
)

CancelIcon.defaultProps = {
    width: '200px',
    height: '200px',
}
