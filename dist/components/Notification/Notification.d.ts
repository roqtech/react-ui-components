import React from 'react';
declare enum NotificationType {
    ALL = "all",
    UNREAD = "unread"
}
interface NotificationProps {
    defaultType?: NotificationType;
}
export declare const Notification: React.FC<NotificationProps>;
export {};
