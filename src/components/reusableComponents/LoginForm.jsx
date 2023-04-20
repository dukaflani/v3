// MUI Imports
import { Grid, Stack, Typography } from "@mui/material"

// NPM Imports
import { Formik, Form } from "formik"
import * as Yup from 'yup'

// Project Imports
import MyInput from "../formInputs/MyInput"
import MyCheckBox from "../formInputs/MyCheckBox"
import MySubmitButton from "../formInputs/MySubmitButton"
import MyPasswordInput from "../formInputs/MyPasswordInput"



const INITIAL_FORM_STATE = {
    password: '',
    email: '',
    keepLoggedIn: false,

}

const FORM_VALIDATION = Yup.object().shape({
    password: Yup.string().required('Required'),
    email: Yup.string().email('Please enter a valid email').required('required'),
    keepLoggedIn: Yup.boolean()
})

// const onSubmit = (values) => console.log('On Submit birthdate:', values)

const LoginForm = () => {
  return (
    <Formik 
        initialValues={{...INITIAL_FORM_STATE}} 
        validationSchema={FORM_VALIDATION} 
        // onSubmit={onSubmit}
        >
        <Form>
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Typography variant="h6">Login</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <MyInput required name='email' label='Email' />
                    </Grid>
                    <Grid item xs={12}>
                        <MyPasswordInput required name='password' label='Password' />
                    </Grid>
                    <Grid item xs={12}>
                        <MyCheckBox name='keepLoggedIn' legend='Keep you logged in?' label='Yes, remember me.' />
                    </Grid>
                    <Grid item xs={12}>
                        <MySubmitButton>Login</MySubmitButton>
                    </Grid>
                </Grid>
            </Stack>
        </Form>
    </Formik>
  )
}

export default LoginForm