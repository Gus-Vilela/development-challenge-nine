import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
  StyledTypography,
  StyledStack,
  StyledIconButton,
} from './Styles';

export default function Popup({
  openPopup,
  setOpenPopup,
  children,
  title,
  icon,
}) {
  return (
    <StyledDialog
      open={openPopup}
      maxWidth="md"
      onClose={() => {
        setOpenPopup(false);
      }}
    >
      <StyledDialogTitle>
        <StyledStack direction="row" justifyContent="start" alignItems="center">
          {icon}
          <StyledTypography variant="h6">{title}</StyledTypography>
          <StyledIconButton
            aria-label="fechar popup"
            variant="contained"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </StyledIconButton>
        </StyledStack>
      </StyledDialogTitle>
      <StyledDialogContent dividers>{children}</StyledDialogContent>
    </StyledDialog>
  );
}
