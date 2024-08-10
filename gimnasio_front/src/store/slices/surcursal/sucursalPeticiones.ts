import { createAsyncThunk } from "@reduxjs/toolkit";
import { verificarToken } from "../auth/authSlices";
import { fetchWithToken, fetchWithTokenPost } from "../../../api/peticionesBase";
import { FetchAction } from "../../../types/peticiones/peticiones.types";

export const obtener_sucursales = createAsyncThunk(
  'sucursal/obtener_sucursales',
  async (payload: FetchAction, ThunkApi) => {
    const { id, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithToken(`api/gimnasios/${id}/sucursales/`, token_verificado)
      if (res.status){
        return res.data
      }

    } catch (error: any) {
      return ThunkApi.rejectWithValue('No se pudo obtener')
    }
  }
)