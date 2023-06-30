import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

export default function Popup(props) {
  const { openPopup, setOpenPopup, children } = props;
  return (
    <Dialog
      open={openPopup}
      onClose={() => {
        setOpenPopup(false);
      }}
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': {
          position: 'absolute',
          top: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
    >
      <DialogTitle
        sx={{
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
            }}
          >
            Formuário do Paciente
          </Typography>
          <IconButton
            aria-label="fechar formulário"
            variant="contained"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          marginTop: 0,
          paddingTop: 0,
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
