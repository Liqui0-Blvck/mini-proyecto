import { combineReducers } from '@reduxjs/toolkit'
import sucursal, { SucursalesState } from './sucursalSlice'

const reducer = combineReducers({
  sucursal
})

export type SucursalState = {
  sucursal: SucursalesState
}


export default reducer