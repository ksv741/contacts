import { AlertColor } from '@mui/material/Alert/Alert';
import { createSlice } from '@reduxjs/toolkit';

interface AlertState {
  text: string;
  isOpen: boolean;
  type: AlertColor;
  autoHideDuration: number;
}

const initialState: AlertState = {
  text: '',
  isOpen: false,
  type: 'info',
  autoHideDuration: 3000,
}

type ActionShowType = {
  payload: Partial<AlertState>
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    show: (state, action: ActionShowType) => {
      state.isOpen = true;
      state.text = action.payload.text || initialState.text;
      state.type = action.payload.type || initialState.type;
      state.autoHideDuration = action.payload.autoHideDuration || initialState.autoHideDuration
    },
    hide: (state) => {
      state.isOpen = initialState.isOpen;
      state.text = initialState.text;
    },
  },

})
export default alertSlice.reducer;
