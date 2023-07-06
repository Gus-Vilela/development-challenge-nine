import { StyledBox, StyledSearchIcon, StyledTextField } from './Styles';

export default function SearchBar({ rawPatients, setPatients, searchLabel }) {
  const handleSearchTextChange = (e) => {
    if (!e.target.value) {
      return setPatients(rawPatients);
    }
    // Filter the patients based on the search text
    const filteredPatients = rawPatients.filter((patient) =>
      patient.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

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
