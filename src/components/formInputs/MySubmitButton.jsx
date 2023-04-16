// MUI Imports
import { Button } from '@mui/material'

// NPM Imports
import { useFormikContext } from 'formik'

const MySubmitButton = ({ children, ...otherProps }) => {

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
    <Button {...buttonConfig} >
        {children}
    </Button>
  )
}

export default MySubmitButton