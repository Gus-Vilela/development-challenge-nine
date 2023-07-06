import { styled } from '@mui/system';
import {
  Paper,
  TablePagination,
  Stack,
  Button,
  Typography,
  TableContainer,
  Table,
  TableRow,
  IconButton,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export const StyledPaper = styled(Paper)`
  width: 100%;
  margin-top: 1rem;
  box-sizing: border-box;
  elevation: 0;
`;

export const StyledAssignmentIcon = styled(AssignmentIcon)`
  margin-right: 1rem;
  color: ${(props) => props.theme.palette.primary.main};
  margin: 0 1rem 0 0.5rem;
`;

export const StyledPriorityHighIcon = styled(PriorityHighIcon)`
  margin-right: 1rem;
  color: ${(props) => props.theme.palette.error.main};
  margin: 0 1rem 0 0.5rem;
`;

export const StyledTablePagination = styled(TablePagination)`
  & .MuiTablePagination-caption {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

export const StyledStack = styled(Stack)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  width: 100%;
  padding: 1.2rem;
  background-color: #f5f5f5;
  box-sizing: border-box;
`;

export const StyledPeopleAltIcon = styled(PeopleAltIcon)`
  margin-right: 1rem;
  color: ${(props) => props.theme.palette.primary.main};
  margin: 0 1rem 0 0.5rem;
`;

export const StyledButton = styled(Button)`
  text-transform: capitalize;
`;

export const StyledTypography = styled(Typography)`
  flex-grow: 1;
  color: ${(props) => props.theme.palette.tertiary.main};
`;

export const StyledTableContainer = styled(TableContainer)`
  max-height: 432px;
  box-sizing: border-box;
`;

export const StyledTable = styled(Table)`
  & .MuiTableCell-head {
    text-transform: uppercase;
    font-weight: 500;
    color: #707070;
    letter-spacing: 1px;
  }
`;

export const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
`;

export const StyledIconButton = styled(IconButton)`
  &:hover {
    background-color: #e57373;
    color: #fff;
  }
`;
