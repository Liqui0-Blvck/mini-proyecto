import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { TMiembro } from '../../../types/miembros/miembros.type'


export type MiembrosState = {
  miembro: TMiembro | null,
  miembros: TMiembro[]  | []
}

const initialState: MiembrosState = {
  miembro: null as TMiembro | null,
  miembros: [] as TMiembro[] | []
}

const miembroSlice = createSlice({
    name: `${SLICE_BASE_NAME}`,
    initialState,
    reducers: {
      setMiembros(state, action: PayloadAction<TMiembro[]>) {
        state.miembros = action.payload
      },
      setMiembro(state, action: PayloadAction<TMiembro>) {
        state.miembro = action.payload
      },

    },
})

export const { 
  setMiembros, 
  setMiembro,
} = miembroSlice.actions
export default miembroSlice.reducer