import React from 'react'
import { RoqProvider } from '../src/components/Provider/Provider'
import '../stories/assets/custom.css'
import '../src/styles/global.scss'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        "Roq Components",
        [
          "Introduction",
          "Getting started",
          "Usage",
          "Styling",
          "Common",
          "Chat",
          [
            "Panel",
            "Message Bubble",
            "Message",
            "Message History",
            "Message List",
            "Conversation Card",
            "Conversations",
            "Conversation List",
            "Conversation Header",
            "Message Input",
            "Notification Bell",
            "Examples",
            ["Message Center", "Social Messenger", "Team Collaboration"],
          ],
          "Typography",
        ],
      ],
    },
  },
}

const hostConfig = {
  host: process.env.STORYBOOK_PLATFORM_GRAPHQL ?? '',
  token: process.env.STORYBOOK_PLATFORM_TOKEN ?? '',
}

export const decorators = [
  (Story) => (
    <RoqProvider
      config={hostConfig}
    >
      <Story />
    </RoqProvider>
  ),
]
