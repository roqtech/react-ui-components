import React from 'react'
import { RoqProvider } from '../src/components/Provider/Provider'
import '../stories/assets/custom.css'
import '../src/styles/global.scss'
import { ChatProvider } from '../src'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const hostConfig = {
  host: process.env.STORYBOOK_PLATFORM_GRAPHQL ?? '',
  token: process.env.STORYBOOK_PLATFORM_TOKEN ?? '',
}

export const decorators = [
  (Story) => (
    <div style={{padding: '2em'}}>
      <RoqProvider
        config={hostConfig}
      >
        <ChatProvider
          socketUrl={'/'}
          platformToken={process.env.PLATFORM_TOKEN}
        >
          <Story />
        </ChatProvider>
      </RoqProvider>
    </div>
  ),
]
