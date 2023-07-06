import { TextField, Box, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
    <Box
      sx={{
        borderRadius: 0,
        width: '100%',
        padding: '1rem 2rem',
        boxSizing: 'border-box',
      }}
    >
      <TextField
        sx={{
          width: '100%',
          boxSizing: 'border-box',
        }}
        label={searchLabel}
        variant="outlined"
        onChange={handleSearchTextChange}
        InputProps={{
          endAdornment: (
            <SearchIcon
              sx={{
                color: 'primary.main',
              }}
            />
          ),
        }}
      />
    </Box>
  );
}
