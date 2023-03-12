import axios from 'axios'
import { create } from 'zustand'
interface CategoriaState {
  categoria: string[]
  addCategoria: (categoria: string) => void
  fetchCategoria: () => Promise<void>
}

interface BebidaState {
  bebida: any[]
  id: string
  details: any[]
  addBebida: (bebida: any) => void
  getId: (id: any) => void
  getBebida: (bebida: { nombre: string; categoria: string }) => Promise<void>
  getDatils: (id: any) => Promise<void>
  getIngredientes: (id: any) => Promise<void>

}



export const useCategoria = create<CategoriaState>((set) => ({
  categoria: [],
  addCategoria: (categoria: string) => set((state) => ({ categoria: [...state.categoria, categoria] })),
  fetchCategoria: async () => {
    const { data } = await axios(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    )

    set({ categoria: data.drinks })
  },
}))

export const useBebida = create<BebidaState>((set) => ({

  bebida: [],
  details: [],
  id: '',
  addBebida: (bebida: any) => set((state) => ({ bebida: [...state.bebida, bebida] })),
  getBebida: async (bebida) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${bebida?.nombre!}&c=${bebida?.categoria!}`
      if (bebida === null) return
      const { data } = await axios(url)
      set({ bebida: data?.drinks })

    } catch (error) {
      console.log(error)
    }
  },
  getId: (id) => set({ id: id }),

  getDatils: async (id) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      const { data } = await axios(url)
      set({ details: data.drinks })
    } catch (error) {
      console.log(error)
    }
  },
  getIngredientes: async (id) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      const { data } = await axios(url)
      set({ bebida: data.drinks })
    } catch (error) {
      console.log(error)
    }
  }
}))
