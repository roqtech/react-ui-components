import React, { ReactNode } from 'react'
import { styled } from "src/styles";
import { Avatar, AvatarFallback } from 'src/components/Avatar'
import { blackA, whiteA } from "@radix-ui/colors";

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
  count?: number | ReactNode,
} & React.ComponentProps<typeof StyledWrapper>
const NotificationBadge: React.FC<NotificationBadgesProps>  = ({ count, children, ...rest }) => (
  <StyledWrapper {...rest}>
    <StyledNotificationBadge>{count ?? children}</StyledNotificationBadge>
  </StyledWrapper>
)

export { NotificationBadge, NotificationBadgesProps }
