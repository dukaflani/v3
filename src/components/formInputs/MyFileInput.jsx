// NPM Imports
import { useField, useFormikContext } from "formik"

// MUI Imports
import { Box, TextField, Typography } from "@mui/material"


const MyFileInput = ({ name, ...otherProps }) => {
const {setFieldValue} = useFormikContext()
  


  return (
    <>
       <input {...otherProps} accept="image/*" name={name} type='file' onChange={(e) => setFieldValue("profile_avatar", e.target.files[0])} />
    </>
  )
}

export default MyFileInput