import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IContact } from '../../types/Contact';
import { IUser } from '../../types/User';

interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  error: string | boolean;
}

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  error: false,
}

export const signInUser = createAsyncThunk<
  {password: string, data: IUser},
  {email: string, password: string},
  {rejectValue: string}
  >(
  'auth/signIn',
  async ({email, password}, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(`http://localhost:3000/users?email=${email}&_limit=1`);
      if (response.data[0] == null) return thunkAPI.rejectWithValue('Пользователь с такой почтой не найден');

      return {password, data: response.data[0]}
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось загрузить пользователя")
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: () => {}
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    })
    builder.addCase(signInUser.fulfilled, (state, {payload}) => {
      if (payload.password === payload.data.password) state.isAuth = true;
      else state.error = 'Неправильный пароль';
      state.isLoading = false;
    })
    builder.addCase(signInUser.rejected, (state, {payload}) => {
      state.isAuth = false;
      state.isLoading = false;
      state.error = payload || true;
    })
  }
})

export default authSlice.reducer;
