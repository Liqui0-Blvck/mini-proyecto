import { createAsyncThunk } from "@reduxjs/toolkit"
import { FetchAction, PostActions } from "../../../types/peticiones/peticiones.types"
import { verificarToken } from "../auth/authSlices"
import { fetchWithToken, fetchWithTokenPatch, fetchWithTokenPost } from "../../../api/peticionesBase"
import { toast } from "react-toastify"
import { setAsistenciaMiembro, setMiembro, setMiembros } from "./miembrosSlice"
import { SLICE_BASE_NAME } from "./constants"
import { SessionState } from "../auth/sessionSlice"

export const obtener_lista_miembros = createAsyncThunk(
  `${SLICE_BASE_NAME}/obtener_lista_miembros`,
  async (payload: FetchAction, ThunkApi) => {
    const { token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithToken(`api/miembros/`, token_verificado)
      if (res.status){
        return ThunkApi.dispatch(setMiembros(res.data))
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

export const obtener_miembro_dueno = createAsyncThunk(
  `${SLICE_BASE_NAME}/obtener_miembro`,
  async (payload: FetchAction, ThunkApi) => {
    const { id, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithToken(`api/miembros/${id}/`, token_verificado)
      if (res.status){
        return ThunkApi.dispatch(setMiembro(res.data))
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

export const obtener_miembro = createAsyncThunk(
  `${SLICE_BASE_NAME}/obtener_miembro`,
  async (payload: FetchAction, ThunkApi) => {
    const { id, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithToken(`api/miembros/miembro/?perfil=${id}`, token_verificado)
      if (res.status){
        return ThunkApi.dispatch(setMiembro(res.data))
      }
    } catch (error: any) {
      // for (const [key, value] of Object.entries(error.response.data)) {
      //   toast.error(`${key}: ${value}`, {
      //     autoClose: 2000
      //   })
      // }

      return ThunkApi.rejectWithValue('No se pudo actualizar')
    }
  }
)


export const obtener_asistencia_miembro = createAsyncThunk(
  `${SLICE_BASE_NAME}/obtener_asistencia_miembro`,
  async (payload: FetchAction, ThunkApi) => {
    const { id, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithToken(`api/miembros/asistencia_miembro/?uid=${id}`, token_verificado)
      if (res.status){
        return ThunkApi.dispatch(setAsistenciaMiembro(res.data))
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

// export const asistencia_miembro = createAsyncThunk(
//   `${SLICE_BASE_NAME}/asistencia_miembro`,
//   async (payload: FetchAction, ThunkApi) => {
//     const { id, token } = payload

//     try {
//       const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
//       if (!token_verificado) throw new Error('No esta verificado el token')
//       const res = await fetchWithToken(`api/miembros/${id}/asistencia/`, token_verificado)
//       if (res.status){
//         toast.success('Asistencia registrada', {
//           autoClose: 2000
//         })
//         return res.data
//       }
//     } catch (error: any) {
//       console.log(Object.entries(error.response.data))
//       for (const [key, value] of Object.entries(error.response.data)) {
//         toast.error(`${key}: ${value}`, {
//           autoClose: 2000
//         })
//       }

//       return ThunkApi.rejectWithValue('No se pudo registrar la asistencia')
//     }
//   }
// )







// POST ACTION

export const registrar_miembros = createAsyncThunk(
  `${SLICE_BASE_NAME}/registrar_miembros`,
  async (payload: PostActions, ThunkApi) => {
    const { data, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithTokenPost(`api/miembros/registro_miembro/`, data, token_verificado)
      if (res.status){
        toast.success('Miembro registrado', {
          autoClose: 2000
        })
        ThunkApi.dispatch(obtener_lista_miembros({ token }))
        return res.data
      }
    } catch (error: any) {
      console.log(Object.entries(error.response.data))
      for (const [key, value] of Object.entries(error.response.data)) {
        toast.error(`${key}: ${value}`, {
          autoClose: 2000
        })
      }

      return ThunkApi.rejectWithValue('No se pudo registrar')
    }
  }
)

export const mandar_correo_confirmacion = createAsyncThunk(
  `${SLICE_BASE_NAME}/mandar_correo_confirmacion`,
  async (payload: { id: string, token: SessionState}, ThunkApi) => {
    const { id, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithTokenPost(`api/miembros/enviar_mensaje_registro/`, { uid: id }, token_verificado)
      if (res.status){  
        toast.success('Correo de confirmación enviado', {
          autoClose: 2000
        })
        return res.data
      }
    } catch (error: any) {
      console.log(Object.entries(error.response.data))
      for (const [key, value] of Object.entries(error.response.data)) {
        toast.error(`${key}: ${value}`, {
          autoClose: 2000
        })
      }

      return ThunkApi.rejectWithValue('No se pudo enviar el correo')
    }
  }
)


export const actualizar_contraseña_miembro = createAsyncThunk(
  `${SLICE_BASE_NAME}/actualizar_contraseña_miembro`,
  async (payload: { params: Record<string, string>}, ThunkApi) => {
    const { params } = payload
    //@ts-ignore
    const { uid, token, new_password, re_new_password } = params

    try { 
      //@ts-ignore
      const res = await fetch(`${import.meta.env.VITE_URL_PRO}auth/cambiar-contrasena/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid,
          token: token,
          new_password: new_password,
          re_new_password: re_new_password
        }),
      });

      return res
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



// PATCH ACTION
export const actualizar_miembros = createAsyncThunk(
  `${SLICE_BASE_NAME}/actualizar_miembros`,
  async (payload: PostActions, ThunkApi) => {
    const { id, data, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithTokenPatch(`api/miembros/${id}/`, data, token_verificado)
      if (res.status){
        toast.success('Miembro actualizado', {
          autoClose: 2000
        })
        return res.data
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


// DELETE ACTION
export const eliminar_miembros = createAsyncThunk(
  `${SLICE_BASE_NAME}/eliminar_miembros`,
  async (payload: FetchAction, ThunkApi) => {
    const { id, token } = payload

    try {
      const token_verificado = await ThunkApi.dispatch(verificarToken({ token })).unwrap()
      if (!token_verificado) throw new Error('No esta verificado el token')
      const res = await fetchWithToken(`api/miembros/${id}/`, token_verificado)
      if (res.status){
        toast.success('Miembro eliminado', {
          autoClose: 2000
        })
        return res.data
      }
    } catch (error: any) {
      console.log(Object.entries(error.response.data))
      for (const [key, value] of Object.entries(error.response.data)) {
        toast.error(`${key}: ${value}`, {
          autoClose: 2000
        })
      }

      return ThunkApi.rejectWithValue('No se pudo eliminar')
    }
  }
)