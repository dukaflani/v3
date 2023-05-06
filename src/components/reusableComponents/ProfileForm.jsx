// React Imports
import { useEffect, useState } from "react"

// MUI Imports
import { Box, Button, Dialog, DialogActions, DialogContent, 
    DialogTitle, Grid, Link, Stack, Typography } from "@mui/material"

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
import { registerAccount, updateProfile } from "@/axios/axios"
import MyFileInput from "../formInputs/MyFileInput";

const ProfileForm = () => {
    
    const [openSuccessDialogue, setOpenSuccessDialogue] = useState(false)
    const [openErrorDialogue, setOpenErrorDialogue] = useState(false)
    const [userSuccessVariables, setUserSuccessVariables] = useState(null)
    const [userErrorVariables, setUserErrorVariables] = useState(null)
    const [userPassword, setUserPassword] = useState("") 
    const [userEmail, setUserEmail] = useState("")
    const [userUsername, setUserUsername] = useState("")
    const [passwordCopied, setPasswordCopied] = useState(false)
    const [copyButtonText, setCopyButtonText] = useState("copy")


  
    // const MAX_FILE_SIZE = 307200; //300KB

    // const validFileExtensions = { image: ['jpg', 'png', 'jpeg', 'PNG'] };
    // const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

    // function isValidFileType(fileName, fileType) {
    //     return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    //   }


    const INITIAL_FORM_STATE = {
        nationality: "",
        management: "",
        booking_email: "",
        booking_contact: "",
        about: "",
        facebook: "",
        twitter: "",
        instagram: "",
        tiktok: "",
        youtube_channel: "",
        profile_avatar: ""
    
    }
    
    
    const FORM_VALIDATION = Yup.object().shape({
        nationality: Yup.string().required("Required"),
        management: Yup.string().required("Required"),
        booking_email: Yup.string().required("Required"),
        booking_contact: Yup.number().integer().typeError("Please enter a valid phone number"),
        about: Yup.string().required("Required"),
        facebook: Yup.string().required("Required"),
        twitter: Yup.string().required("Required"),
        instagram: Yup.string().required("Required"),
        tiktok: Yup.string().required("Required"),
        youtube_channel: Yup.string().required("Required"),
        profile_avatar: Yup
            .mixed()
            .required("Required")
            .test("is-valid-size", "Max allowed size is 300KB", value => value && value?.size <= MAX_FILE_SIZE)
            .test("is-valid-type", "Not a valid image type", value => isValidFileType(value && value?.name?.toLowerCase(), "profile_avatar"))
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
        // mutate(values)
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
            setCopyButtonText("Copied!")
            setTimeout(() => {
                setCopyButtonText("Copy")
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
                            <Typography variant="h6">Edit your profile</Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography variant="subtitle1">Account Information:</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MyInput required name="nationality" label="Nationality" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MyInput required name="management" label="Management" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MyInput required name="booking_email" label="Booking Email" />
                        </Grid>
                        {/* <Grid item xs={12} md={6}>
                            <MySelectInput required name='role' label='Account Type' />
                        </Grid> */}
                        <Grid item xs={12}>
                            <MyInput required name="booking_contact" label="Booking Contact" />
                        </Grid>

                        <Grid item xs={12} >
                            <Typography variant="subtitle1">Login Information:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <MyInput required name="about" label="About" />
                        </Grid>
                        <Grid item xs={12}>
                            <MyInput name="facebook" label="Facebook" />
                        </Grid>
                        <Grid item xs={12}>
                            <MyFileInput name="profile_avatar" />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <MyPasswordInput required name='password' label='Password' />
                        </Grid> */}
                        {/* <Grid item xs={12}>
                            <MyPasswordInput required name='confirmPassword' label='Confirm Password' />
                        </Grid> */}
                        {/* <Grid item xs={12}>
                            <MyCheckBox name='termsOfService' legend='Agree to our Terms' label={<Link underline="none" href="/legal/terms_and_conditions">Terms and Conditions</Link>} />
                        </Grid> */}
                        <Grid item xs={12}>
                            <MySubmitButton is_loading={isLoading}>{isLoading ? "Creating Account..." : "Register Account"}</MySubmitButton>
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

export default ProfileForm