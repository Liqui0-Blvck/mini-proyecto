import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FetchAction, PostActions } from "../../../types/peticiones/peticiones.types";
import { fetchWithToken } from "../../../api/peticionesBase";
import { verificarToken } from "../auth/authSlices";
import { setGimnasio } from "./gimnasioSlice";

export const obtener_gimnasio = createAsyncThunk(
  'gimnasio/obtener_gimnasio',
  async (payload: FetchAction, ThunkApi) => {
    const { id, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithToken(`api/gimnasios/gimnasio/?dueno=${id}`, token_verificado)
      if (res.status){
        return ThunkApi.dispatch(setGimnasio(res.data))
      }
    } catch (error: any) {
      toast.error('No se pudo obtener', {
        autoClose: 500
      })
      return ThunkApi.rejectWithValue('No se pudo actualizar')
    }
  }
);

export const actualizar_gimnasio = createAsyncThunk(
  'gimnasio/actualizar_gimnasio',
  async (payload: FetchAction, ThunkApi) => {
    const { id, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithToken(`api/gimnasios/${id}`, token_verificado)
      if (res.status){
        toast.success('Gimnasio Actualizado Exitosamente', {
          autoClose: 700
        })
        return ThunkApi.dispatch(setGimnasio(res.data))
      }
    } catch (error: any) {
      toast.error('No se pudo obtener', {
        autoClose: 500
      })
      return ThunkApi.rejectWithValue('No se pudo actualizar')
    }
  }
);