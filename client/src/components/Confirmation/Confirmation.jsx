import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { StyledButton } from './Styles';

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
        <StyledButton
          onClick={() => {
            handleDelete(defaultValues.id);
            setOpenPopup(false);
          }}
          autoFocus
        >
          {action}
        </StyledButton>
      </DialogActions>
    </>
  );
}
