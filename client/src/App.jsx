import './App.css';
import { Container, Typography } from '@mui/material';
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
        variant="h2"
        color="tertiary.main"
        textAlign={{ textAlign: 'center' }}
      >
        medcloud
      </Typography>
      <PatientTable />
    </Container>
  );
}

export default App;
