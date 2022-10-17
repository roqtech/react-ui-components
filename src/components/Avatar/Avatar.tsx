import { styled } from "src/styles";
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { blackA, violet } from "@radix-ui/colors";

const StyledAvatar = styled(AvatarPrimitive.Root, {
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
});

const StyledFallback = styled(AvatarPrimitive.Fallback, {
  fontFamily: '$main',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  color: violet.violet11,
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
});

const Avatar = StyledAvatar
const AvatarFallback = StyledFallback

export { Avatar, AvatarFallback }
