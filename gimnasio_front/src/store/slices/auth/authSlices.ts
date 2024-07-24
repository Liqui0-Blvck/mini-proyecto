import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchAction, PostActions } from "../../../types/peticiones/peticiones.types";
import { fetchWithToken, fetchWithTokenPatch, fetchWithTokenPost } from "../../../api/peticionesBase";
import { SessionState, signInSuccess, tokenRefrescado } from "./sessionSlice";
import axios, { delay } from '../../../config/axios.config'
import { AuthTokens, TConfiguracion, TPerfil } from "../../../types/core/core.types";
import { toast } from "react-toastify";
import { setDataPerfil, setUser } from "./userSlice";



export const refrescarToken = createAsyncThunk(
  'auth/refrescar_token',
  async (payload: { token: SessionState}, ThunkApi) => {
    const { token } = payload
    if (!token) throw new Error('No existe el token')
    const res = await axios.post('auth/jwt/refresh/', {
      refresh: token.refresh
    })
    if (res.status === 200){
      ThunkApi.dispatch(tokenRefrescado(res.data.access))
      return res.data
    } else {
        throw new Error('Token inválido');
      }
  }
);

export const verificarToken = createAsyncThunk(
  'auth/verificacion_token',
  async (payload: { token: SessionState}, ThunkApi) => {
    const { token } = payload;
    if (!token) throw new Error('No existe el token');

    try {
      const res = await axios.post('auth/jwt/verify/', {
        token: token.token,
      })

      if (res.status === 200) return token;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        const refreshedToken = await ThunkApi.dispatch(refrescarToken({ token: token })).unwrap();
        return refreshedToken; // Retorna el nuevo token refrescado
      } else {
        toast.error('Error al verificar el token');
        throw error; // Lanza el error para que sea manejado por el llamado del thunk
      }
    }
  }
);

export const obtener_me = createAsyncThunk(
  'auth/obtener_me',
  async (payload: { token: string }, ThunkApi) => {
    const { token } = payload
    try {
      const res = await fetchWithToken(`auth/users/me/`, token)
      if (res.status === 200){
        const data = res.data
        return data
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue('No se pudo realizar la petición')
    }
  }
)


export const obtener_perfil = createAsyncThunk(
  'auth/obtener_perfil',
  async (payload: { token: string, id: number }, ThunkApi) => {
    const { token, id } = payload
    try {
      const res = await fetchWithToken(`api/perfil/${id}`, token)
      if (res.status === 200){
        const data: TPerfil = res.data
        return data
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue('No se pudo realizar la petición')
    }
  }
)

export const obtener_configuracion = createAsyncThunk(
  'auth/obtener_configuracion',
  async (payload: { id: string | number | undefined, token: string }, ThunkApi) => {
    const { id, token } = payload
    if (!token) throw new Error('No existe el token');
    try {
      const res = await fetchWithToken(`api/perfil/${id}/configuracion`, token)
      if (res.status === 200){
        const data: TConfiguracion = res.data
        return data
      }
    } catch (error: any) {
      return ThunkApi.rejectWithValue('No se pudo realizar la petición')
    }
  }
)

export const onLogin = createAsyncThunk(
  'auth/login',
  async (payload: { data: { email: string, password: string },  navigate: any}, ThunkApi) => {
    const { data, navigate } = payload
    try {
      const res = await axios.post<AuthTokens>(`auth/jwt/create`, data)
      if (res.status === 200){
        const data: AuthTokens = res.data
        ThunkApi.dispatch(signInSuccess(res.data))
        const me = await ThunkApi.dispatch(obtener_me({ token: data.access! })).unwrap()
        const perfil: TPerfil | undefined = await ThunkApi.dispatch(obtener_perfil({ id: me.id, token: data.access! })).unwrap()
        const configuracion = await ThunkApi.dispatch(obtener_configuracion({ id: perfil?.id, token: data.access! })).unwrap()
        ThunkApi.dispatch(setUser({ perfil, configuracion }))
        toast.success('Inicio sesión correcto', {
          autoClose: 300,
          onClose: () => {
            navigate('/home', { replace: true })
          }
        });
      } 
    } catch (error: any) {
      if (error.response && error.response.status) {
        toast.error('No se ha encontrado una cuenta con estas credenciales');
      }
    }
  }
)


export const onSignUp = createAsyncThunk(
  'auth/sign-up',
  async (payload: { data: { email: string, password: string, re_password: string },  navigate: any}) => {
    const { data, navigate } = payload

    try {
      //@ts-ignore
      const res = await fetch(`${import.meta.env.VITE_URL_DEV}/auth/users/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (res.ok){
        toast.success('Se registrado exitosamente', {
          autoClose: 300,
          onClose: () => {
            navigate('/login', { replace: true })
          }
        });
      }

    } catch (error: any) {
      if (error.response && error.response.status) {
        toast.error('No se ha encontrado una cuenta con estas credenciales');
      }
    }
  }
)




// Actualizacion de datos 

export const actualizar_perfil = createAsyncThunk(
  'auth/actualizar_perfil',
  async (payload: PostActions, ThunkApi) => {
    const { id, data, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithTokenPatch(`api/perfil/actualizar_perfil/?usuario=${id}`, data, token_verificado)
      if (res.status){
        toast.success('Perfil Actualizado exitosamente', {
          autoClose: 500,
        })
        return ThunkApi.dispatch(setDataPerfil(res.data))
      }
    } catch (error: any) {
      toast.error('No se pudo actualizar', {
        autoClose: 500
      })
      return ThunkApi.rejectWithValue('No se pudo actualizar')
    }

  })