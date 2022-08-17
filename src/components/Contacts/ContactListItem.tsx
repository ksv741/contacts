import { Avatar, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { contactsSlice } from '../../store/reducers/contacts';
import { IContact } from '../../types/Contact';
import ContactListItemIcons from './ContactListItemIcons';

interface ContactListItemProps {
  contact: IContact;
}

const ContactListItem: React.FC<ContactListItemProps> = ({contact}) => {
  const {id} = useParams();

  const {currentContact} = useAppSelector(state => state.contacts);
  const dispatch = useAppDispatch();

  const {select} = contactsSlice.actions;

  const [isHovered, setIsHovered] = useState(false);

  function hoverHandler(e: React.MouseEvent) {
    switch (e.type) {
      case 'mouseenter':
        setIsHovered(true);
        break;
      case 'mouseleave':
        setIsHovered(false);
        break;
    }
  }

  function itemClickHandler(e: React.MouseEvent) {
    if (contact.id !== id) {
      dispatch(select(contact));
    }
  }

  return (
    <Link to={`/contacts/${contact.id}`} style={{textDecoration: 'none', color: '#000'}}>
      <ListItemButton selected={contact?.id === currentContact?.id} onClick={itemClickHandler} onMouseEnter={hoverHandler} onMouseLeave={hoverHandler}>
        <ListItemAvatar>
          <Avatar>{contact.name[0] + (contact?.surname?.[0] || '')}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${contact.name} ${contact.surname}`} secondary={`${contact.phone}`} />

        <ContactListItemIcons show={isHovered} contact={contact}/>
      </ListItemButton>
    </Link>
  );
};

export default ContactListItem;
