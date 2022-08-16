import { createSlice } from '@reduxjs/toolkit';

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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: () => {},
    signup: () => {}
  },
})

export default authSlice.reducer;
