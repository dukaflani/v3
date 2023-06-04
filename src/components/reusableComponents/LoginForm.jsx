// React Imports
import { useState } from "react"

// NextJs Imports
import { useRouter } from "next/router" 

// MUI Imports
import { Box, Grid, Link, Stack, Typography } from "@mui/material"

// NPM Imports
import { Formik, Form } from "formik"
import * as Yup from 'yup'
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

// Project Imports
import MyInput from "../formInputs/MyInput"
import MyCheckBox from "../formInputs/MyCheckBox"
import MySubmitButton from "../formInputs/MySubmitButton"
import MyPasswordInput from "../formInputs/MyPasswordInput"
import { loginUser } from "@/axios/axios"
import { updateToken } from "@/redux/features/auth/authSlice"



const INITIAL_FORM_STATE = {
    password: "",
    email: "",
    keepLoggedIn: false,

}

const FORM_VALIDATION = Yup.object().shape({
    password: Yup.string().required("Required"),
    email: Yup.string().email("Please enter a valid email").required("required"),
    keepLoggedIn: Yup.boolean()
})


const LoginForm = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(null)

    const { mutate: performLogin, isLoading: loginLoading, isError: loginError, isSuccess: loginSuccess } = useMutation(loginUser, {
        onSuccess: (data, _variables, _context) => {
            // Update token in redux state
            dispatch(updateToken(data?.access));
            // Set cookie
            if (keepMeLoggedIn) {
                fetch(process.env.NEXT_PUBLIC_BAKE_URL, {
                    method: 'POST',
                    body: JSON.stringify({ refreshToken: data?.refresh }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }); 
            }
            // Navigate to profile settings
            router.push({ pathname: `/` });
        },
    })
    console.log("keep me logged in value:", keepMeLoggedIn)

    const onSubmit = (values) => {
        setKeepMeLoggedIn(values.keepLoggedIn)
        performLogin(values)
    }
    
  return (
    <Formik 
        initialValues={{...INITIAL_FORM_STATE}} 
        validationSchema={FORM_VALIDATION} 
        onSubmit={onSubmit}
        >
        <Form>
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Typography variant="h6">Login</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Stack direction="row" spacing={0.5}>
                            <Typography variant="subtitle2">Don&apos;t have an account?</Typography>
                            <Box onClick={() => router.push({ pathname: '/account/register' })} sx={{cursor: 'pointer'}}>
                                <Typography color='primary' variant="subtitle2">Register here</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <MyInput required name="email" label="Email" />
                    </Grid>
                    <Grid item xs={12}>
                        <MyPasswordInput required name="password" label="Password" />
                    </Grid>
                    <Grid item xs={12}>
                        <MyCheckBox name="keepLoggedIn" legend="Keep you logged in?" label="Yes, remember me." />
                    </Grid>
                    <Grid item xs={12}>
                        <MySubmitButton is_loading={loginLoading} >Login</MySubmitButton>
                    </Grid>
                    <Grid item xs={12} >
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                            <Box onClick={() => router.push({ pathname: '/' })} sx={{cursor: 'pointer'}}>
                                <Typography color='primary' variant="subtitle2">Forgot Password?</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
        </Form>
    </Formik>
  )
}

export default LoginForm