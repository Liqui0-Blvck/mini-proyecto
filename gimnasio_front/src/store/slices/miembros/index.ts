import { combineReducers } from '@reduxjs/toolkit'
import miembro, { MiembrosState } from './miembrosSlice'
 
const reducer = combineReducers({
  miembro
})

export type MiembroState = {
  miembro: MiembrosState
}


export default reducer