import "./create-conversation-button.css";
import { ComponentType, ReactNode } from "react";
interface CreateConversationButtonProps {
    children: ReactNode;
    className?: string;
    classNames?: {
        button?: string;
    };
    components?: {
        button: ComponentType<any>;
    };
}
export declare const CreateConversationButton: (props: CreateConversationButtonProps) => JSX.Element;
export {};
