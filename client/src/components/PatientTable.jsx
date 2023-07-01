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
import SnackbarAlert from './SnackbarAlert';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Confirmation from './Confirmation';
import { set } from 'react-hook-form';

export default function PatientTable(props) {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openFormPopup, setOpenFormPopup] = useState(false);
  const [openConfPopup, setOpenConfPopup] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});

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
  }, [openFormPopup]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handeDefaultValues = (data) => {
    setDefaultValues(data);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/Patient/${id}`)
      .then((response) => {
        console.log(response);
        setPatients(patients.filter((curPatient) => curPatient.id !== id));
        setOpenSnackbar(true);
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
        <PeopleAltIcon
          sx={{
            mr: 1,
            color: 'primary.main',
            margin: '0 1rem 0 0.5rem',
          }}
        />
        <Typography variant="h5" sx={{ flexGrow: 1 }} color="tertiary.main">
          Lista de Pacientes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'capitalize',
          }}
          onClick={() => {
            handeDefaultValues({
              id: '',
              name: '',
              birthDate: '',
              email: '',
              address: '',
            });
            setOpenFormPopup(true);
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
          <TableHead
            sx={{
              textTransform: 'uppercase',
              '& .MuiTableCell-head': {
                fontWeight: '500',
                color: '#707070',
                letterSpacing: 1,
              },
            }}
          >
            <TableRow>
              <TableCell>nome</TableCell>
              <TableCell>data de nascimento</TableCell>
              <TableCell>email</TableCell>
              <TableCell>endereco</TableCell>
              <TableCell>excluir</TableCell>
              <TableCell>editar</TableCell>
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
                      sx={{
                        '&:hover': {
                          backgroundColor: '#e57373',
                          color: '#fff',
                        },
                      }}
                      onClick={() => {
                        handeDefaultValues(patient);
                        setOpenConfPopup(true);
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
                        setOpenFormPopup(true);
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
          sx={{
            '& .MuiTablePagination-caption': {
              color: 'primary.main',
            },
          }}
        />
      </TableContainer>
      <Popup
        openPopup={openFormPopup}
        setOpenPopup={setOpenFormPopup}
        title="Formulário do Paciente"
        icon={
          <AssignmentIcon
            sx={{
              mr: 1,
              color: 'primary.main',
              margin: '0 1rem 0 0.5rem',
            }}
          />
        }
      >
        <PatientForm
          defaultValues={defaultValues}
          setOpenPopup={setOpenFormPopup}
          setPatients={setPatients}
          patients={patients}
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
        />
      </Popup>
      <Popup
        openPopup={openConfPopup}
        setOpenPopup={setOpenConfPopup}
        title="Confirmação"
        icon={
          <PriorityHighIcon
            sx={{
              mr: 1,
              color: 'error.main',
              margin: '0 1rem 0 0.5rem',
            }}
          />
        }
      >
        <Confirmation
          defaultValues={defaultValues}
          setOpenPopup={setOpenConfPopup}
          setPatients={setPatients}
          patients={patients}
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
          handleDelete={handleDelete}
        />
      </Popup>
      <SnackbarAlert
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        defaultValues={defaultValues}
      />
    </>
  );
}
