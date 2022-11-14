import React, { PropsWithChildren } from 'react';
import './drawer.scss';
import clsx, { ClassValue } from 'clsx';
import { COMPONENT_CLASS_PREFIX } from 'src/utils/constant';

export interface DrawerPropsInterface extends PropsWithChildren {
    isVisible: boolean,
    classNames?: {
        input?: ClassValue,
        aside?: ClassValue,
        container?: ClassValue,
    }
}

const _CLASS_IS = `${COMPONENT_CLASS_PREFIX}drawer`

const withBaseClass = (className: string) => `${_CLASS_IS}__${className}`;
export const Drawer = ({ isVisible, children, classNames }: DrawerPropsInterface) => {
    return (
        <div className={clsx(_CLASS_IS)}>
            <input className={clsx(classNames?.input)} type="checkbox" id={withBaseClass('opener')} data-drawer={true}
                   hidden={true} checked={isVisible} onChange={() => {
            }}/>
            <aside className={clsx(withBaseClass('aside'), classNames?.aside)} role="drawer" id="drawer"
                   aria-labelledby="open-drawer">
                <div className={clsx(withBaseClass('container'), classNames?.container)}>
                    {children}
                </div>
            </aside>
        </div>
    );
}


Drawer.defaultProps = {
    isVisible: true
}
