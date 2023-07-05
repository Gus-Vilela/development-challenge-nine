import { useState, useEffect } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import format from 'date-fns/format';
import { deletePatient, getAllPatients } from '../api/services/Patient';
import Popup from './Popup';
import PatientForm from './PatientForm';
import SnackbarAlert from './SnackbarAlert';
import Confirmation from './Confirmation';
import SearchBar from './SearchBar';

export default function PatientTable() {
  const [rawPatients, setRawPatients] = useState([]);
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openFormPopup, setOpenFormPopup] = useState(false);
  const [openConfPopup, setOpenConfPopup] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // useEffect is used to get the data from the database
  useEffect(() => {
    getAllPatients()
      .then((response) => {
        setRawPatients(response.data);
        setPatients(response.data);
      })
      .catch((error) => {
        setErrorMessage(error.message.data.msg);
        setOpenSnackbar(true);
      });
  }, [openSnackbar]);

  // handleChangePage is used to change the page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const tableContainer = document.querySelector('.MuiTableContainer-root');
    tableContainer.scrollTo(0, 0);
  };

  // handleChangeRowsPerPage is used to change the number of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deletePatient;
      setPatients(patients.filter((curPatient) => curPatient.id !== id));
      setSuccessMessage(response.data.msg);
      setOpenSnackbar(true);
    } catch (error) {
      setErrorMessage(error.response.data.msg);
      setOpenSnackbar(true);
    }
  };

  // add empty rows to complete 5 rows per page
  const emptyRows =
    5 - Math.min(rowsPerPage, patients.length - page * rowsPerPage);

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
            setDefaultValues({
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
      <SearchBar rawPatients={rawPatients} setPatients={setPatients} />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer
          sx={{
            borderStartStartRadius: 0,
            borderStartEndRadius: 0,
            maxHeight: 420,
            boxSizing: 'border-box',
          }}
        >
          <Table stickyHeader arial-label="Tabela Pacientes">
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
                <TableCell align="center">editar</TableCell>
                <TableCell align="center">excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((patient) => (
                  <TableRow
                    key={patient.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>
                      {format(new Date(patient.birthDate), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.address}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          setDefaultValues(patient);
                          setOpenFormPopup(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="delete"
                        sx={{
                          '&:hover': {
                            backgroundColor: '#e57373',
                            color: '#fff',
                          },
                        }}
                        onClick={() => {
                          setDefaultValues(patient);
                          setOpenConfPopup(true);
                        }}
                      >
                        <DeleteIcon />
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
        </TableContainer>
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
      </Paper>
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
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
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
          handleDelete={handleDelete}
        />
      </Popup>
      <SnackbarAlert
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        successMessage={successMessage}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
}
