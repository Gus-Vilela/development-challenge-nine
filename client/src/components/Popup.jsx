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
import AssignmentIcon from '@mui/icons-material/Assignment';

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
          sx={{ width: '100%', boxSizing: 'border-box', p: 1 }}
        >
          <AssignmentIcon
            sx={{
              mr: 1,
              color: 'primary.main',
              margin: '0 1rem 0 0.5rem',
            }}
          />
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
            sx={{
              '&:hover': {
                color: '#d32f2f',
              },
            }}
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
