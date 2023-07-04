/* eslint-disable react/jsx-props-no-spreading */
import { Button, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import axios from 'axios';
import { isEmail, isAfter } from 'validator';

export default function PatientForm(props) {
  const { defaultValues, setOpenPopup, setSuccessMessage, setErrorMessage } =
    props;
  const { id } = defaultValues;
  const { setOpenSnackbar } = props;
  const { register, handleSubmit, setError, formState, control, setValue } =
    useForm({});
  const { errors } = formState;

  // set values to the form
  const handleSetValues = (data) => {
    setValue('name', data.name);
    setValue('birthDate', data.birthDate);
    setValue('email', data.email);
    setValue('address', data.address);
  };

  // useEffect is used to set the values to the form
  useEffect(() => {
    handleSetValues(defaultValues);
  }, [defaultValues]);

  const handeEdit = (data) => {
    axios
      .put(`http://localhost:3001/Patient/${id}`, data)
      .then((response) => {
        setOpenPopup(false);
        setOpenSnackbar(true);
        setSuccessMessage(response.data.msg);
      })
      .catch((error) => {
        if (error.response.data.msg === 'Email já cadastrado') {
          setError('email', {
            type: 'manual',
            message: 'Email já cadastrado',
          });
        } else {
          setErrorMessage(error.response.data.msg);
          setOpenSnackbar(true);
        }
      });
  };

  const handleAdd = (data) => {
    axios
      .post('http://localhost:3001/Patient', data)
      .then((response) => {
        setOpenPopup(false);
        setOpenSnackbar(true);
        setSuccessMessage(response.data.msg);
      })
      .catch((error) => {
        if (error.response.data.msg === 'Email já cadastrado') {
          setError('email', {
            type: 'manual',
            message: 'Email já cadastrado',
          });
        } else {
          setErrorMessage(error.response.data.msg);
          setOpenSnackbar(true);
        }
      });
  };

  // onSubmit is used to add or edit a patient
  const onSubmit = (data) => {
    if (id) {
      handeEdit(data);
    } else {
      handleAdd(data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={400}>
          <TextField
            label="Nome do Paciente"
            variant="filled"
            {...register('name', {
              required: "Campo 'Nome' é obrigatório",
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
                // verify if the birthDate is in the future
                isAfter: (value) => {
                  if (isAfter(value)) {
                    return 'Data de Nascimento não pode ser no futuro';
                  }
                  return true;
                },
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
              validate: {
                // verify if the email is valid
                isEmail: (value) => {
                  if (!isEmail(value)) {
                    return 'Email inválido';
                  }
                  return true;
                },
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
          <Button type="submit" variant="contained">
            Enviar
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </>
  );
}
