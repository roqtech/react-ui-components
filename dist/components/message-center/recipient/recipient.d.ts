import "./recipient.css";
import { ComponentType } from "react";
interface RecipientProps {
    recipient: {
        name: string;
    };
    selected?: boolean;
    className?: string;
    classNames?: {
        container?: string;
        inner?: string;
        checkIcon?: string;
    };
    components?: {
        Container: ComponentType<any>;
        Inner: ComponentType<any>;
        CheckIcon: ComponentType<any>;
    };
}
export declare const Recipient: (props: RecipientProps) => JSX.Element;
export {};
