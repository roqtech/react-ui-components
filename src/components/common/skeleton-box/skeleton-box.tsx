import React from 'react';
import clsx, { ClassValue } from 'clsx';
import { HTMLComponentType } from 'src/interfaces';
import './skeleton-box.scss';

export interface SkeletonBoxPropsInterface {
    classNames?:{
        wrapper?: ClassValue,
        skeleton?: ClassValue,
    },
    components?:{
        wrapper?: HTMLComponentType<HTMLSpanElement>,
        skeleton?: HTMLComponentType<HTMLSpanElement>
    }
    rows?: number;
    width: string;
    height: string;
}

const _CLASS_IS = 'skeleton-box';
export const SkeletonBox = (props: SkeletonBoxPropsInterface) => {
    const { rows, width, height, classNames, components } = props;
    const Wrapper = components?.wrapper || 'span';
    const Skeleton = components?.skeleton || 'span';
    return (
        <Wrapper className={clsx(`${_CLASS_IS}-wrapper`,classNames?.wrapper)}>
            {
                [...Array(rows).keys()].map((_,index) => (<Skeleton key={`${_CLASS_IS}-${index}`} className={clsx(_CLASS_IS, classNames?.skeleton)} style={{ width, height }}></Skeleton>))
            }
        </Wrapper>
    )
}


SkeletonBox.defaultProps = {
    rows: 1,
    width: '100%',
    height: '1em',
}
