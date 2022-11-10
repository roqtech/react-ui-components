import React from 'react';

export interface LinkIconPropsInterface extends React.SVGProps<SVGSVGElement> {

}

export const LinkIcon = (props: LinkIconPropsInterface) => (
    <svg viewBox="0 0 24 24" id="magicoon-Filled" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>link</title>
        <g id="link-Filled">
            <path id="link-Filled-2" data-name="link-Filled"
                  d="M20.545,10.467l-1.839,1.84a1,1,0,0,1-1.414-1.414l1.839-1.84a2.965,2.965,0,0,0,0-4.186,3.027,3.027,0,0,0-4.184,0l-3.36,3.36a2.046,2.046,0,0,0-.267.316,2.943,2.943,0,0,0,.268,3.87,1,1,0,0,1-1.415,1.414,4.915,4.915,0,0,1-.5-6.42,3.792,3.792,0,0,1,.5-.594l3.36-3.36a4.959,4.959,0,0,1,7.013,7.014Zm-8.132-.294a1,1,0,0,0,0,1.414,2.928,2.928,0,0,1,.688,3.1,2.827,2.827,0,0,1-.688,1.088l-3.36,3.36a3.027,3.027,0,0,1-4.184,0,2.965,2.965,0,0,1,0-4.186l1.839-1.84a1,1,0,1,0-1.414-1.414l-1.839,1.84a4.959,4.959,0,1,0,7.013,7.014l3.359-3.359a4.813,4.813,0,0,0,1.163-1.849,4.963,4.963,0,0,0-1.163-5.166A1,1,0,0,0,12.413,10.173Z"/>
        </g>
    </svg>
)

LinkIcon.defaultProps = {
    width: '24px',
    height: '24px',
}
