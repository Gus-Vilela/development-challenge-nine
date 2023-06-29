import { Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

export default function PatientForm(props) {
  const { register, handleSubmit, formState, control } = useForm({
    defaultValues: {
      name: '',
      birthDate: '',
      email: '',
      address: '',
    },
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
    fetch('http://localhost:3000/Patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={400}>
          <TextField
            label="Nome do Paciente"
            variant="filled"
            {...register('name', { required: "Campo 'Nome' é obrigatório" })}
            sx={{
              bgcolor: 'secondary.main',
              marginTop: '2rem',
            }}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Data de Nascimento"
            type="date"
            variant="filled"
            {...register('birthDate', {
              required: "Campo 'Data de Nascimento' é obrigatório",
            })}
            sx={{
              bgcolor: 'secondary.main',
            }}
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.birthDate}
            helperText={errors.birthDate?.message}
          />
          <TextField
            label="Email"
            variant="filled"
            type="email"
            {...register('email', {
              required: "Campo 'Email' é obrigatório",
            })}
            sx={{
              bgcolor: 'secondary.main',
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Endereço"
            variant="filled"
            {...register('address', {
              required: "Campo 'Endereço' é obrigatório",
            })}
            sx={{
              bgcolor: 'secondary.main',
            }}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <Button
            type="submit"
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
      <DevTool control={control} />
    </>
  );
}
