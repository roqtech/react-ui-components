import { CSSProperties, ComponentType } from "react";
interface ConversationCardProps {
    title: string;
    date: string;
    message: string;
    members: any[];
    style?: CSSProperties;
    className?: string;
    classNames?: {
        container?: string;
        inner?: string;
        top?: string;
        title?: string;
        message?: string;
    };
    components?: {
        Container?: ComponentType<any>;
        Inner?: ComponentType<any>;
        Top?: ComponentType<any>;
        Title?: ComponentType<any>;
        Message?: ComponentType<any>;
    };
}
export declare const ConversationCard: (props: ConversationCardProps) => JSX.Element;
export {};
