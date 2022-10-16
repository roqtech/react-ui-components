import React, { ReactNode } from "react";
import { CSS } from '@stitches/react';
export interface CardProps {
    title?: string | ReactNode;
    subTitle?: string | ReactNode;
    css?: CSS;
    headerExtraContent?: string | ReactNode;
    children?: ReactNode;
}
declare const Card: React.FC<CardProps>;
export { Card };
