import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ContactsIcon from '@mui/icons-material/Contacts';
import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { contactsSlice } from '../../store/reducers/contacts';

const ContactsHeader = () => {
  const dispatch = useAppDispatch();
  const { create } = contactsSlice.actions;

  return (
    <>
      <Typography variant='h3' component='h3'>
        <ContactsIcon fontSize='large' />
        Контакты:
      </Typography>
      <Link to='/contacts/create' style={{ textDecoration: 'none' }}>
        <Button onClick={() => dispatch(create())} variant='outlined' sx={{ width: '100%' }}>
          <AddCircleSharpIcon />
          Создать контакт
        </Button>
      </Link>
    </>
  );
};

export default ContactsHeader;
