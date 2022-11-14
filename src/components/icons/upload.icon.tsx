import React from 'react';

export interface UploadIconPropsInterface extends React.SVGProps<SVGSVGElement> {

}

export const UploadIcon = (props: UploadIconPropsInterface) => (
    <svg viewBox="0 0 40 46" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M0.399902 42.6001C0.399902 41.0537 1.6535 39.8001 3.1999 39.8001H36.7999C38.3463 39.8001 39.5999 41.0537 39.5999 42.6001C39.5999 44.1465 38.3463 45.4001 36.7999 45.4001H3.1999C1.6535 45.4001 0.399902 44.1465 0.399902 42.6001ZM9.62 13.78C8.52654 12.6865 8.52654 10.9137 9.62 9.8202L18.02 1.4202C18.5451 0.895098 19.2573 0.600098 19.9999 0.600098C20.7425 0.600098 21.4547 0.895098 21.9798 1.4202L30.3798 9.8202C31.4733 10.9137 31.4733 12.6865 30.3798 13.78C29.2863 14.8735 27.5135 14.8735 26.42 13.78L22.7999 10.1599L22.7999 31.4001C22.7999 32.9465 21.5463 34.2001 19.9999 34.2001C18.4535 34.2001 17.1999 32.9465 17.1999 31.4001L17.1999 10.1599L13.5798 13.78C12.4863 14.8735 10.7135 14.8735 9.62 13.78Z"
              fill={props.fill}/>
    </svg>

)

UploadIcon.defaultProps = {
    width: 24,
    height: 24,
}
