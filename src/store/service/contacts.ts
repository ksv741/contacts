import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { IContact } from '../../types/Contact';
import { serverURL } from '../../utils/constants';
import { alertSlice } from '../reducers/alert';
import { contactsSlice } from '../reducers/contacts';

const {show} = alertSlice.actions;
const {select, remove} = contactsSlice.actions;

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({baseUrl: serverURL}),
  tagTypes: ['Contacts'],
  endpoints: (build) => ({
    getContactList: build.query<IContact[], string>({
      query: (userId) => ({
        url: `/contacts`,
        params: {
          user_id: userId,
        }
      }),
      providesTags: ['Contacts'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          dispatch(show({text: 'Не удалось загрузить список контактов', type: 'error'}));
        }
      },
    }),
    createContact: build.mutation<IContact, IContact>({
      query: (contact) => ({
        url: `/contacts`,
        method: 'POST',
        body: contact
      }),
      invalidatesTags: ['Contacts'],
      async onQueryStarted(contact, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          response.data.id && dispatch(select(response.data.id));
          dispatch(show({text: 'Конакт успешно создан', type: 'success'}));
        } catch (err) {
          dispatch(show({text: 'Ошибка при создании контакта', type: 'error'}));
        }
      }
    }),
    updateContact: build.mutation<IContact, IContact>({
      query: (contact) => ({
        url: `/contacts/${contact.id}`,
        method: 'PUT',
        body: contact
      }),
      invalidatesTags: ['Contacts'],
      async onQueryStarted(contact, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(show({text: 'Конакт обновлен', type: 'success'}));
          contact.id && dispatch(select(contact.id));
        } catch (err) {
          dispatch(show({text: 'Ошибка при изменении контакта', type: 'error'}));
        }
      }
    }),
    removeContact: build.mutation<unknown, string | number>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(show({text: 'Контакт успешно удален', type: 'success'}));
          dispatch(remove());
        } catch (err) {
          dispatch(show({text: 'Ошибка при удалении контакта', type: 'error'}));
        }
      }
    }),
  })
})
