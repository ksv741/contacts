import { createSlice } from '@reduxjs/toolkit';
import { IContact } from '../../types/Contact';

interface ContactsState {
  contacts: IContact[];
  currentContact: string;
  isLoading: boolean;
  error: string | boolean;
}

const initialState: ContactsState = {
  contacts: [] as IContact[],
  currentContact: '',
  isLoading: false,
  error: false
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    edit: () => {},
    create: () => {},
    delete: () => {},
    find: () => {}
  }
});

export default contactsSlice.reducer;
