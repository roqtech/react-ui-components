import "./avatar-group.css";
import { ComponentType } from "react";
import { AvatarProps } from "../avatar/avatar";
interface AvatarGroupProps<T extends Partial<AvatarProps>> extends Pick<AvatarProps, "size" | "rounded" | "square" | "border"> {
    data: T[];
    stack?: boolean;
    grid?: boolean;
    maxCount?: number;
    className?: string;
    classNames?: {
        container?: string;
        wrapper?: string;
        avatar?: string;
    };
    components?: {
        Container: ComponentType<any>;
        Wrapper: ComponentType<any>;
        Avatar: ComponentType<AvatarProps>;
    };
}
export declare const AvatarGroup: <T extends Partial<AvatarProps>>(props: AvatarGroupProps<T>) => JSX.Element;
export {};
