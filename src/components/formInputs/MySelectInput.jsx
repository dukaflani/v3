// MUI Imports
import { TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText } from "@mui/material"

// NPM Imports
import { useField, useFormikContext } from "formik"
import React from "react";

const currencies = [
  {
    value: 'USER',
    label: 'User',
  },
  {
    value: 'ARTIST',
    label: 'Artist',
  },
  {
    value: 'VENDOR',
    label: 'Vendor',
  },
  {
    value: 'PROMOTER',
    label: 'Promoter',
  },
];


const MySelectInput = ({ name, label, ...otherProps }) => {

  const { setFieldValue } = useFormikContext()

  const [field, meta] = useField(name)

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  }

  const selectConfig = {
    ...field,
    ...otherProps,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
    size: 'small'
  }



  if (meta && meta.touched && meta.error) {
    selectConfig.error = true
    selectConfig.helperText = meta.error
  }


  return (
    <>
        <TextField {...selectConfig} label={label} >
          {currencies?.map((option, i) => (
            <MenuItem key={i} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </>
  )
}

export default MySelectInput