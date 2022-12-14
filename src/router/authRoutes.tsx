import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import Contacts from '../pages/Contacts/Contacts';

export const authRoutes = () => (
  <>
    <Route path='/contacts' element={<Contacts/>}/>
    <Route path='/contacts/:id' element={<Contacts/>}/>
    <Route path='/contacts/create' element={<Contacts/>}/>
    <Route path='*' element={<Navigate to='/contacts'/>}/>
  </>
);
