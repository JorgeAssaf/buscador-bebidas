import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
const theme = extendTheme({
  fonts: {
    heading: "Outfit, 'Open Sans', sans-serif",
    body: "Outfit, 'Open Sans', sans-serif",
  },

})
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
