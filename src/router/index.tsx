import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { authRoutes } from './authRoutes';
import { publicRoutes } from './publicRoutes';

const Router = () => {
  const {isAuth} = useAppSelector(state => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? authRoutes() : publicRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
