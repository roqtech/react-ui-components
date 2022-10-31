import React from 'react'
import { Notification } from "./components/notification"
import { RoqProvider } from './components/Provider/Provider';

const hostConfig = {
  host: process.env.STORYBOOK_PLATFORM_GRAPHQL ?? "",
  token: process.env.STORYBOOK_PLATFORM_TOKEN ?? "",
};

function App() {

  return (
    <RoqProvider config={hostConfig}>
      <Notification />
    </RoqProvider>
  )
}

export default App
