// React Imports
import { useEffect, useState } from "react"

// MUI Imports
import { Box, Button, Dialog, DialogActions, DialogContent, 
    DialogTitle, Grid, Stack, Typography } from "@mui/material"

// NPM Imports
import { Formik, Form } from "formik"
import * as Yup from 'yup'
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Tanstack Imports
import { useMutation } from "@tanstack/react-query"

// Icons
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Project Imports
import MyInput from "../formInputs/MyInput"
import MySelectInput from "../formInputs/MySelectInput"
import MyCheckBox from "../formInputs/MyCheckBox"
import MySubmitButton from "../formInputs/MySubmitButton"
import MyPasswordInput from "../formInputs/MyPasswordInput"
import { registerAccount } from "@/axios/axios"




const RegisterForm = () => {
    const [openSuccessDialogue, setOpenSuccessDialogue] = useState(false)
    const [openErrorDialogue, setOpenErrorDialogue] = useState(false)
    const [userSuccessVariables, setUserSuccessVariables] = useState(null)
    const [userErrorVariables, setUserErrorVariables] = useState(null)
    const [userPassword, setUserPassword] = useState('') 
    const [userEmail, setUserEmail] = useState('')
    const [userUsername, setUserUsername] = useState('')
    const [passwordCopied, setPasswordCopied] = useState(false)
    const [copyButtonText, setCopyButtonText] = useState('copy')


    const INITIAL_FORM_STATE = {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        role: '',
        stage_name: '',
        termsOfService: false,
        is_verified: false
    
    }
    
    
    const FORM_VALIDATION = Yup.object().shape({
        username: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
        email: Yup.string().email('Please enter a valid email').required('required'),
        phone: Yup.number().integer().typeError('Please enter a valid phone number'),
        first_name: Yup.string().required('Required'),
        last_name: Yup.string().required('Required'),
        role: Yup.string().required('Required'),
        stage_name: Yup.string().required('Required'),
        termsOfService: Yup.boolean().oneOf([true], 'Please read and accept our T&Cs').required('Please read and accept our T&Cs'),
        is_verified: Yup.boolean()
    })

    const { mutate, isLoading, isError, error, isSuccess } = useMutation(registerAccount, {
        onSuccess: (_data, variables, _context) => {
            setUserSuccessVariables(variables)
               
        },
        onError: (_error, variables, _context) => {
            setUserErrorVariables(variables)
        }
    })

    const onSubmit = (values) => {
        console.log('On Submit values:', values)
        mutate(values)
    }
    

    useEffect(() => {
        if (isSuccess) {
            setOpenSuccessDialogue(true)
        }
       }, [isSuccess])

    useEffect(() => {
        if (isError) {
            setOpenErrorDialogue(true)
        }
       }, [isError])



    useEffect(() => {
        if (userSuccessVariables) {
            setUserEmail(userSuccessVariables?.email)
            setUserPassword(userSuccessVariables?.password) 
        }
       }, [userSuccessVariables])

    useEffect(() => {
        if (userErrorVariables) {
            setUserUsername(userErrorVariables?.username)
        }
       }, [userErrorVariables])

    useEffect(() => {
        if (passwordCopied) {
            setCopyButtonText('Copied!')
            setTimeout(() => {
                setCopyButtonText('Copy')
                setPasswordCopied(false)
            }, 2000);    
        }
    }, [passwordCopied])


  
    const handleCloseSuccess = () => {
        setOpenSuccessDialogue(false);
    };

    const handleCloseError = () => {
        setOpenErrorDialogue(false);
    };

  return (
    <>
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
                            <MyInput required name='first_name' label='First Name' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MyInput required name='last_name' label='Last Name' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MyInput required name='username' label='Username' />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MySelectInput required name='role' label='Account Type' />
                        </Grid>
                        <Grid item xs={12}>
                            <MyInput required name='stage_name' label='Stage Name/Brand Name' />
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
                            <MyPasswordInput required name='password' label='Password' />
                        </Grid>
                        <Grid item xs={12}>
                            <MyPasswordInput required name='confirmPassword' label='Confirm Password' />
                        </Grid>
                        <Grid item xs={12}>
                            <MyCheckBox name='termsOfService' legend='Terms & Conditions' label='I agree.' />
                        </Grid>
                        <Grid item xs={12}>
                            <MySubmitButton is_loading={isLoading}>{isLoading ? 'Creating Account...' : 'Register Account'}</MySubmitButton>
                        </Grid>
                    </Grid>
                </Stack>
            </Form>
        </Formik>

        {/* Success Dialogue */}
        <Dialog
            open={openSuccessDialogue}
            onClose={handleCloseSuccess}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Account created successfully"}
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1}>
                    <Typography variant="body1">Login information:</Typography>
                    <Stack spacing={0.5}>
                        <Box>
                            <Typography variant="button">Email:</Typography>
                            {userSuccessVariables ? <Typography variant="body2">{userEmail}</Typography> : <Typography variant="body2">Loading email...</Typography>}
                        </Box>
                        <Box>
                            <Typography variant="button">Password:</Typography>
                            <Stack sx={{display: 'flex', alignItems: 'center', justifyContent:'start'}} direction="row" spacing={2}>
                                {userSuccessVariables ? <Typography variant="body2">***************</Typography> : <Typography variant="body2">Loading password...</Typography>}
                                {userSuccessVariables && <CopyToClipboard
                                    text={userPassword}
                                    onCopy={() => setPasswordCopied(true)}
                                    >
                                    <Button size="small" variant="text" startIcon={<ContentCopyOutlinedIcon fontSize="inherit" />}>{copyButtonText}</Button>
                                </CopyToClipboard>}
                            </Stack>
                        </Box>
                        <Stack sx={{display: 'flex', alignItems: 'start', justifyContent:'center', paddingTop: 1}} spacing={1} >
                            <Stack direction='row'  spacing={1}>
                                <InfoOutlinedIcon fontSize='small' />
                                <Typography variant="caption">NOTE:</Typography>
                            </Stack>
                            <Typography variant="caption">We won't show your password again so copy and store it in a safe place.</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseSuccess}>Update profile</Button>
            <Button color="error" onClick={handleCloseSuccess}>Cancel</Button>
            </DialogActions>
        </Dialog>


        {/* Error Dialogue */}  
        <Dialog
            open={openErrorDialogue}
            onClose={handleCloseError}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={{color: 'red'}} id="alert-dialog-title">
            {"Error!"}
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1}>
                    {userErrorVariables && <Typography variant="body1">{`Account for usename "${userUsername}" was not created.`}</Typography>}
                    <Stack spacing={0.5}>
                        {/* error info */}
                        {isError && <Grid item xs={12} >
                            <Typography sx={{color: 'red'}} variant="subtitle1">{error?.message}</Typography>
                        </Grid>}
                        {error?.response?.data?.username  && <Grid item xs={12} >
                            <Typography sx={{color: 'red'}} variant="caption">User with this username already exists.</Typography>
                        </Grid>}
                        {error?.response?.data?.email  && <Grid item xs={12} >
                            <Typography sx={{color: 'red'}} variant="caption">User with this email already exists.</Typography>
                        </Grid>}
                        {error?.response?.data?.password  && <Grid item xs={12} >
                            {error?.response?.data?.password?.map((err, i) => (
                                <Box key={i}>
                                    <Typography sx={{color: 'red'}} variant="caption">{err}</Typography>
                                </Box>
                            ))}
                        </Grid>}
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseError}>Edit info</Button>
            {/* <Button color="error" onClick={handleCloseError}>Cancel</Button> */}
            </DialogActions>
        </Dialog>
    </>
  )
}

export default RegisterForm