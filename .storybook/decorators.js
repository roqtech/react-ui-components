import { RoqProvider } from '../src/components/Provider/Provider'
import { token } from '../src/App'

export default function AppDecorator(Story, context){
  return (
    <RoqProvider config={{ token }}>
      <Story />
    </RoqProvider>
  )
}