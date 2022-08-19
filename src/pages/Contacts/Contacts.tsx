import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ContactInfo from '../../components/Contacts/ContactInfo';
import ContactList from '../../components/Contacts/ContactList';
import ContactsHeader from '../../components/Contacts/ContactsHeader';
import { ErrorBoundary } from '../../components/UI/ErrorBoundary';
import SearchInput from '../../components/UI/SearchInput';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { contactsSlice } from '../../store/reducers/contacts';
import { contactsApi } from '../../store/service/contacts';
import { IContact } from '../../types/Contact';

const Contacts: React.FC = () => {
  const {id} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const {userId} = useAppSelector(state => state.auth);
  const { data: contactList, isError, isLoading } = contactsApi.useGetContactListQuery(userId || '');
  const dispatch = useAppDispatch();
  const {select} = contactsSlice.actions;

  const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
  const [search, setSearch] = useState(searchParams.get('search') || '');

  function filterContacts(contacts: IContact[] | undefined, param: string): IContact[] {
    if (!contacts) return [] as IContact[];

    return contacts.filter(contact => {
      return Object.values(contact).some(val => {
        return val.toString().includes(param);
      })
    })
  }

  function contactSearchHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const search = e.target.value.trim().toLocaleLowerCase();
    setSearch(search);

    !!search ? searchParams.set('search', search) : searchParams.delete('search');
    setSearchParams(searchParams);
  }

  useEffect(() => {
    id && dispatch(select(id));
  }, [id])
  useEffect(() => {
    setFilteredContacts(filterContacts(contactList, search));
  }, [contactList, search])
  useEffect(() => {
    if (isError) throw new Error('Ошибка при загрузке контактов')
  }, [isError])

  return (
    <Grid container>
      <Grid item={true} xs={2}>
        <ContactsHeader/>
        <SearchInput onChange={contactSearchHandler} defaultValue={search} placeholder='Найти контакт' icon={<SearchIcon/>}/>
        { isLoading ? <CircularProgress /> : <ContactList list={filteredContacts} activeId={id}/>}
      </Grid>
      <Grid item={true} xs={10}>
        <ContactInfo/>
      </Grid>
    </Grid>
  );
};

export default () => <ErrorBoundary><Contacts/></ErrorBoundary>;
