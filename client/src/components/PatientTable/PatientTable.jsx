import { useState, useEffect } from 'react';
import { deletePatient, getAllPatients } from '../../api/services/Patient';
import Popup from '../Popup/Popup';
import PatientForm from '../PatientForm/PatientForm';
import SnackbarAlert from '../SnackbarAlert';
import Confirmation from '../Confirmation/Confirmation';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import TableMain from './TableMain';
import {
  StyledAssignmentIcon,
  StyledPaper,
  StyledPriorityHighIcon,
} from './Styles';

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
        error.message === 'Network Error'
          ? setErrorMessage('Erro de conexão')
          : setErrorMessage(error.message);
        setOpenSnackbar(true);
      });
  }, [openSnackbar]);

  const handleSuccessMessage = (response) => {
    setSuccessMessage(response.data.msg);
    setOpenSnackbar(true);
  };

  const handleErrorMessage = (error) => {
    setErrorMessage(error.response.data.msg);
    setOpenSnackbar(true);
  };
  // handleDelete is used to delete a patient
  const handleDelete = async (id) => {
    try {
      const response = await deletePatient(id);
      handleSuccessMessage(response);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  // add empty rows to complete 5 rows per page
  const emptyRows =
    5 - Math.min(rowsPerPage, patients.length - page * rowsPerPage);

  return (
    <>
      <StyledPaper>
        <TableHeader
          rawPatients={rawPatients}
          setPatients={setPatients}
          setOpenFormPopup={setOpenFormPopup}
          setDefaultValues={setDefaultValues}
          title="Tabela de Pacientes"
          buttonText="Adicionar Paciente"
        />
        <TableMain
          patients={patients}
          page={page}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
          setDefaultValues={setDefaultValues}
          setOpenFormPopup={setOpenFormPopup}
          setOpenConfPopup={setOpenConfPopup}
        />
        <TableFooter
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          patients={patients}
        />
      </StyledPaper>
      <Popup
        openPopup={openFormPopup}
        setOpenPopup={setOpenFormPopup}
        title="Formulário do Paciente"
        icon={<StyledAssignmentIcon />}
      >
        <PatientForm
          defaultValues={defaultValues}
          setOpenPopup={setOpenFormPopup}
          openSnackbar={openSnackbar}
          handleErrorMessage={handleErrorMessage}
          handleSuccessMessage={handleSuccessMessage}
        />
      </Popup>
      <Popup
        openPopup={openConfPopup}
        setOpenPopup={setOpenConfPopup}
        title="Confirmação"
        icon={<StyledPriorityHighIcon />}
      >
        <Confirmation
          defaultValues={defaultValues}
          setOpenPopup={setOpenConfPopup}
          handleDelete={handleDelete}
          dialogTitle="Tem certeza que deseja excluir esse paciente?"
          contentText="Essa ação não pode ser desfeita."
          action="Excluir"
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
