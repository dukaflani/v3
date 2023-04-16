// MUI Imports
import { Button, CircularProgress } from '@mui/material'

// NPM Imports
import { useFormikContext } from 'formik'

const MySubmitButton = ({ children, is_loading, ...otherProps }) => {

    const { submitForm } = useFormikContext()

    const handleSubmit = () => {
        submitForm()
    }

    const buttonConfig = {
        onClick: handleSubmit,
        variant: 'contained',
        fullWidth: true
    }

  return (
    <Button {...buttonConfig} startIcon={is_loading && <CircularProgress color="inherit" size={25} />}>
        {children}
    </Button>
  )
}

export default MySubmitButton