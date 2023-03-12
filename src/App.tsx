import axios from 'axios'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import toast, { Toaster } from 'react-hot-toast'
import { Fragment, useEffect, useState } from 'react'
import { useBebida, useCategoria } from './store/zustand'
import { calcLength } from 'framer-motion'

function App() {
  const { categoria, fetchCategoria } = useCategoria((state) => state)
  const { bebida, getDatils, getBebida, addBebida, getId, details } = useBebida(
    (state) => state
  )
  console.log(details)
  const [busqueda, setBusqueda] = useState({
    nombre: '',
    categoria: '',
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    fetchCategoria()
  }, [])

  useEffect(() => {
    getBebida(busqueda)
  }, [busqueda])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (busqueda.nombre.trim() === '' && busqueda.categoria.trim() === '') {
      toast.error('Debe ingresar un nombre o una categoría')
      return
    }
    addBebida(busqueda)

  }

  const handleDetails = (id: any) => {
    onOpen()
    getId(id)

    getDatils(id)
  }

  return (
    <>
      <Toaster />
      <Box as='header' bg='tomato' w='100%' py='8' color='white'>
        <Heading as='h1' size='xl' textAlign='center'>
          Buscador de Bebidas
        </Heading>
      </Box>
      <Container maxW='container.xl' py='8'>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Grid templateColumns='repeat(2, 1fr)' alignItems='center' gap={6}>
              <Box>
                <FormLabel>Nombre de la Bebida</FormLabel>
                <Input
                  type='text'
                  value={busqueda.nombre}
                  onChange={(e) =>
                    setBusqueda({ ...busqueda, nombre: e.target.value })
                  }
                />
              </Box>
              <Box>
                <FormLabel>Categoría</FormLabel>

                <Select
                  placeholder='Select option'
                  value={busqueda.categoria}
                  onChange={(e) =>
                    setBusqueda({ ...busqueda, categoria: e.target.value })
                  }
                >
                  {categoria.map((cat: any) => (
                    <option key={cat.strCategory} value={cat.strCategory}>
                      {cat.strCategory}
                    </option>
                  ))}
                </Select>
              </Box>
            </Grid>
            <Button my='5' w='full' type='submit'>
              Buscar Bebidas
            </Button>
          </FormControl>
        </form>
        <Box as='section' mt='8'>
          <Heading as='h2' size='lg'>
            Resultados
          </Heading>
        </Box>
        <Grid templateColumns='repeat(3, 1fr)' key={'1'} gap={6} mt='8'>
          {bebida?.map((res: any) => (

            <Box key={res.idDrink} bg='gray.100' borderRadius='md'>
              <Box
                as='img'
                src={res.strDrinkThumb}
                alt={res.strDrink}
                borderTopRadius='md'
              />
              <Box p='4'>
                <Heading as='h3' size='md'>
                  {res.strDrink}
                </Heading>
              </Box>

              <Button onClick={() => handleDetails(res.idDrink)}>
                Open Modal
              </Button>

              <Box p='4'></Box>
            </Box>
          ))}
        </Grid>
        {details &&
          details.map((detail: any) => (
            <Modal

              size='xl'
              isOpen={isOpen}
              key={detail.idDrink}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{ }</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{detail.strInstructions}</ModalBody>

                <ModalFooter>
                  <Button onClick={onClose} mr={3}>
                    Cancel
                  </Button>
                  <Button
                    type='submit'
                    form='vulnerability_category_form'
                    colorScheme='blue'
                  >
                    Save
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          ))}
      </Container>
    </>
  )
}

export default App
