import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IContact } from '../../types/Contact';

export type ModeType = 'none' | 'create' | 'edit';

interface ContactsState {
  contacts: IContact[];
  currentContact?: IContact;
  mode: ModeType;
  getContactsLoading: boolean;
  actionContactsLoading: boolean;
  error: string | boolean;
}

const initialState: ContactsState = {
  contacts: [] as IContact[],
  actionContactsLoading: false,
  getContactsLoading: false,
  error: false,
  mode: 'none',
}

export const getContactList = createAsyncThunk<
  {list: IContact[], currentId: string},
  string
  >(
  'contacts/getContactList',
  async (selectedUserId, thunkAPI) => {
    try {
      // TODO
      // @ts-ignore
      const userId = thunkAPI.getState().auth.userId;
      const response = await axios.get<IContact[]>(`http://localhost:3000/contacts?user_id=${userId}`);
      return {list: response.data, currentId: selectedUserId}
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось загрузить список контактов")
    }
  }
)

export const createContact = createAsyncThunk<
  IContact,
  IContact
  >(
  'contacts/createContact',
  async (contact, thunkAPI) => {
    try {
      // TODO
      // @ts-ignore
      contact.user_id = thunkAPI.getState().auth.userId;
      const response = await axios.post<IContact>(`http://localhost:3000/contacts`, contact);
      if (!response.data.id) return thunkAPI.rejectWithValue('Не удалось добавить контакт')
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка при создании контакта')
    }
  }
)

export const updateContact = createAsyncThunk<
  IContact,
  IContact
  >(
  'contacts/updateContact',
  async (contact, thunkAPI) => {
    try {
      const {id, ...data} = contact;
      // TODO
      // @ts-ignore
      data.user_id = thunkAPI.getState().auth.userId;
      const response = await axios.put<IContact>(`http://localhost:3000/contacts/${id}`, data);
      if (!response.data.id) return thunkAPI.rejectWithValue('Не удалось изменить контакт')
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка при изменении контакта')
    }
  }
)

export const removeContact = createAsyncThunk<
  string,
  string
  >(
  'contacts/removeContact',
  async (id, thunkAPI) => {
    try {
      // TODO
      // @ts-ignore
      await axios.delete<IContact>(`http://localhost:3000/contacts/${id}`);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка при удалении контакта')
    }
  }
)


export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    select: (state, action) => {
      state.currentContact = action.payload;
      state.mode = 'none';
    },
    edit: (state) => {
      state.mode = 'edit';
    },
    create: (state) => {
      state.currentContact = {
        email: '',
        name: '',
        surname: '',
        phone: ''
      };
      state.mode = 'create';
    },
    delete: () => {},
    find: () => {}
  },
  extraReducers: {
    [getContactList.pending.type]: (state) => {
      state.getContactsLoading = true;
      state.error = false;
    },
    [getContactList.fulfilled.type]: (state, {payload}) => {
      state.contacts = payload.list;
      state.currentContact = payload.list.find((el: IContact) => el.id === payload.currentId);
      state.getContactsLoading = false;
    },
    [getContactList.rejected.type]: (state, {payload}) => {
      state.getContactsLoading = false;
      state.error = payload || true;
    },

    [createContact.pending.type]: (state) => {
      state.actionContactsLoading = true;
      state.error = false;
    },
    [createContact.fulfilled.type]: (state, {payload}) => {
      state.contacts.push(payload);
      state.currentContact = payload;
      state.actionContactsLoading = false;
      state.mode = 'none';
    },
    [createContact.rejected.type]: (state, {payload}) => {
      state.actionContactsLoading = false;
      state.error = payload || true;
    },

    [updateContact.pending.type]: (state) => {
      state.actionContactsLoading = true;
      state.error = false;
    },
    [updateContact.fulfilled.type]: (state, {payload}) => {
      const idx = state.contacts.findIndex(el => el.id == payload.id);
      state.contacts[idx] = payload;
      state.currentContact = payload;
      state.actionContactsLoading = false;
      state.mode = 'none';
    },
    [updateContact.rejected.type]: (state, {payload}) => {
      state.actionContactsLoading = false;
      state.error = payload || true;
    },

    [removeContact.pending.type]: (state) => {
      state.actionContactsLoading = true;
      state.error = false;
    },
    [removeContact.fulfilled.type]: (state, {payload}) => {
      const idx = state.contacts.findIndex(el => el.id == payload);
      state.contacts.splice(idx, 1);
      delete state.currentContact;
      state.actionContactsLoading = false;
      state.mode = 'none';
    },
    [removeContact.rejected.type]: (state, {payload}) => {
      state.actionContactsLoading = false;
      state.error = payload || true;
    }
  }
});

export default contactsSlice.reducer;
