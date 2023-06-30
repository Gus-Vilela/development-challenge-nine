import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  TablePagination,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Popup from './Popup';
import PatientForm from './PatientForm';

export default function PatientTable(props) {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openPopup, setOpenPopup] = useState(false);
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

  // useEffect is used to get the data from the database
  useEffect(() => {
    axios
      .get('http://localhost:3000/Patient')
      .then((response) => {
        console.log(response.data);
        setPatients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [openPopup]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/Patient/${id}`)
      .then((response) => {
        console.log(response);
        setPatients(patients.filter((curPatient) => curPatient.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // takes Patient.birthDate and returns it in the format DD/MM/YYYY
  const formatDate = (date) => {
    const dateArray = date.split('-');
    const day = dateArray[2];
    const month = dateArray[1];
    const year = dateArray[0];
    return `${day}/${month}/${year}`;
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, patients.length - page * rowsPerPage);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        component={Paper}
        sx={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          marginTop: 2,
          width: '100%',
          p: 2,
          backgroundColor: '#f5f5f5',
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Pacientes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            handeDefaultValues({
              id: '',
              name: '',
              birthDate: '',
              email: '',
              address: '',
            });
            setOpenPopup(true);
          }}
        >
          Novo Paciente
        </Button>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{
          borderStartStartRadius: 0,
          borderStartEndRadius: 0,
        }}
      >
        <Table arial-label="Tabela Pacientes">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Data de Nascimento</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Excluir</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((patient) => (
                <TableRow
                  key={patient.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{formatDate(patient.birthDate)}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.address}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleDelete(patient.id);
                      }}
                    >
                      <PersonRemoveIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        handeDefaultValues(patient);
                        setOpenPopup(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 72.5 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={patients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <PatientForm
          defaultValues={defaultValues}
          setOpenPopup={setOpenPopup}
          setPatients={setPatients}
        />
      </Popup>
    </>
  );
}
