import { combineReducers, configureStore } from '@reduxjs/toolkit'
import auth from './reducers/auth'
import contacts from './reducers/contacts'

const rootReducer = combineReducers({
  auth,
  contacts
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  })
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
