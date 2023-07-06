import AddIcon from '@mui/icons-material/Add';
import SearchBar from '../SearchBar/SearchBar';
import {
  StyledButton,
  StyledPeopleAltIcon,
  StyledStack,
  StyledTypography,
} from './Styles';

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
      <StyledStack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <StyledPeopleAltIcon />
        <StyledTypography variant="h5">{title}</StyledTypography>
        <StyledButton
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            handleClickOpen();
          }}
        >
          {buttonText}
        </StyledButton>
      </StyledStack>
      <SearchBar
        rawPatients={rawPatients}
        setPatients={setPatients}
        searchLabel="Pesquisar por nome..."
      />
    </>
  );
}
