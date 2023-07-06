import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  StyledIconButton,
  StyledTable,
  StyledTableContainer,
  StyledTableRow,
} from './Styles';

export default function TableMain({
  patients,
  page,
  rowsPerPage,
  emptyRows,
  setDefaultValues,
  setOpenFormPopup,
  setOpenConfPopup,
}) {
  return (
    <StyledTableContainer>
      <StyledTable stickyHeader arial-label="Tabela Pacientes">
        <TableHead>
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
              <StyledTableRow key={patient.id}>
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
                  <StyledIconButton
                    aria-label="delete"
                    onClick={() => {
                      setDefaultValues(patient);
                      setOpenConfPopup(true);
                    }}
                  >
                    <DeleteIcon />
                  </StyledIconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 74.2 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
}
