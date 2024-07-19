import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { AuthTokens } from '../../../types/core/core.types'

export interface SessionState {
    signedIn: boolean
    token: string | null
    refresh: string | null
}

const initialState: SessionState = {
    signedIn: false,
    token: null,
    refresh: null
}


const sessionSlice = createSlice({
    name: `${SLICE_BASE_NAME}/session`,
    initialState,
    reducers: {
        signInSuccess(state, action: PayloadAction<AuthTokens>) {
            state.signedIn = true
            state.token = action.payload.access
            state.refresh = action.payload.refresh
        },
        signOutSuccess(state) {
            state.signedIn = false
            state.token = null
        },
        tokenRefrescado(state, action: PayloadAction<string>){
            state.token = action.payload
        }
    },
})

export const { signInSuccess, signOutSuccess, tokenRefrescado } = sessionSlice.actions
export default sessionSlice.reducer