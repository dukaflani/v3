// React Imports
import { useState } from "react";

// MUI Imports
import { Autocomplete, Box, TextField } from "@mui/material"

// Project Imports
// import { countriesChoices } from "@/data/countries"

const MyCountryAutocomplete = ({ name, countries, ...otherProps }) => {

    const [value, setValue] = useState(countries[113]);
    const [inputValue, setInputValue] = useState('');


  return (
    <Autocomplete
      id={name}
      name={name}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          {...otherProps}
          size="small"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  )
}

export default MyCountryAutocomplete