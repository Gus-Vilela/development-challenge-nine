import { Stack, Typography, Button } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddIcon from '@mui/icons-material/Add';
import SearchBar from './SearchBar';

export default function TableHeader({
  rawPatients,
  setPatients,
  setOpenFormPopup,
  setDefaultValues,
  title,
  buttonText,
}) {
  const handleClickOpen = () => {
    setOpenFormPopup(true);
    setDefaultValues({});
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          width: '100%',
          p: 2,
          backgroundColor: '#f5f5f5',
          boxSizing: 'border-box',
        }}
      >
        <PeopleAltIcon
          sx={{
            mr: 1,
            color: 'primary.main',
            margin: '0 1rem 0 0.5rem',
          }}
        />
        <Typography variant="h5" sx={{ flexGrow: 1 }} color="tertiary.main">
          {title}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'capitalize',
          }}
          onClick={() => {
            handleClickOpen();
          }}
        >
          {buttonText}
        </Button>
      </Stack>
      <SearchBar
        rawPatients={rawPatients}
        setPatients={setPatients}
        searchLabel="Pesquisar por nome..."
      />
    </>
  );
}
