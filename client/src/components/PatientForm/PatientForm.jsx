import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { isEmail, isAfter } from 'validator';
import { createPatient, editPatient } from '../../api/services/Patient';
import { StyledStack, StyledTextField } from './styles';

export default function PatientForm({
  defaultValues,
  setOpenPopup,
  handleErrorMessage,
  handleSuccessMessage,
}) {
  const { register, handleSubmit, setError, formState, setValue } = useForm({});
  const { errors } = formState;
  const { id } = defaultValues;
  // set values to the form
  const handleFormSetValues = (data) => {
    setValue('name', data.name);
    setValue('birthDate', data.birthDate);
    setValue('email', data.email);
    setValue('address', data.address);
  };

  // useEffect is used to set the values to the form
  useEffect(() => {
    handleFormSetValues(defaultValues);
  }, [defaultValues]);
  // handleFormErrorMessage is used to handle the error message from the form
  const handleFormErrorMessage = (error) => {
    if (error.response.data.msg === 'Email já cadastrado') {
      setError('email', {
        type: 'manual',
        message: 'Email já cadastrado',
      });
    } else {
      handleErrorMessage(error);
    }
  };
  // handleAdd is used to add a patient
  const handleAdd = async (data) => {
    try {
      const response = await createPatient(data);
      setOpenPopup(false);
      handleSuccessMessage(response);
    } catch (error) {
      handleFormErrorMessage(error);
    }
  };
  // handeEdit is used to edit a patient
  const handeEdit = async (data) => {
    try {
      const response = await editPatient(id, data);
      setOpenPopup(false);
      handleSuccessMessage(response);
    } catch (error) {
      handleFormErrorMessage(error);
    }
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <StyledStack spacing={3}>
        <StyledTextField
          label="Nome do Paciente"
          variant="filled"
          {...register('name', {
            required: "Campo 'Nome' é obrigatório",
            maxLength: {
              value: 100,
              message: 'Nome deve conter no máximo 100 caracteres',
            },
            pattern: {
              value: /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/,
              message: 'Nome deve conter apenas letras e espaços',
            },
          })}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <StyledTextField
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
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.birthDate}
          helperText={errors.birthDate?.message}
        />
        <StyledTextField
          label="Email"
          variant="filled"
          type="email"
          {...register('email', {
            required: "Campo 'Email' é obrigatório",
            maxLength: {
              value: 100,
              message: 'Email deve conter no máximo 100 caracteres',
            },
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
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <StyledTextField
          label="Endereço"
          variant="filled"
          {...register('address', {
            required: "Campo 'Endereço' é obrigatório",
            maxLength: {
              value: 128,
              message: 'Endereço deve conter no máximo 128 caracteres',
            },
          })}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.address}
          helperText={errors.address?.message}
        />
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </StyledStack>
    </form>
  );
}
