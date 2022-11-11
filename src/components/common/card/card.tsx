import React, { ComponentType, ReactNode, useMemo } from 'react'
import clsx from 'clsx'
import './card.scss'
import type { ClassValue } from 'clsx'
import { COMPONENT_CLASS_PREFIX } from 'src/utils/constant'

const _CLASS_IS = COMPONENT_CLASS_PREFIX + 'card'
interface ChildrenBaseProps {
  Container?: ComponentType<any>
  className?: ClassValue
}
export interface CardProps {
  title?: string | ReactNode
  subTitle?: string | ReactNode
  headerExtraContent?: string | ReactNode
  children?: ReactNode
  content?: ReactNode
  className?: ClassValue
  components?: {
    Container?: ComponentType<any>
  }
  titleProps?: ChildrenBaseProps
  bodyProps?: ChildrenBaseProps
  headerProps?: ChildrenBaseProps
  headerExtraProps?: ChildrenBaseProps
}

const Card: React.FC<CardProps> = (props) => {
  const {
    components,
    title,
    subTitle,
    headerExtraContent,
    content,
    bodyProps,
    headerProps,
    headerExtraProps,
    ...rest
  } = props

  const renderSubtitle = useMemo(() => {
    if (typeof subTitle === 'string') {
      return <p className={clsx(_CLASS_IS + '-subtitle')}>{subTitle}</p>
    }
    if (typeof subTitle === 'object') {
      return subTitle
    }
    return null
  }, [subTitle])

  const renderTitle = useMemo(() => {
    if (!title || typeof title === 'string') {
      return (
        <div>
          <p className={clsx(_CLASS_IS + '-title')}>{title ?? 'Title'}</p>
          {renderSubtitle}
        </div>
      )
    }
    if (typeof title === 'object') {
      return (
        <>
          {title} {renderSubtitle}
        </>
      )
    }
    return null
  }, [title])

  const children = props.children || content

  const Container = components?.Container || 'div'
  const ContainerBody = bodyProps?.Container || 'div'
  const ContainerHeader = headerProps?.Container || 'div'
  const ContainerHeaderExtra = headerExtraProps?.Container || 'div'

  return (
    <Container className={clsx(_CLASS_IS, rest.className)}>
      <ContainerHeader
        className={clsx(_CLASS_IS + '-header', headerProps?.className)}
      >
        {renderTitle}{' '}
        {headerExtraContent && (
          <ContainerHeaderExtra
            className={clsx(
              _CLASS_IS + '-header-extra',
              headerExtraProps?.className,
            )}
          >
            {headerExtraContent}
          </ContainerHeaderExtra>
        )}
      </ContainerHeader>
      {children && (
        <ContainerBody
          className={clsx(_CLASS_IS + '-body', bodyProps?.className)}
        >
          {children}
        </ContainerBody>
      )}
    </Container>
  )
}

export { Card }
