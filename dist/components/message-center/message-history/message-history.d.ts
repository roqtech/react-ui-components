import './message-history.css';
import { ComponentType } from 'react';
interface MessageHistoryProps {
    messages: any[];
    className?: string;
    classNames?: {
        container?: string;
        line?: string;
        message?: string;
    };
    components?: {
        container: ComponentType<any>;
        line: ComponentType<any>;
        message: ComponentType<any>;
    };
}
export declare const MessageHistory: (props: MessageHistoryProps) => JSX.Element;
export {};
