import { StyledTablePagination } from './Styles';

export default function TableFooter({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  patients,
}) {
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
  // labelDisplayedRows is used to change the label of the displayed rows
  const labelDisplayedRows = ({ from, to, count }) =>
    `${from}-${to} de ${count}`;

  return (
    <StyledTablePagination
      rowsPerPageOptions={[5, 10]}
      component="div"
      count={patients.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage="Pacientes por página"
      labelDisplayedRows={labelDisplayedRows}
    />
  );
}
