/// <reference types="react" />
import './avatar.css';
declare type AvatarSizeType = 'small' | 'medium' | 'large';
export interface AvatarProps {
    name?: string;
    src?: string;
    alt?: string;
    initials?: string;
    size?: AvatarSizeType;
    rounded?: boolean;
    square?: boolean;
    border?: boolean;
    className?: string;
    classNames?: {
        container?: string;
        initials?: string;
        image?: string;
    };
}
export declare const Avatar: (props: AvatarProps) => JSX.Element;
export {};
