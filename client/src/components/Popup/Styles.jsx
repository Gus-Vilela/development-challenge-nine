import { styled } from '@mui/system';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  width: 100%;
  box-sizing: border-box;
`;

export const StyledDialogContent = styled(DialogContent)`
  margin-top: 0;
  padding-top: 0;
`;

export const StyledIconButton = styled(IconButton)`
  &:hover {
    color: #d32f2f;
  }
`;

export const StyledStack = styled(Stack)`
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
`;

export const StyledTypography = styled(Typography)`
  flex-grow: 1;
`;
