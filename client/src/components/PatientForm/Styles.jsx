import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export const StyledStack = styled(Stack)`
  width: 450px;
  margin: 10px;
`;

export const StyledTextField = styled(TextField)`
  background-color: ${(props) => props.theme.palette.secondary.main};
  &:first-child {
    margin-top: 1rem;
  }
`;
