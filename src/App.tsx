import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Notification } from "./components/notification"
import { RoqProvider } from './components/Provider/Provider';

const queryClient = new QueryClient();

export const token = ''

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RoqProvider config={{ token }}>
        <Notification />
      </RoqProvider>
    </QueryClientProvider>
  )
}

export default App
