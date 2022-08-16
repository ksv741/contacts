import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import Authorization from '../pages/Authorization/Authorization';

export const publicRoutes = () => (
  <>
    <Route path='/' element={<Authorization/>}/>
    <Route path='*' element={<Navigate to='/'/>}/>
  </>
);
