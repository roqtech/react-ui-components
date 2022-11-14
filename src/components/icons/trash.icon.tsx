import React from 'react';

export interface TrashIconPropsInterface extends React.SVGProps<SVGSVGElement> {

}

export const TrashIcon = (props: TrashIconPropsInterface) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M2.43742 15.5C2.0902 15.5 1.79506 15.3785 1.552 15.1354C1.30895 14.8924 1.18742 14.5972 1.18742 14.25V2.375H0.333252V1.125H4.24992V0.5H9.74992V1.125H13.6666V2.375H12.8124V14.25C12.8124 14.5833 12.6874 14.875 12.4374 15.125C12.1874 15.375 11.8958 15.5 11.5624 15.5H2.43742ZM11.5624 2.375H2.43742V14.25H11.5624V2.375ZM4.64575 12.4583H5.89575V4.14583H4.64575V12.4583ZM8.10408 12.4583H9.35408V4.14583H8.10408V12.4583ZM2.43742 2.375V14.25V2.375Z"
        />
    </svg>

)


TrashIcon.defaultProps = {
    width: '14',
    height: '16',
}
