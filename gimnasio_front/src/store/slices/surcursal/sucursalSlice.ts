import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { TGimnasio, TSucursal } from '../../../types/gimnasio/TGimnasio.type'

export type SucursalesState = {
  sucursal: TSucursal | null
  sucursales: TSucursal[] | null
}

const initialState: SucursalesState = {
  sucursal: null as TSucursal | null,
  sucursales: [] as TSucursal[] | []
}

const sucursalSlice = createSlice({
    name: `${SLICE_BASE_NAME}`,
    initialState,
    reducers: {
      setSucursal(state, action: PayloadAction<TSucursal>) {
        state.sucursal = action.payload
      },
      setSucursales(state, action: PayloadAction<TSucursal[]>) {
        state.sucursales = action.payload
      }
    },
})

export const { setSucursal, setSucursales } = sucursalSlice.actions
export default sucursalSlice.reducer