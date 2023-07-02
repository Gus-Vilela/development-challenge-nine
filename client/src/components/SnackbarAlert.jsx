import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarAlert(props) {
  const { openSnackbar, setOpenSnackbar, successMessage, errorMessage } = props;

  // handleClose is used to close the snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={!errorMessage ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {!errorMessage ? successMessage : errorMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
