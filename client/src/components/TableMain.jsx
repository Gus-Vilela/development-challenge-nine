import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
    <TableContainer
      sx={{
        maxHeight: 432,
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
            <TableRow style={{ height: 74.2 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
