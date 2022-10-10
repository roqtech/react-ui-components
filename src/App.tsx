import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { Notification } from "./components/Notification"
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
