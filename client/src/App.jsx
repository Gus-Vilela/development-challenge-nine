import './styles/App.css';
import { Container } from '@mui/material';
import PatientTable from './components/PatientTable';
import img from './assets/medcloud.svg';

function App() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img src={img} alt="medcloud logo" className="logo" />
      <PatientTable />
    </Container>
  );
}

export default App;
