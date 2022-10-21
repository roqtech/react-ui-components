import "./stacked-text.css";
import { ComponentType } from "react";
interface StackedTextProps {
    text?: string;
    primaryText?: string;
    secondaryText?: string;
    tertiaryText?: string;
    className?: string;
    classNames?: {
        container?: string;
        text?: string;
        primaryText?: string;
        secondaryText?: string;
        tertiaryText?: string;
    };
    components?: {
        container: ComponentType<any>;
        text: ComponentType<any>;
        primaryText: ComponentType<any>;
        secondaryText: ComponentType<any>;
        tertiaryText: ComponentType<any>;
    };
}
export declare const StackedText: (props: StackedTextProps) => JSX.Element;
export {};
