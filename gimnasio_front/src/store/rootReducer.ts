// rootReducer.ts
import { combineReducers, Reducer, AnyAction } from 'redux';
import auth, { AuthState } from './slices/auth';
import gimnasio, { GimnasioState } from './slices/gimnasio';

export type RootState = {
  auth: AuthState;
  gimnasio: GimnasioState
};

export interface AsyncReducers {
  [key: string]: Reducer<any, AnyAction>;
}

const staticReducers = {
  auth,
  gimnasio
};

const rootReducer = (asyncReducers?: AsyncReducers) => (
  state: RootState | undefined,
  action: AnyAction
) => {
  const combinedReducer = combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
  return combinedReducer(state, action);
};

export default rootReducer;
