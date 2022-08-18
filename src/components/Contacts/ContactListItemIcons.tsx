import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { contactsSlice, removeContact } from '../../store/reducers/contacts';
import { IContact } from '../../types/Contact';

interface ContactListItemIconsProps {
  show: boolean;
  contact: IContact;
}

const ContactListItemIcons: React.FC<ContactListItemIconsProps> = ({ show, contact }) => {
  const { id } = useParams();
  const navigator = useNavigate();

  const { mode } = useAppSelector(state => state.contacts);
  const dispatch = useAppDispatch();

  const { select, edit } = contactsSlice.actions;

  function itemEditIconClickHandler(e: React.MouseEvent) {
    if (contact.id !== id) {
      dispatch(select(contact));
    }
    dispatch(edit());

    e.preventDefault();
    e.stopPropagation();
  }

  function itemDeleteIconClickHandler(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    contact.id && dispatch(removeContact(contact.id));
    navigator('/contacts');
  }

  return (
    <>
      <IconButton aria-label='Remove' onClickCapture={itemEditIconClickHandler}>
        {((contact.id === id) && mode === 'edit' || show) &&
          <EditIcon cursor={'pointer'} fontSize='medium' color='primary' />}
      </IconButton>
      <IconButton aria-label='Remove'>
        {show && <DeleteIcon color='error' onClickCapture={itemDeleteIconClickHandler} />}
      </IconButton>
    </>
  );
};

export default ContactListItemIcons;
