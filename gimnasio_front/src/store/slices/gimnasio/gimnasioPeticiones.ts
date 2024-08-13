import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FetchAction, PatchAction, PostActions } from "../../../types/peticiones/peticiones.types";
import { fetchWithToken, fetchWithTokenDelete, fetchWithTokenPatchFormData, fetchWithTokenPost, fetchWithTokenPostFormData } from "../../../api/peticionesBase";
import { verificarToken } from "../auth/authSlices";
import { setGimnasio, setGimnasioActualizado, setGimnasios } from "./gimnasioSlice";
import { TAB_GYM } from "../../../pages/Gimnasios/GimnasioButtons";

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

export const obtener_gimnasios = createAsyncThunk(
  'gimnasio/obtener_gimnasios',
  async (payload: FetchAction, ThunkApi) => {
    const { token } = payload
    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithToken('api/gimnasios/', token_verificado)
      if (res.status){
        return ThunkApi.dispatch(setGimnasios(res.data))
      }
    } catch (error: any) {
      toast.error('No se pudo obtener', {
        autoClose: 500
      })
      return ThunkApi.rejectWithValue('No se pudo actualizar')
    }
  }
)

export const actualizar_gimnasio_activo = createAsyncThunk(
  'gimnasio/actualizar_gimnasio_activo',
  async (payload: PatchAction, ThunkApi) => {
    const { data, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithTokenPost(`api/gimnasios/activo/`, data, token_verificado)
      if (res.status){
        toast.success(`Gimnasio Activo ${res.data.nombre}`, {
          autoClose: 700
        })
        ThunkApi.dispatch(setGimnasio(res.data))
        return ThunkApi.dispatch(obtener_gimnasios({ token }))
      
      }
    } catch (error: any) {
      toast.error('No se pudo obtener', {
        autoClose: 500
      })
      return ThunkApi.rejectWithValue('No se pudo actualizar')
    }
  }
)


export const actualizar_gimnasio = createAsyncThunk(
  'gimnasio/actualizar_gimnasio',
  async (payload: PatchAction, ThunkApi) => {
    const { id, data, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithTokenPatchFormData(`api/gimnasios/${id}/`,data, token_verificado)
      if (res.status){
        toast.success('Gimnasio Actualizado Exitosamente', {
          autoClose: 700
        })
        ThunkApi.dispatch(setGimnasioActualizado(res.data))
        return ThunkApi.dispatch(setGimnasio(res.data))
      }
    } catch (error: any) {
      toast.error('No se pudo obtener', {
        autoClose: 500
      })
      return ThunkApi.rejectWithValue('No se pudo actualizar')
    }
  }
)

export const registrar_gimnasio = createAsyncThunk(
  'gimnasio/registrar_gimnasio',
  async (payload: PostActions, ThunkApi) => {
    const { data, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithTokenPostFormData(`api/gimnasios/`, data, token_verificado)
      if (res.status){
        toast.success('Gimnasio Registrado Exitosamente', {
          autoClose: 700
        })
        return ThunkApi.dispatch(obtener_gimnasios({ token }))

      }
    } catch (error: any) {
      console.log(Object.entries(error.response.data))
      for (const [key, value] of Object.entries(error.response.data)) {
        toast.error(`${key}: ${value}`, {
          autoClose: 2000
        })
      }

      return ThunkApi.rejectWithValue('No se pudo actualizar')
    }
  }
)

export const eliminar_gimnasio = createAsyncThunk(
  'gimnasio/eliminar_gimnasio',
  async (payload: FetchAction, ThunkApi) => {
    const { id, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithTokenDelete(`api/gimnasios/${id}/`, token_verificado)
      if (res.status){
        toast.success('Gimnasio Eliminado Exitosamente', {
          autoClose: 700
        })
        return ThunkApi.dispatch(obtener_gimnasios({ token }))
      }
    } catch (error: any) {
      toast.error('No se pudo obtener', {
        autoClose: 500
      })
      return ThunkApi.rejectWithValue('No se pudo actualizar')
    }
  }
)