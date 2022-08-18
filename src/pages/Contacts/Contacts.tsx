import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ContactInfo from '../../components/Contacts/ContactInfo';
import ContactList from '../../components/Contacts/ContactList';
import ContactsHeader from '../../components/Contacts/ContactsHeader';
import SearchInput from '../../components/SearchInput';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getContactList } from '../../store/reducers/contacts';
import { IContact } from '../../types/Contact';

const Contacts: React.FC = () => {
  const {id} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const {getContactsLoading} = useAppSelector(state => state.contacts);
  const {contacts} = useAppSelector(state => state.contacts);
  const dispatch = useAppDispatch();

  const [filteredContacts, setFilteredContacts] = useState(contacts)
  const [search, setSearch] = useState(searchParams.get('search') || '')

  useEffect(() => {
    dispatch(getContactList(id || ''));
  }, []);

  function filterContacts(param: string): IContact[] {
    return contacts.filter(contact => {
      return Object.values(contact).some(val => {
        return val.includes(param);
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
    setFilteredContacts(filterContacts(search));
  }, [contacts, search])

  return (
    <div>
      <Grid container>
        <Grid item={true} xs={2}>
          <ContactsHeader/>
          <SearchInput onChange={contactSearchHandler} defaultValue={search}/>
          { getContactsLoading ? <CircularProgress /> : <ContactList list={filteredContacts}/>}
        </Grid>
        <Grid item={true} xs={10}>
          <ContactInfo/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Contacts;
