// @ts-nocheck
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { Fragment } from 'react'
import { useBebida } from '../store/zustand'

const Bebida = () => {
  const { bebida, getDatils, resetDetails, details } = useBebida(
    (state) => state
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleDetails = (id: any) => {
    onOpen()
    getDatils(id)
    resetDetails()
  }
  const ingredientes = () => {
    let ing: Array<String> = []
    for (let i = 1; i < 16; i++) {

      if (details[0][`strIngredient${i}`]) {
        ing.push(

          <li>
            {details[0][`strIngredient${i}`]} {details[0][`strMeasure${i}`]}
          </li>
        )
      }
    }
    return ing
  }

  return (
    <>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={6}
        mt='8'
      >
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

            <Box display='grid' placeContent='center'>
              <Button
                my='5'
                color='white'
                bg='red.300'
                _hover={{
                  bg: 'red.400',
                }}
                onClick={() => handleDetails(res.idDrink)}
              >
                Ver receta
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>
      {details.map((detail) => (
        <Fragment key={detail.idDrink}>
          <Modal
            size={{
              base: 'xs',
              md: 'md',
              lg: 'lg',
            }}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize='2xl'>{detail.strDrink}</ModalHeader>
              <ModalCloseButton />

              <Image src={detail.strDrinkThumb} alt={detail.strDrink} />

              <ModalBody>
                <Text fontWeight='800' fontSize='3xl'>
                  {detail.strCategory}
                </Text>
                <Text fontWeight='600' fontSize='md' my='2'>
                  {detail.strAlcoholic}
                </Text>
                <Text>{detail.strInstructions}</Text>
                <Text fontWeight='800' fontSize='3xl' my='2'>
                  Ingredientes
                </Text>

                <Box fontWeight='600' mx='5'>
                  <ul key={detail.idDrink}>{ingredientes()}</ul>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button
                  width='full'
                  bg='red.300'
                  fontWeight='500'
                  color='white'
                  _hover={{
                    bg: 'red.500',
                  }}
                  onClick={onClose}
                  m={3}
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Fragment>
      ))}
    </>
  )
}

export default Bebida
