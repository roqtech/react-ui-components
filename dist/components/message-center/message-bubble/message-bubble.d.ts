import './message-bubble.css';
import { ComponentType } from 'react';
interface MessageBubbleProps {
    message: string;
    isSent?: boolean;
    showCorner?: boolean;
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
export declare const MessageBubble: (props: MessageBubbleProps) => JSX.Element;
export {};
