import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { TConfiguracion, TPerfil } from '../../../types/core/core.types'

export type UserState = {
    perfil?: TPerfil | null
    configuracion?: TConfiguracion | null
    authority?: string[]
}

const initialState: UserState = {
    perfil: null as TPerfil | null,
    configuracion: null as TConfiguracion | null,
    authority: [],
    
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.perfil = action.payload?.perfil
            state.configuracion = action.payload?.configuracion
            state.authority = action.payload?.authority
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer