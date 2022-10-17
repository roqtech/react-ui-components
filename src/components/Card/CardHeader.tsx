import { styled } from '../../styles'

const StyledCardHeader = styled('div', {
  fontFamily: '$main',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between'
})
const StyledCardHeaderExtra = styled('div', {
  fontFamily: '$main',
  color: "$gray7",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0px",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  letterSpacing: "0.15px"
})

const CardHeader = StyledCardHeader
const CardHeaderExtra = StyledCardHeaderExtra

export { CardHeader, CardHeaderExtra }
