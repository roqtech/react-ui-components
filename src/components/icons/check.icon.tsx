import React from 'react';


export interface CheckIconPropsInterface extends React.SVGProps<SVGSVGElement> {
    fil?: string;
}

export const CheckIcon = ({ fill, ...rest }: CheckIconPropsInterface) => (
    <svg {...rest} viewBox="0 0 24 24" id="magicoon-Filled" xmlns="http://www.w3.org/2000/svg">
        <title>check-circle</title>
        <g id="check-circle-Filled">
            <path style={{ fill }} id="check-circle-Filled-2" data-name="check-circle-Filled"
                  d="M12,2A10,10,0,1,0,22,12,10.016,10.016,0,0,0,12,2Zm4.71,8.71-5,5a1.014,1.014,0,0,1-1.42,0l-3-3a1,1,0,1,1,1.42-1.42L11,13.59l4.29-4.3a1,1,0,0,1,1.42,1.42Z"/>
        </g>
    </svg>
)

CheckIcon.defaultProps = {
    width: '24px',
    height: '24px',
    fill: '#3CD89C'
}
