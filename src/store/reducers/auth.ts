import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '../../types/User';
import { serverURL } from '../../utils/constants';
import { alertSlice } from './alert';

const {show} = alertSlice.actions;

interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  error: string | boolean;
  userId?: string
}

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  error: false,
}

export const signInUser = createAsyncThunk<
  {password: string, data: IUser},
  {email: string, password: string}
  >(
  'auth/signIn',
  async ({email, password}, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(`${serverURL}/users?email=${email}&_limit=1`);
      if (response.data[0] == null) {
        thunkAPI.dispatch(show({text: 'Пользователь с такой почтой не найден', type: 'warning'}));
        return thunkAPI.rejectWithValue('Пользователь с такой почтой не найден');
      }
      if (password !== response.data[0].password) {
        thunkAPI.dispatch(show({text: 'Неправильный пароль', type: 'error'}));
        return thunkAPI.rejectWithValue('Неправильный пароль');
      }
      return {password, data: response.data[0]}
    } catch (e) {
      thunkAPI.dispatch(show({text: 'Не удалось загрузить пользователя', type: 'error'}));
      return thunkAPI.rejectWithValue('Не удалось загрузить пользователя')
    }
  }
)

export const signUpUser = createAsyncThunk<
  IUser,
  IUser
  >(
  'auth/signUp',
  async ({email, password}, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:3000/users`, {
        email,
        password,
        contacts: []
      });
      return response.data;
    } catch (e) {
      thunkAPI.dispatch(show({text: 'Ошибка при регистрации нового пользователя', type: 'error'}));
      return thunkAPI.rejectWithValue('Ошибка при регистрации нового пользователя')
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: () => {}
  },
  extraReducers: {
    [signInUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    [signInUser.fulfilled.type]: (state, {payload}) => {
      state.isAuth = true;
      state.userId = payload.data.id
      state.isLoading = false;
    },
    [signInUser.rejected.type]: (state, {payload}) => {
      state.isAuth = false;
      state.isLoading = false;
      state.error = payload || true;
    },

    [signUpUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    [signUpUser.fulfilled.type]: (state, {payload}) => {
      state.isAuth = true;
      state.userId = payload.id;
      state.isLoading = false;
    },
    [signUpUser.rejected.type]: (state, {payload}) => {
      state.isAuth = false;
      state.isLoading = false;
      state.error = payload || true;
    }
  },
})
export default authSlice.reducer;
