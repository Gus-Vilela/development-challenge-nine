import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Confirmation(props) {
  const { setOpenPopup, handleDelete, defaultValues } = props;
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  return (
    <>
      <DialogTitle id="responsive-dialog-title">
        {'Tem certeza que deseja excluir esse paciente?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Essa ação não pode ser desfeita.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            setOpenPopup(false);
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            handleDelete(defaultValues.id);
            setOpenPopup(false);
          }}
          autoFocus
          sx={{
            '&:hover': {
              color: '#d32f2f',
            },
          }}
        >
          Excluir
        </Button>
      </DialogActions>
    </>
  );
}
