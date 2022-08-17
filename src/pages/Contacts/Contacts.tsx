import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContactInfo from '../../components/Contacts/ContactInfo';
import ContactList from '../../components/Contacts/ContactList';
import ContactsHeader from '../../components/Contacts/ContactsHeader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getContactList } from '../../store/reducers/contacts';

const Contacts: React.FC = () => {
  const {id} = useParams();
  const {getContactsLoading} = useAppSelector(state => state.contacts);

  const {contacts} = useAppSelector(state => state.contacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContactList(id || ''));
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item={true} xs={2}>
          <ContactsHeader/>
          { getContactsLoading ? <CircularProgress /> : <ContactList list={contacts}/>}
        </Grid>
        <Grid item={true} xs={10}>
          <ContactInfo/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Contacts;
