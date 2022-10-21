import "./badge.css";
import { ComponentType, ReactNode } from "react";
export interface BadgeProps {
    children: ReactNode;
    maxValue?: number;
    className?: string;
    classNames?: {
        container?: string;
        inner?: string;
    };
    components?: {
        Container?: ComponentType<any>;
        Inner?: ComponentType<any>;
    };
}
export declare const Badge: (props: BadgeProps) => JSX.Element;
