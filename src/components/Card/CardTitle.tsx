import { styled } from '../../styles'

const StyledCardTitle = styled('p', {
  fontFamily: '$main',
  overflow: "hidden",
  fontSize: "16px",
  lineHeight: "24px",
  margin: 0,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  letterSpacing: "0.15px",
  color: "$gray7"
})

const StyledCardSubTitle = styled(StyledCardTitle, {
  fontSize: '12px',
  fontWeight: 300
})

const CardTitle = StyledCardTitle
const CardSubTitle = StyledCardSubTitle

export { CardTitle, CardSubTitle }
