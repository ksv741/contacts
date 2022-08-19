import { createSlice } from '@reduxjs/toolkit';
import { IContact } from '../../types/Contact';

export type ModeType = 'none' | 'create' | 'edit';

interface ContactsState {
  contacts: IContact[];
  currentContactId?: string | number;
  mode: ModeType;
}

const initialState: ContactsState = {
  contacts: [] as IContact[],
  currentContactId: '',
  mode: 'none',
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    select: (state, action: { payload: string | number }) => {
      state.currentContactId = action.payload;
      state.mode = 'none';
    },
    edit: (state, action: {payload: string | number}) => {
      state.currentContactId = action.payload;
      state.mode = 'edit';
    },
    create: (state) => {
      delete state.currentContactId;
      state.mode = 'create';
    },
    remove: (state) => {
      delete state.currentContactId;
      state.mode = 'none';
    },
  }
});

export default contactsSlice.reducer;
