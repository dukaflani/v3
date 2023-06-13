// React Imports
import { useEffect, useState } from "react"

// NextJs Imports
import { useRouter } from "next/router"

// MUI Imports
import { Autocomplete, Avatar, Box, Button, CircularProgress, Dialog, DialogActions, 
    DialogContent, DialogTitle, Grid, Stack, TextField, Typography } from "@mui/material"

// NPM Imports
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useSelector, useDispatch } from "react-redux"
import { useQuery, useMutation } from "@tanstack/react-query"

// Project Imports
import { updateProfile, getUserProfile } from "@/axios/axios"
import { updateProfileInfo } from "@/redux/features/auth/authSlice"
import { countriesChoices } from "@/data/countries"
import ImageUploadPreview from "./ImageUploadPreview"
import MyTextField from "../formInputs/MyTextField"
import MyTextArea from "../formInputs/MyTextArea"



const ProfileSettingsForm = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [openLoadingProfileDialogue, setOpenLoadingProfileDialogue] = useState(false)
    const [openUpdatedProfileDialogue, setOpenUpdatedProfileDialogue] = useState(false)
    const [openerrorUpdatingProfileDialogue, setOpenerrorUpdatingProfileDialogue] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [profile_id, setProfile_id] = useState("")
    const [profile_management, setProfile_management] = useState("")
    const [profile_nationality, setProfile_nationality] = useState(null)
    const [profile_avatar, setProfile_avatar] = useState("")
    const [booking_email, setBooking_email] = useState("")
    const [booking_contact, setBooking_contact] = useState("")
    const [about, setAbout] = useState("")
    const [facebook, setFacebook] = useState("")
    const [twitter, setTwitter] = useState("")
    const [instagram, setInstagram] = useState("")
    const [tiktok, setTiktok] = useState("")
    const [youtube_channel, setYoutube_channel] = useState("")
    const [currentUserUsername, setCurrentUserUsername] = useState("")
    
    
    const currentUser = useSelector((state) => state.auth.userInfo)
    const user_profile = useSelector((state) => state.auth.profileInfo)
    const accessToken = useSelector((state) => state.auth.token)

    const userID = currentUser?.id 
    const { data: userProfile, isLoading: loadingProfile } = useQuery(["user-profile", userID], (userID) => getUserProfile(userID),
    
    {
        onSuccess: (data, _variables, _context) => {
            dispatch(updateProfileInfo(data[0]))
            setProfile_id(data[0]?.id)
            setProfile_management(data[0]?.management ? data[0]?.management : "")
            setProfile_nationality(countriesChoices.filter((country) => country.code === data[0]?.nationality))
            setProfile_avatar(data[0]?.profile_avatar ? data[0]?.profile_avatar : "")
            setBooking_email(data[0]?.booking_email ? data[0]?.booking_email : "")
            setBooking_contact(data[0]?.booking_contact ? data[0]?.booking_contact : "")
            setAbout(data[0]?.about ? data[0]?.about : "")
            setFacebook(data[0]?.facebook ? data[0]?.facebook : "")
            setTwitter(data[0]?.twitter ? data[0]?.twitter : "")
            setInstagram(data[0]?.instagram ? data[0]?.instagram : "")
            setTiktok(data[0]?.tiktok ? data[0]?.tiktok : "")
            setYoutube_channel(data[0]?.youtube_channel ? data[0]?.youtube_channel : "")
            setCurrentUserUsername(currentUser?.username)
            setOpenLoadingProfileDialogue(false)
        },
        enabled: !!userID
    },
    )

    const { mutate: updateMyProfile, isLoading: loadingProfileUpdate } = useMutation(updateProfile, {
        onSuccess: (data, _variables, _context) => {
            dispatch(updateProfileInfo(data))
            // router.push({ pathname: '/' })
            setOpenUpdatedProfileDialogue(true)
        },
        onError: (error, _variables, _context) => {
            setErrorMessage(error?.response?.data?.detail)
            setOpenerrorUpdatingProfileDialogue(true) 
        }
    })

    useEffect(() => {
      if (loadingProfile) {
        setOpenLoadingProfileDialogue(true)
        
      }
    }, [loadingProfile])


    const FILE_SIZE = 1000 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/png"
    ];


    const formik = useFormik({
        initialValues: {
            id: profile_id,
            management: profile_management,
            // nationality: countriesChoices[59],
            nationality: profile_nationality,
            profile_avatar: profile_avatar,
            booking_email: booking_email,
            booking_contact: booking_contact,
            about: about,
            facebook: facebook,
            twitter: twitter,
            instagram: instagram,
            tiktok: tiktok,
            youtube_channel: youtube_channel,
        },
        // enableReinitialize: true,
        validationSchema: Yup.object({
            id: Yup.number(),
            management: Yup.string(),
            nationality: Yup.object({
                code: Yup.string(),
                label: Yup.string(),
                phone: Yup.string(),
            }).required("Required"),
            profile_avatar: Yup
                .mixed()
                .test(
                    "fileSize",
                    "Should not be more than 1MB",
                    value => value && value.size <= FILE_SIZE
                  )
                  .test(
                    "fileFormat",
                    "Unsupported Format! Use png, jpg or jpeg",
                    value => value && SUPPORTED_FORMATS.includes(value.type)
                  ),
            booking_email: Yup.string().email("Please enter a valid email"),
            booking_contact: Yup.number().integer().typeError("Please enter a valid phone number"),
            about: Yup.string(),
            facebook: Yup.string(),
            twitter: Yup.string(),
            instagram: Yup.string(),
            tiktok: Yup.string(),
            youtube_channel: Yup.string(),
        }),
        onSubmit: () => {
            updateMyProfile({
                accessToken,
                id: profile_id,
                management: formik.values.management,
                nationality: formik.values.nationality?.code,
                profile_avatar: formik.values.profile_avatar,
                booking_email: formik.values.booking_email,
                booking_contact: formik.values.booking_contact,
                about: formik.values.about,
                facebook: formik.values.facebook,
                twitter: formik.values.twitter,
                instagram: formik.values.instagram,
                tiktok: formik.values.tiktok,
                username: currentUserUsername,
                youtube_channel: formik.values.youtube_channel
        })
        },    
    })



    const textFieldConfig = {
        fullWidth: true,
        variant: 'outlined',
        size: "small",
      }

    const textAreaConfig = {
        fullWidth: true,
        variant: 'outlined',
      }

      useEffect(() => {
        formik.setFieldValue("id", profile_id);
        formik.setFieldValue("management", profile_management);
        formik.setFieldValue("nationality", profile_nationality && profile_nationality[0]);
        // formik.setFieldValue("profile_avatar", profile_avatar);
        formik.setFieldValue("booking_email", booking_email);
        formik.setFieldValue("booking_contact", booking_contact);
        formik.setFieldValue("about", about);
        formik.setFieldValue("facebook", facebook);
        formik.setFieldValue("twitter", twitter);
        formik.setFieldValue("instagram", instagram);
        formik.setFieldValue("tiktok", tiktok);
        formik.setFieldValue("youtube_channel", youtube_channel);
      }, [profile_id, profile_management, profile_nationality, 
        booking_email, booking_contact, about, facebook, twitter, instagram, tiktok, youtube_channel, formik, currentUser]);


  return (
    <>
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Edit profile</Typography>
            </Grid>
            <Grid item xs={12} >
                <Typography variant="subtitle1">Profile information:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                    <Autocomplete
                        name="nationality"
                        options={countriesChoices}
                        size="small"
                        value={formik.values.nationality}
                        onChange={(event, newValue) => formik.setFieldValue("nationality", newValue)}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
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
                                helperText={formik.errors.nationality && formik.touched.nationality ? formik.errors.nationality : null} 
                                error={formik.errors.nationality && formik.touched.nationality ? true : false}
                                {...params} 
                                label="Nationality" 
                            />
                        )}
                    >

                    </Autocomplete>
                </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
                <MyTextField 
                    name="management" 
                    label="Management" 
                    helperText={formik.errors.management && formik.touched.management ? formik.errors.management : null} 
                    error={formik.errors.management && formik.touched.management ? true : false} 
                    {...textFieldConfig} 
                    {...formik.getFieldProps("management")}
                    />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MyTextField 
                    name="booking_email" 
                    label="Booking Email" 
                    helperText={formik.errors.booking_email && formik.touched.booking_email ? formik.errors.booking_email : null} 
                    error={formik.errors.booking_email && formik.touched.booking_email ? true : false} 
                    {...textFieldConfig} 
                    {...formik.getFieldProps("booking_email")}
                    />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MyTextField 
                    name="booking_contact" 
                    label="Booking Contact" 
                    helperText={formik.errors.booking_contact && formik.touched.booking_contact ? formik.errors.booking_contact : null} 
                    error={formik.errors.booking_contact && formik.touched.booking_contact ? true : false} 
                    {...textFieldConfig} 
                    {...formik.getFieldProps("booking_contact")}
                    />
            </Grid>
            <Grid item xs={12}>
                <MyTextArea 
                    name="about" 
                    label="About" 
                    helperText={formik.errors.about && formik.touched.about ? formik.errors.about : null} 
                    error={formik.errors.about && formik.touched.about ? true : false} 
                    {...textAreaConfig} 
                    {...formik.getFieldProps("about")}
                    
                    />
            </Grid>
            <Grid item xs={12} >
                <Typography variant="subtitle1">Social media:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <MyTextField 
                    name="facebook" 
                    label="Facebook" 
                    helperText={formik.errors.facebook && formik.touched.facebook ? formik.errors.facebook : null} 
                    error={formik.errors.facebook && formik.touched.facebook ? true : false} 
                    {...textFieldConfig} 
                    {...formik.getFieldProps("facebook")}
                    />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MyTextField 
                    name="twitter" 
                    label="Twitter" 
                    helperText={formik.errors.twitter && formik.touched.twitter ? formik.errors.twitter : null} 
                    error={formik.errors.twitter && formik.touched.twitter ? true : false} 
                    {...textFieldConfig} 
                    {...formik.getFieldProps("twitter")}
                    />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MyTextField 
                    name="instagram" 
                    label="Instagram" 
                    helperText={formik.errors.instagram && formik.touched.instagram ? formik.errors.instagram : null} 
                    error={formik.errors.instagram && formik.touched.instagram ? true : false} 
                    {...textFieldConfig} 
                    {...formik.getFieldProps("instagram")}
                    />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MyTextField 
                    name="tiktok" 
                    label="TikTok" 
                    helperText={formik.errors.tiktok && formik.touched.tiktok ? formik.errors.tiktok : null} 
                    error={formik.errors.tiktok && formik.touched.tiktok ? true : false} 
                    {...textFieldConfig} 
                    {...formik.getFieldProps("tiktok")}
                    />
            </Grid>
            <Grid item xs={12}>
                <MyTextField 
                    name="youtube_channel" 
                    label="Youtube Channel" 
                    helperText={formik.errors.youtube_channel && formik.touched.youtube_channel ? formik.errors.youtube_channel : null} 
                    error={formik.errors.youtube_channel && formik.touched.youtube_channel ? true : false} 
                    {...textFieldConfig} 
                    {...formik.getFieldProps("youtube_channel")}
                    />
            </Grid>
            <Grid item xs={12}>
                <Stack spacing={1}>
                    <Typography variant="subtitle1">Profile Picture:</Typography>
                    <input 
                        type="file"
                        name="profile_avatar"
                        onChange={(e) => formik.setFieldValue("profile_avatar", e.target.files[0])}
                    />
                    {formik.errors.profile_avatar && formik.touched.profile_avatar ? (
                        <Typography sx={{color: 'red'}} variant="caption">{formik.errors.profile_avatar}</Typography>
                    ) : null}
                {/* {formik.values.profile_avatar ? <ImageUploadPreview file={formik.values.profile_avatar} />
                :
                <img style={{ width: '100px', height: '100px' }} src={profile_avatar ? profile_avatar : '/assets/pictures/no-image.png'} alt=''/>
            } */}  
                <Avatar variant="rounded" sx={{height: 100, width: 100}} src={user_profile?.profile_avatar}  />
                {/* <img style={{ width: '100px', height: '100px' }} src={user_profile != null ? user_profile?.profile_avatar : '/assets/pictures/no-image.png'} alt=''/> */}
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth variant="contained" type="submit" startIcon={loadingProfileUpdate && <CircularProgress color="inherit" size={25} />}>{loadingProfileUpdate ? 'Updating Profile...' : 'Update Profile'}</Button>
            </Grid>
        </Grid>
    </form>

    {/* Loading Profile Information Dialogue */}
    <Dialog
            open={openLoadingProfileDialogue}
            onClose={() => setOpenLoadingProfileDialogue(false)} 
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Loading your profile information..."}
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", padding: 2}}>
                    <CircularProgress />
                </Box>
            </DialogContent>
            <DialogActions>
            <Button color="error" onClick={() => setOpenLoadingProfileDialogue(false)}>Close</Button>
            </DialogActions>
        </Dialog>


    {/* Profile updated Dialogue */}
    <Dialog
            open={openUpdatedProfileDialogue}
            onClose={() => setOpenUpdatedProfileDialogue(false)} 
            aria-labelledby="alert-dialog-title" 
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Success!"}
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", padding: 2}}>
                    <Typography variant="body2">Your profile has been successfully updated</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => router.push({pathname: '/account/profile'})}>View profile</Button>
            <Button color="error" onClick={() => setOpenUpdatedProfileDialogue(false)}>Close</Button>
            </DialogActions>
        </Dialog>

    {/* Loading Profile update error Dialogue */}
    <Dialog
            open={openerrorUpdatingProfileDialogue}
            onClose={() => setOpenerrorUpdatingProfileDialogue(false)}
            aria-labelledby="alert-dialog-title" 
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle sx={{color: 'red'}} id="alert-dialog-title">
            {"Error updating profile..."}
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", padding: 2}}>
                    <Typography variant="body2">{errorMessage}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button color="error" onClick={() => setOpenerrorUpdatingProfileDialogue(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default ProfileSettingsForm