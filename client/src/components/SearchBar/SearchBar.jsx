import { StyledBox, StyledSearchIcon, StyledTextField } from './Styles';

export default function SearchBar({
  rawPatients,
  setPatients,
  searchLabel,
}) {
  // handleSearchTextChange is used to handle the search text change
  const handleSearchTextChange = (e) => {
    // If the search text is empty, set the patients to the raw patients
    if (!e.target.value) {
      return setPatients(rawPatients);
    }
    // Filter the patients based on the search text
    const filteredPatients = rawPatients.filter((patient) =>
      patient.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // Set the patients to the filtered patients
    return setPatients(filteredPatients);
  };

  return (
    <StyledBox>
      <StyledTextField
        label={searchLabel}
        variant="outlined"
        onChange={handleSearchTextChange}
        InputProps={{
          endAdornment: <StyledSearchIcon />,
        }}
      />
    </StyledBox>
  );
}
