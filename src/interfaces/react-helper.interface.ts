import { ComponentType, PropsWithChildren, ReactNode } from 'react';
import { ClassValue } from 'clsx';

export interface CommonProps {
    className: ClassValue
}
export type HTMLComponentType<T extends CommonProps = CommonProps> =
    ComponentType<T>

export interface CommonPropsWithChildren {
    children: ReactNode | string
}

export type HTMLComponentTypeWithChildren<T extends CommonPropsWithChildren = CommonPropsWithChildren> = ComponentType<PropsWithChildren<T>>
