/* eslint-disable react/jsx-props-no-spreading */
import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import axios from 'axios';

export default function PatientForm({ defaultValues }) {
  const { id } = defaultValues;

  const { register, handleSubmit, formState, control, setValue } = useForm({
    defaultValues: {
      name: '',
      birthDate: '',
      email: '',
      address: '',
    },
  });
  const { errors } = formState;

  const handleSetValues = (data) => {
    setValue('name', data.name);
    setValue('birthDate', data.birthDate);
    setValue('email', data.email);
    setValue('address', data.address);
  };

  useEffect(() => {
    handleSetValues(defaultValues);
  }, [defaultValues]);

  const onSubmit = (data) => {
    if (id) {
      axios
        .put(`http://localhost:3000/Patient/${id}`, data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post('http://localhost:3000/Patient', data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // validate user age to be over 18 considering days, months and years
  const validateAge = (date) => {
    const dateArray = date.split('-');
    const day = dateArray[2];
    const month = dateArray[1];
    const year = dateArray[0];
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    if (age < 18) {
      return false;
    }
    return true;
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
            {...register('name', {
              required: "Campo 'Nome' é obrigatório",
              maxLength: {
                value: 50,
                message: 'Nome deve ter no máximo 50 caracteres',
              },
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/,
                message: 'Nome deve conter apenas letras e espaços',
              },
            })}
            sx={{
              bgcolor: 'secondary.main',
              marginTop: '2rem',
            }}
            InputLabelProps={{
              shrink: true,
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
              validate: {
                isOver18: (date) =>
                  validateAge(date) || 'O paciente deve ter mais de 18 anos',
              },
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
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email inválido',
              },
            })}
            sx={{
              bgcolor: 'secondary.main',
            }}
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Endereço"
            variant="filled"
            {...register('address', {
              required: "Campo 'Endereço' é obrigatório",
              maxLength: {
                value: 50,
                message: 'Endereço deve ter no máximo 50 caracteres',
              },
            })}
            sx={{
              bgcolor: 'secondary.main',
            }}
            InputLabelProps={{
              shrink: true,
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
