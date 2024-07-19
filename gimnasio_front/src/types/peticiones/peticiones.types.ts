import { SessionState } from "../../store/slices/auth/sessionSlice"

export type PostActions = {
  token: SessionState
  data?: any
  params?: Record<string, any>
}

export type FetchAction = {
  id?: string | number | undefined
  token: SessionState
}
