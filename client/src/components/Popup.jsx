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

export default function Popup({
  openPopup,
  setOpenPopup,
  children,
  title,
  icon,
}) {
  return (
    <Dialog
      open={openPopup}
      onClose={() => {
        setOpenPopup(false);
      }}
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': {
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
          {icon}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
            }}
          >
            {title}
          </Typography>
          <IconButton
            aria-label="fechar popup"
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
