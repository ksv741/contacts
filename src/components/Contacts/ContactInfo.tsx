import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { UseValidate } from '../../hooks/useValidate';
import { contactsSlice } from '../../store/reducers/contacts';
import { contactsApi } from '../../store/service/contacts';
import ValidateInput, { ValidateInputState } from '../UI/ValidateInput';

const ContactInfo: React.FC = () => {
  const location = useLocation();

  const dispatch = useAppDispatch();
  const { mode, currentContactId } = useAppSelector(state => state.contacts);
  const { userId } = useAppSelector(state => state.auth);
  const { data, isLoading } = contactsApi.useGetContactListQuery(userId || '');
  const [createContact, {isLoading: createContactLoading}] = contactsApi.useCreateContactMutation();
  const [updateContact, {isLoading: updateContactLoading}] = contactsApi.useUpdateContactMutation();
  const {create} = contactsSlice.actions;

  const [currentContact, setCurrentContact] = useState(data?.find(el => el.id == currentContactId));

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
    rules: { required: true }
  });
  const [surname, setSurname] = useState<ValidateInputState>({
    label: 'Фамилия',
    type: 'text',
    value: currentContact?.surname || '',
    touched: false,
    valid: false,
    error: false,
    errorText: ''
  });
  const [phone, setPhone] = useState<ValidateInputState>({
    label: 'Телефон',
    type: 'text',
    value: currentContact?.phone || '',
    touched: false,
    valid: false,
    error: false,
    errorText: '',
    rules: { required: true }
  });
  const [email, setEmail] = useState<ValidateInputState>({
    label: 'Почта',
    type: 'text',
    value: currentContact?.email || '',
    touched: false,
    valid: false,
    error: false,
    errorText: ''
  });

  const isFormValid = UseValidate(name, phone);


  useEffect(() => {
    location.pathname.split('/')[2] === 'create' && dispatch(create())
  }, [])

  useEffect(() => {
    const candidate = data?.find(el => el.id == currentContactId);
    currentContactId && setCurrentContact(candidate);

    setName({ ...name, value: candidate?.name || '' });
    setPhone({ ...phone, value: candidate?.phone || '' });
    setSurname({ ...surname, value: candidate?.surname || '' });
    setEmail({ ...email, value: candidate?.email || '' });
  }, [currentContactId, data]);

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
  }, [mode]);

  function saveCreateHandler() {
    switch (mode) {
      case 'create':
        createContact({ email: email.value, surname: surname.value, phone: phone.value, name: name.value, user_id: userId });
        break;
      case 'edit':
        updateContact({
          ...currentContact,
          email: email.value,
          surname: surname.value,
          phone: phone.value,
          name: name.value,
        })
        break;
    }
  }

  if (!currentContactId && mode !== 'create') return null;

  if (isLoading) return <CircularProgress />;

  return (
    <Stack spacing={2} sx={{ p: 3 }}>
      <Typography variant='h5' component='h5'>{title}</Typography>

      <ValidateInput changeItemCallback={setName} validateItem={name} disabled={!isEditable} />
      <ValidateInput changeItemCallback={setSurname} validateItem={surname} disabled={!isEditable} />
      <ValidateInput changeItemCallback={setPhone} validateItem={phone} disabled={!isEditable} />
      <ValidateInput changeItemCallback={setEmail} validateItem={email} disabled={!isEditable} />

      {isEditable && (
        <LoadingButton
          loading={createContactLoading || updateContactLoading}
          loadingPosition='start'
          startIcon={<SaveIcon />}
          variant='outlined'
          sx={{ alignSelf: 'flex-start' }}
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
