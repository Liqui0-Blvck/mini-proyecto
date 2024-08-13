import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { TGimnasio } from '../../../types/gimnasio/TGimnasio.type'
import { stat } from 'fs'

export type GimnasiosState = {
  gimnasio: TGimnasio | null
  gimnasios: TGimnasio[] | null
}

const initialState: GimnasiosState = {
  gimnasio: null as TGimnasio | null,
  gimnasios: [] as TGimnasio[] | []
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}`,
    initialState,
    reducers: {
      setGimnasio(state, action: PayloadAction<TGimnasio>) {
        state.gimnasio = action.payload
      },
      setGimnasioActualizado(state, action: PayloadAction<TGimnasio>) {
        state.gimnasios = state.gimnasios?.map((gimnasio) => {
          if (gimnasio.id === action.payload.id) {
            return action.payload
          }
          return gimnasio
        }) || []
      },
      setGimnasios(state, action: PayloadAction<TGimnasio[]>) {
        state.gimnasios = action.payload
      }
    },
})

export const { 
  setGimnasio, 
  setGimnasios,
  setGimnasioActualizado
} = userSlice.actions
export default userSlice.reducer