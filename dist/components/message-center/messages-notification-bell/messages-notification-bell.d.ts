import "./messages-notification-bell.css";
import { ComponentType } from "react";
import { BadgeProps } from "../../common/badge/badge";
interface MessagesNotificationBellProps {
    unreadCount: number;
    maxUnreadCount: number;
    displayZero?: boolean;
    className?: string;
    classNames?: {
        container?: string;
        button?: string;
        icon?: string;
        badge?: string;
    };
    components?: {
        Container: ComponentType<any>;
        Button: ComponentType<any>;
        Icon: ComponentType<{
            className?: string;
        }>;
        Badge: ComponentType<BadgeProps>;
    };
}
export declare const MessagesNotificationBell: (props: MessagesNotificationBellProps) => JSX.Element;
export {};
