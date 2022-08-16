import React from 'react';
import { useParams } from 'react-router-dom';

const Contacts = () => {
  const {id} = useParams();
  return (
    <div>
      Contacts page id: {id}
    </div>
  );
};

export default Contacts;
