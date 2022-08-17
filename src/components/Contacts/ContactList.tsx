import { List, Typography } from '@mui/material';
import React from 'react';
import { IContact } from '../../types/Contact';
import ContactListItem from './ContactListItem';

interface ContactListProps {
  list: IContact[];
}

const ContactList: React.FC<ContactListProps> = ({list}) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
        !list.length
          ? <Typography variant="h6" component="h6">
              У вас нет контактов
            </Typography>
          : list?.map(el => <ContactListItem key={el?.id} contact={el}/>)
      }
    </List>
  );
};

export default ContactList;
