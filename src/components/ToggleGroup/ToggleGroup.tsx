import { styled } from 'src/styles';
import { gray, blackA, whiteA, mauve } from '@radix-ui/colors';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  fontFamily: '$main',
  display: 'inline-flex',
  backgroundColor: mauve.mauve6,
  borderRadius: 4,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  marginBottom: '16px'
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  fontFamily: '$main',
  all: 'unset',
  backgroundColor: 'white',
  color: mauve.mauve11,
  height: 35,
  display: 'flex',
  padding: '4px 8px',
  fontSize: 15,
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 1,
  textTransform: 'uppercase',
  '&:first-child': { marginLeft: 0, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 },
  '&:last-child': { borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  '&:hover': { backgroundColor: gray.gray3 },
  '&[data-state=on]': {
    backgroundColor: blackA.blackA12,
    color: whiteA.whiteA12
  },
  '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` },
});

// Exports
export const ToggleGroup = StyledToggleGroup;
export type TypeToggleGroup= typeof ToggleGroup
export const ToggleGroupItem = StyledItem;
