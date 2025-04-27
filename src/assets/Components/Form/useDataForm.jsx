// useDataForm.js
import { useState } from 'react';

export default function useDataForm() {
  const [clientData, setClientData] = useState({
    name: '',
    email:'',
    address: '',
    phone: '',
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setClientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    setClientData({
      name: '',
      email: '',
      address: '',
      phone: '',
    });
  };

  return { clientData, handleData, reset };
}