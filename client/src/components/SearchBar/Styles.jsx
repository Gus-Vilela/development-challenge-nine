import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export const StyledBox = styled(Box)`
  border-radius: 0;
  width: 100%;
  padding: 1rem 2rem;
  box-sizing: border-box;
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
  box-sizing: border-box;
`;

export const StyledSearchIcon = styled(SearchIcon)`
  color: ${(props) => props.theme.palette.primary.main};
`;
