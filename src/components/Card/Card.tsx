import React, { ReactNode, useMemo } from "react"
import { CSS } from '@stitches/react'
import { styled } from '../../styles'
import { CardHeader, CardHeaderExtra } from "./CardHeader"
import { CardSubTitle, CardTitle } from "./CardTitle"

export interface CardProps {
  title?: string | ReactNode
  subTitle?: string | ReactNode
  headerExtraContent?: string | ReactNode,
  children?: ReactNode
  content?: ReactNode
}

const StyledCard = styled('div', {
  fontFamily: '$main',
  borderWidth: 1,
  borderColor: '$gray12',
  borderStyle: 'solid',
  minWidth: 240,
  maxWidth: 480,
  boxShadow: "none",
  boxSizing: "border-box",
  borderRadius: "8px",
  marginBottom: "12px"
})
export type StyledCardPropsType = typeof StyledCard

const StyledCardBody = styled('div', {
  padding: '1rem',
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "20px",
  letterSpacing: "0",
  color: "$gray7"
})

const Card: React.FC<CardProps & React.ComponentProps<typeof StyledCard>> = (props) => {
  const { title, subTitle, headerExtraContent, content, ...rest } = props
  
  const renderSubtitle = useMemo(() => {
    if (typeof subTitle === 'string') {
      return <CardSubTitle>{subTitle}</CardSubTitle>
    }
    if (typeof subTitle === 'object') {
      return subTitle
    }
    return null
  }, [subTitle])

  const renderTitle = useMemo(() => {
    if (!title) {
      return <CardTitle>Title {renderSubtitle}</CardTitle>
    }
    if (typeof title === 'string') {
      return <CardTitle>{title} {renderSubtitle}</CardTitle>
    }
    if (typeof title === 'object') {
      return <>{title} {renderSubtitle}</>
    }
    return null
  }, [title])

  const children = props.children || content
  
  return (
    <StyledCard {...rest}>
      <CardHeader>
        {renderTitle} {headerExtraContent && <CardHeaderExtra>{headerExtraContent}</CardHeaderExtra>}
      </CardHeader>
      {children && <StyledCardBody>{children}</StyledCardBody>}
    </StyledCard>
  )
}

export { Card }
