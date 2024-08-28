import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { IAsistencia, TMiembro } from '../../../types/miembros/miembros.type'


export type MiembrosState = {
  miembro: TMiembro | null
  miembros: TMiembro[]  | []
  asistencia_miembro: IAsistencia[] | []
}

const initialState: MiembrosState = {
  miembro: null as TMiembro | null,
  miembros: [] as TMiembro[] | [],
  asistencia_miembro: [] as IAsistencia[] | []
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
      setAsistenciaMiembro(state, action: PayloadAction<IAsistencia[]>) {
        state.asistencia_miembro = action.payload
      }

    },
})

export const { 
  setMiembros, 
  setMiembro,
  setAsistenciaMiembro
} = miembroSlice.actions
export default miembroSlice.reducer