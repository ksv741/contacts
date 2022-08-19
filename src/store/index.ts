import { combineReducers, configureStore } from '@reduxjs/toolkit'
import auth from './reducers/auth'
import contacts from './reducers/contacts'
import alert from './reducers/alert'
import { contactsApi } from './service/contacts';

const rootReducer = combineReducers({
  auth,
  contacts,
  alert,
  [contactsApi.reducerPath]: contactsApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(contactsApi.middleware),
    devTools: true,
  })
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
