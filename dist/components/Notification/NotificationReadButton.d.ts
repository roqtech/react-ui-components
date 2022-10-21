import React from 'react';
export declare function useReadNotification(id: string): import("react-query").UseQueryResult<any, unknown>;
export declare function useUnReadNotification(id: string): import("react-query").UseQueryResult<any, unknown>;
export interface NotificationReadButtonProps {
    id: string;
    read: boolean;
}
declare const NotificationReadButton: React.FC<NotificationReadButtonProps>;
export { NotificationReadButton };
