import { Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

export default function PatientForm(props) {
  return (
    <>
      <Typography
        variant="h2"
        color="terciary.main"
        textAlign={{ textAlign: 'center' }}
        sx={{ marginTop: '2rem' }}
      >
        Patient Form
      </Typography>
      <form noValidate>
        <Stack spacing={2} width={400}>
          <TextField
            label="Nome do Paciente"
            variant="filled"
            sx={{
              bgcolor: 'secondary.main',
              marginTop: '2rem',
            }}
          />
          <TextField
            label="Data de Nascimento"
            type="date"
            variant="filled"
            sx={{
              bgcolor: 'secondary.main',
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Email"
            variant="filled"
            type="email"
            sx={{
              bgcolor: 'secondary.main',
            }}
          />
          <TextField
            label="Endereço"
            variant="filled"
            sx={{
              bgcolor: 'secondary.main',
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{
              bgcolor: 'secondary.main',
            }}
          >
            Enviar
          </Button>
        </Stack>
      </form>
    </>
  );
}
