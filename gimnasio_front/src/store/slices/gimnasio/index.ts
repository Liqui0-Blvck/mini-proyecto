import { combineReducers } from '@reduxjs/toolkit'
import gimnasio, { GimnasiosState } from './gimnasioSlice'

const reducer = combineReducers({
  gimnasio
})

export type GimnasioState = {
  gimnasio: GimnasiosState
}


export default reducer