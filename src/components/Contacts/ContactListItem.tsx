import { Avatar, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IContact } from '../../types/Contact';
import ContactListItemIcons from './ContactListItemIcons';

interface ContactListItemProps {
  contact: IContact;
  active?: boolean;
}

const ContactListItem: React.FC<ContactListItemProps> = ({contact, active}) => {
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

  return (
    <Link to={`/contacts/${contact.id}`} style={{textDecoration: 'none', color: '#000'}}>
      <ListItemButton selected={active} onMouseEnter={hoverHandler} onMouseLeave={hoverHandler}>
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
