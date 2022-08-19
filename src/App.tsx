import React from 'react';
import { Provider } from 'react-redux';
import CustomAlert from './components/UI/CustomAlert';
import Router from './router';
import { setupStore } from './store';

function App() {
  return (
    <Provider store={setupStore()}>
      <Router/>
      <CustomAlert/>
    </Provider>
  );
}

export default App;
