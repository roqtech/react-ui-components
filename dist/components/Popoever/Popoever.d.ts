import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
declare function Content({ children, ...props }: {
    [x: string]: any;
    children: any;
}): JSX.Element;
export declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
export declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export declare const PopoverContent: typeof Content;
export declare const PopoverClose: import("@stitches/react/types/styled-component").StyledComponent<React.ForwardRefExoticComponent<PopoverPrimitive.PopoverCloseProps & React.RefAttributes<HTMLButtonElement>>, {}, {}, import("@stitches/react/types/css-util").CSS<{}, {}, {}, {}>>;
export {};
