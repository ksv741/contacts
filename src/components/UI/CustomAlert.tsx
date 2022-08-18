import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React from 'react';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { alertSlice } from '../../store/reducers/alert';

enum ERROR_TITLE {
  success = 'Успешно',
  info = 'Инфо',
  warning = 'Предупреждение',
  error = 'Ошибка'
}

const CustomAlert: React.FC = () => {
  const {text, type, isOpen, autoHideDuration} = useAppSelector(state => state.alert);
  const {hide} = alertSlice.actions;
  const dispatch = useAppDispatch();

  function hideAlertHandler() {
    dispatch(hide())
  }

  return (
    <Snackbar open={isOpen} autoHideDuration={autoHideDuration} onClose={hideAlertHandler}>
      <Alert severity={type} onClose={hideAlertHandler}>
        <AlertTitle>{ERROR_TITLE[type]}</AlertTitle>
        {text}
      </Alert>
    </Snackbar>
  )
};

export default () => createPortal(<CustomAlert/>, document.body);
