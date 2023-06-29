import { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import PatientForm from './components/PatientForm.jsx';

function App() {
  useEffect(() => {
    axios
      .get('http://localhost:3000/Patient')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      <PatientForm />
    </Container>
  );
}

export default App;
