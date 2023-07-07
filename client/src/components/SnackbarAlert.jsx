import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// const Alert = React.forwardRef((props, ref) => (
//   <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
// ));

export default function SnackbarAlert({
  openSnackbar,
  setOpenSnackbar,
  successMessage,
  errorMessage,
  setErrorMessage,
}) {
  // handleClose is used to close the snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    setErrorMessage('');
  };

  return (
    <Stack>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionProps={{
          appear: false,
        }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          TransitionProps={{
            appear: false,
          }}
          severity={!errorMessage ? 'success' : 'error'}
        >
          {!errorMessage ? successMessage : errorMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
