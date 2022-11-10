import React, { PropsWithChildren } from 'react';
import './drawer.scss';
import clsx, { ClassValue } from 'clsx';

export interface DrawerPropsInterface extends PropsWithChildren {
    isVisible: boolean,
    classNames?: {
        input?: ClassValue,
        aside?: ClassValue,
        drawer?: ClassValue,
    }
}

const _CLASS_IS = 'roq-drawer'

const withBaseClass = (className: string) => `${_CLASS_IS}-${className}`;
export const Drawer = ({ isVisible, children, classNames }: DrawerPropsInterface) => {
    return (
        <div>
=            <input className={clsx(classNames?.input)} type="checkbox" id={withBaseClass('opener')} data-drawer={true}
                   hidden={true} checked={isVisible} onChange={()=>{}}/>
            <aside className={clsx(withBaseClass('container'), classNames?.aside)} role="drawer" id="drawer"
                   aria-labelledby="open-drawer">
                <div className={clsx(_CLASS_IS, classNames?.drawer)}>
                    {children}
                </div>
            </aside>
        </div>
    );
}


Drawer.defaultProps = {
    isVisible: true
}
