import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EditIcon from '@mui/icons-material/Edit';

export default function PatientTable(props) {
  //getPatients and setPatients are used to store the data from the database
  const [patients, setPatients] = useState([]);
  //useEffect is used to get the data from the database
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
  }, []);

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

  //takes Patient.birthDate and returns it in the format DD/MM/YYYY
  const formatDate = (date) => {
    const dateArray = date.split('-');
    const day = dateArray[2];
    const month = dateArray[1];
    const year = dateArray[0];
    return `${day}/${month}/${year}`;
  };

  return (
    <TableContainer component={Paper}>
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
          {patients.map((patient) => (
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
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
