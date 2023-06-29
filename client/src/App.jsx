import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import PatientForm from './components/PatientForm.jsx';
import PatientTable from './components/PatientTable';

function App() {
  const [defaultValues, setDefaultValues] = useState({
    id: '',
    name: '',
    birthDate: '',
    email: '',
    address: '',
  });

  const handeDefaultValues = (data) => {
    setDefaultValues(data);
  };

  return (
    <Container
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h1"
        color="primary.main"
        textAlign={{ textAlign: 'center' }}
      >
        medcloud
      </Typography>
      <PatientForm defaultValues={defaultValues} />
      <PatientTable handeDefaultValues={handeDefaultValues} />
    </Container>
  );
}

export default App;
