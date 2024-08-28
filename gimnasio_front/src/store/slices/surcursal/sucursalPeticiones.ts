import { createAsyncThunk } from "@reduxjs/toolkit";
import { verificarToken } from "../auth/authSlices";
import { fetchWithToken, fetchWithTokenPatch, fetchWithTokenPost } from "../../../api/peticionesBase";
import { FetchAction, PostActions } from "../../../types/peticiones/peticiones.types";
import { setSucursal, setSucursales } from "./sucursalSlice";


export const obtener_sucursal = createAsyncThunk(
  'sucursal/obtener_sucursal',
  async (payload: FetchAction, ThunkApi) => {
    const { id, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithToken(`api/gimnasios/${id}/sucursal`, token_verificado)
      if (res.status){
        return ThunkApi.dispatch(setSucursal(res.data))
      }

    } catch (error: any) {
      return ThunkApi.rejectWithValue('No se pudo obtener')
    }
  }
)

export const obtener_sucursales = createAsyncThunk(
  'sucursal/obtener_sucursales',
  async (payload: FetchAction, ThunkApi) => {
    const { id, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithToken(`api/gimnasios/${id}/sucursales/`, token_verificado)
      if (res.status){
        return ThunkApi.dispatch(setSucursales(res.data))
      }

    } catch (error: any) {
      return ThunkApi.rejectWithValue('No se pudo obtener')
    }
  }
)


export const actualizar_sucursal = createAsyncThunk(
  'sucursal/actualizar_sucursal',
  async (payload: PostActions, ThunkApi) => {
    const { id, data, token, params } = payload
    // @ts-ignore
    const { id_gym } = params

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithTokenPatch(`api/gimnasios/${id_gym}/sucursales/${id}/`, data, token_verificado)
      if (res.status){
        return ThunkApi.dispatch(setSucursal(res.data))
      }

    } catch (error: any) {
      return ThunkApi.rejectWithValue('No se pudo actualizar')
    }
  }
)

