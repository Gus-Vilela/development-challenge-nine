import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import React from 'react';

export default function Popup(props) {
  return (
    <Dialog open={props.openPopup}>
      <DialogTitle> Title </DialogTitle>
      <DialogContent> {props.children} </DialogContent>
    </Dialog>
  );
}
