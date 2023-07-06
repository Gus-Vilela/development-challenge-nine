import './styles/App.css';
import { Container, Stack } from '@mui/material';
import PatientTable from './components/PatientTable/PatientTable';
import img from './assets/medcloud.svg';

function App() {
  return (
    <Container>
      <Stack alignItems="center">
        <img src={img} alt="medcloud logo" className="logo" />
        <PatientTable />
      </Stack>
    </Container>
  );
}

export default App;
