import {
  Box,
  Container,
  Heading,
} from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'
import Form from './components/Form'
import Bebida from './components/Bebida'

function App() {










  return (
    <>
      <Toaster />
      <Box as='header' bg='tomato' w='100%' py='8' color='white'>
        <Heading as='h1' size='xl' textAlign='center'>
          Buscador de Bebidas
        </Heading>
      </Box>
      <Container maxW='container.xl' py='8'>
        <Form />
        <Box as='section' mt='8'>
          <Heading as='h2' size='lg'>
            Resultados
          </Heading>
        </Box>

        <Bebida />
      </Container>
    </>
  )
}

export default App
