import React from 'react';
import { RoqProvider } from '../src/components/Provider/Provider';
import { globalStyles } from '../src/styles'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const token = ''

export const decorators = [
  (Story) => (
    <div style={{ margin: '3em' }}>
      <RoqProvider config={{ token }}>
        <Story />
      </RoqProvider>
    </div>
  ),
];
