import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { UseValidate } from '../../hooks/useValidate';
import { createContact, ModeType, updateContact } from '../../store/reducers/contacts';
import { IContact } from '../../types/Contact';
import ValidateInput, { ValidateInputState } from '../ValidateInput';

interface ContactInfoProps {
  currentContact?: IContact;
  mode?: ModeType;
}

const ContactInfo: React.FC<ContactInfoProps> = () => {
  const dispatch = useAppDispatch();
  const {currentContact, mode, actionContactsLoading} = useAppSelector(state => state.contacts);

  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState('Данные о контакте:');

  const [name, setName] = useState<ValidateInputState>({
    label: 'Имя',
    type: 'text',
    value: currentContact?.name || '',
    touched: false,
    valid: false,
    error: false,
    errorText: '',
    rules: {required: true}
  });
  const [surname, setSurname] = useState<ValidateInputState>({
    label: 'Фамилия',
    type: 'text',
    value: currentContact?.surname || '',
    touched: false,
    valid: false,
    error: false,
    errorText: '',
  });
  const [phone, setPhone] = useState<ValidateInputState>({
    label: 'Телефон',
    type: 'text',
    value: currentContact?.phone || '',
    touched: false,
    valid: false,
    error: false,
    errorText: '',
    rules: {required: true}
  });
  const [email, setEmail] = useState<ValidateInputState>({
    label: 'Почта',
    type: 'text',
    value: currentContact?.email || '',
    touched: false,
    valid: false,
    error: false,
    errorText: '',
  });

  const isFormValid = UseValidate(name, phone);

  useEffect(() => {
    setName({...name, value: currentContact?.name || ''});
    setPhone({...phone, value: currentContact?.phone || ''});
    setSurname({...surname, value: currentContact?.surname || ''});
    setEmail({...email, value: currentContact?.email || ''});
  }, [currentContact]);

  useEffect(() => {
    switch (mode) {
      case 'edit':
        setTitle('Редактировать контакт:');
        setIsEditable(true);
        break;
      case 'create':
        setTitle('Создать контакт');
        setIsEditable(true);
        break;

      default:
        setTitle('Данные о контакте');
        setIsEditable(false);
    }
  }, [mode])


  if (!currentContact) return null;

  function saveCreateHandler(e: React.MouseEvent) {
    switch (mode) {
      case 'create':
        dispatch(createContact({email: email.value, surname: surname.value, phone: phone.value, name: name.value}))
        break;
      case 'edit':
        dispatch(updateContact({email: email.value, surname: surname.value, phone: phone.value, name: name.value, id: currentContact?.id}))
        break;
    }
  }

  return (
    <Stack spacing={2} sx={{p: 3}}>
      <Typography variant="h5" component="h5">{title}</Typography>

      <ValidateInput changeItemCallback={setName} validateItem={name} disabled={!isEditable}/>
      <ValidateInput changeItemCallback={setSurname} validateItem={surname} disabled={!isEditable}/>
      <ValidateInput changeItemCallback={setPhone} validateItem={phone} disabled={!isEditable}/>
      <ValidateInput changeItemCallback={setEmail} validateItem={email} disabled={!isEditable}/>

      {isEditable && (
        <LoadingButton
          loading={actionContactsLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
          sx={{alignSelf: 'flex-start'}}
          onClick={saveCreateHandler}
          disabled={!isFormValid}
        >
          {mode === 'edit' ? 'Сохранить' : 'Создать'}
        </LoadingButton>
      )}
    </Stack>
  );
};

export default ContactInfo;
