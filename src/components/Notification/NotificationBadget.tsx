import React from 'react'
import { styled } from "src/styles";
import { Avatar, AvatarFallback } from 'src/components/Avatar'
import { blackA, whiteA } from "@radix-ui/colors";

const StyledNotificationBadges = styled(AvatarFallback, {
  backgroundColor: blackA.blackA12,
  color: whiteA.whiteA12,
})

const StyledWrapper = styled(Avatar, {
  width: 28,
  height: 28,
})

const NotificationBadges = ({ children }) => (
  <StyledWrapper>
    <StyledNotificationBadges>{children}</StyledNotificationBadges>
  </StyledWrapper>
)

export { NotificationBadges }
