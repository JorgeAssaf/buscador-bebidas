import axios from 'axios'
import { create } from 'zustand'
import { Details } from './../types/indext'
interface CategoriaState {
  categoria: string[]
  fetchCategoria: () => Promise<void>
}

interface BebidaState {
  bebida: any[]
  id: string
  details: Details[]
  getId: (id: any) => void
  getBebida: (bebida: { nombre: string; categoria: string }) => Promise<void>
  getDatils: (id: any) => Promise<void>
  resetDetails: () => void
}

export const useCategoria = create<CategoriaState>((set) => ({
  categoria: [],

  fetchCategoria: async () => {
    const { data } = await axios(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    )

    set({ categoria: data?.drinks })
  },
}))

export const useBebida = create<BebidaState>((set) => ({
  bebida: [],
  details: [],
  id: '',
  ingredientes: [],
  resetDetails: () => set((state) => ({ details: (state.details = []) })),
  getBebida: async ({ categoria = '', nombre }) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}${categoria?.length > 0 ? `&c=${categoria}` : ''
        }`
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
      set({ details: data?.drinks })
    } catch (error) {
      console.log(error)
    }
  },
}))
