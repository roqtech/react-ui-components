import React from 'react';
import { IRoqProvider } from 'src/components/Provider';
export declare type NotificationType = 'all' | 'unread';
interface NotificationProps extends Partial<IRoqProvider> {
    type?: NotificationType;
}
export declare const Notification: React.FC<NotificationProps>;
export {};
