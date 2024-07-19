// hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './store';
import { RootState } from './rootReducer';


// Uso de dispatch con el tipo AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Uso de selector con el tipo RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
