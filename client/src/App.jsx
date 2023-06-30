import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import PatientForm from './components/PatientForm.jsx';
import PatientTable from './components/PatientTable';

function App() {
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
      <PatientTable />
    </Container>
  );
}

export default App;
