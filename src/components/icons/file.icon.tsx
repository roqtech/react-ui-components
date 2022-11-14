import React from 'react';

export interface FileIconPropsInterface extends React.SVGProps<SVGSVGElement> {

}

export const FileIcon = (props: FileIconPropsInterface) => (
    <svg viewBox="0 0 20 26" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M4.96875 20.1875H15.0312V18.3125H4.96875V20.1875ZM4.96875 14.875H15.0312V13H4.96875V14.875ZM1.875 25.5C1.375 25.5 0.9375 25.3125 0.5625 24.9375C0.1875 24.5625 0 24.125 0 23.625V2.375C0 1.875 0.1875 1.4375 0.5625 1.0625C0.9375 0.6875 1.375 0.5 1.875 0.5H13.1562L20 7.34375V23.625C20 24.125 19.8125 24.5625 19.4375 24.9375C19.0625 25.3125 18.625 25.5 18.125 25.5H1.875ZM12.2188 8.1875V2.375H1.875V23.625H18.125V8.1875H12.2188ZM1.875 2.375V8.1875V2.375V23.625V2.375Z"
            fill="#207BE5"/>
    </svg>

)

FileIcon.defaultProps = {
    width: '20',
    height: '26'
}
