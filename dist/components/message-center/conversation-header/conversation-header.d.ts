import "./conversation-header.css";
import { ComponentType } from "react";
interface ConversationHeaderProps {
    title: string;
    members: any[];
    className?: string;
    classNames?: {
        container?: string;
        message?: string;
    };
    components?: {
        container: ComponentType<any>;
        message: ComponentType<any>;
    };
}
export declare const ConversationHeader: (props: ConversationHeaderProps) => JSX.Element;
export {};
