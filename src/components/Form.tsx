import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Select,
} from '@chakra-ui/react'
import { toast } from 'react-hot-toast'

import { useBebida, useCategoria } from '../store/zustand'

const Form = () => {
  const { categoria, fetchCategoria } = useCategoria((state) => state)
  const { getBebida } = useBebida((state) => state)
  const [busqueda, setBusqueda] = useState({
    nombre: '',
    categoria: '',
  })

  useEffect(() => {
    fetchCategoria()
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (Object.values(busqueda.nombre).includes('')) {
      return toast.error('Debe ingresar un nombre o una categoría')
    }

    getBebida(busqueda)
  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(2, 1fr)',
        }}
        alignItems='center'
        gap={6}
      >
        <Box>
          <FormControl isRequired>
            <FormLabel  >Nombre de la Bebida</FormLabel>
            <Input
              type='text'
              value={busqueda.nombre}
              name='nombre'
              onChange={(e) =>
                setBusqueda({ ...busqueda, [e.target.name]: e.target.value })
              }
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Categoría</FormLabel>

            <Select
              placeholder='Select option'
              value={busqueda.categoria}
              name='categoria'
              onChange={(e) =>
                setBusqueda({ ...busqueda, [e.target.name]: e.target.value })
              }
            >
              {categoria.map((cat: any) => (
                <option key={cat.strCategory} value={cat.strCategory}>
                  {cat.strCategory}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Button my='5' w='full' type='submit'>
        Buscar Bebidas
      </Button>
    </form>
  )
}

export default Form
