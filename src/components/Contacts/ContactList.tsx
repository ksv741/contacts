import { List, Typography } from '@mui/material';
import React from 'react';
import { IContact } from '../../types/Contact';
import ContactListItem from './ContactListItem';

interface ContactListProps {
  list: IContact[];
  activeId?: string;
}

const ContactList: React.FC<ContactListProps> = ({ list, activeId }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
        !list.length
          ? <Typography variant='h6' component='h6'>У вас нет контактов</Typography>
          : list?.map(el => <ContactListItem key={el.id} contact={el} active={activeId === el.id?.toString()}/>)
      }
    </List>
  );
};

export default ContactList;
