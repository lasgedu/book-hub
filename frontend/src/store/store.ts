import { configureStore } from '@reduxjs/toolkit'
import filteringReducer from '../state/filtering/filteringSlice'

export const store = configureStore({
  reducer: {
    filtering: filteringReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


