import React, { ReactNode } from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { styled } from 'src/styles'
import { blackA } from '@radix-ui/colors'

export const StyledAvatar = styled(AvatarPrimitive.Root, {
  fontFamily: '$main',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  width: 45,
  height: 45,
  borderRadius: '100%',
  backgroundColor: blackA.blackA3,
})

export const StyledFallback = styled(AvatarPrimitive.Fallback, {
  fontFamily: '$main',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
})

const Avatar = StyledAvatar
const AvatarFallback = StyledFallback

export { Avatar, AvatarFallback }

const StyledNotificationBadge = styled(AvatarFallback, {
  backgroundColor: 'inherit',
  color: 'inherit',
})

const StyledWrapper = styled(Avatar, {
  width: 28,
  height: 28,
  backgroundColor: blackA.blackA12,
  color: '#fff',
})

type NotificationBadgesProps = {
  count?: number | ReactNode
} & React.ComponentProps<typeof StyledWrapper>
const NotificationBadge: React.FC<NotificationBadgesProps> = ({
  count,
  children,
  ...rest
}) => (
  <StyledWrapper {...rest}>
    <StyledNotificationBadge>{count ?? children}</StyledNotificationBadge>
  </StyledWrapper>
)

export { NotificationBadge, NotificationBadgesProps }
