// MUI Imports
import { Grid, Stack, Typography } from "@mui/material"

// NPM Imports
import { Formik, Form } from "formik"
import * as Yup from 'yup'

// Project Imports
import MyInput from "../formInputs/MyInput"
import MySelectInput from "../formInputs/MySelectInput"
import MyCheckBox from "../formInputs/MyCheckBox"
import MySubmitButton from "../formInputs/MySubmitButton"
import MyPasswordInput from "../formInputs/MyPasswordInput"



const INITIAL_FORM_STATE = {
    username: '',
    password1: '',
    password2: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    role: '',
    brandName: '',
    termsOfService: false,

}

const FORM_VALIDATION = Yup.object().shape({
    username: Yup.string().required('Required'),
    password1: Yup.string().required('Required'),
    password2: Yup.string().oneOf([Yup.ref('password1'), null], 'Passwords must match').required('Required'),
    email: Yup.string().email('Please enter a valid email').required('required'),
    phone: Yup.number().integer().typeError('Please enter a valid phone number'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    role: Yup.string().required('Required'),
    brandName: Yup.string().required('Required'),
    termsOfService: Yup.boolean().oneOf([true], 'Please read and accept our T&Cs').required('Please read and accept our T&Cs')
})

const onSubmit = (values) => console.log('On Submit birthdate:', values)

const RegisterForm = () => {
  return (
    <Formik initialValues={{...INITIAL_FORM_STATE}} validationSchema={FORM_VALIDATION} onSubmit={onSubmit}>
        <Form>
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Typography variant="h6">Create an account</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant="subtitle1">Account Information:</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <MyInput required name='firstName' label='First Name' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <MyInput required name='lastName' label='Last Name' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <MyInput required name='username' label='Username' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <MySelectInput required name='role' label='Account Type' />
                    </Grid>
                    <Grid item xs={12}>
                        <MyInput required name='brandName' label='Stage Name/Brand Name' />
                    </Grid>

                    <Grid item xs={12} >
                        <Typography variant="subtitle1">Login Information:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <MyInput required name='email' label='Email' />
                    </Grid>
                    <Grid item xs={12}>
                        <MyInput name='phone' label='Phone' />
                    </Grid>
                    <Grid item xs={12}>
                        <MyPasswordInput required name='password1' label='Password' />
                    </Grid>
                    <Grid item xs={12}>
                        <MyPasswordInput required name='password2' label='Confirm Password' />
                    </Grid>
                    <Grid item xs={12}>
                        <MyCheckBox name='termsOfService' legend='Terms & Conditions' label='I agree.' />
                    </Grid>
                    <Grid item xs={12}>
                        <MySubmitButton>Register Account</MySubmitButton>
                    </Grid>
                </Grid>
            </Stack>
        </Form>
    </Formik>
  )
}

export default RegisterForm