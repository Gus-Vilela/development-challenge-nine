import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Confirmation({
  setOpenPopup,
  handleDelete,
  defaultValues,
  dialogTitle,
  contentText,
  action,
}) {
  return (
    <>
      <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
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
          {action}
        </Button>
      </DialogActions>
    </>
  );
}
