// React Imports
import { useEffect, useState } from 'react';

// NextJS Imports
import { useRouter } from 'next/router'
import Image from "next/legacy/image";

// MUI Imports
import { Box, Stack, Grid, Paper, Avatar, useMediaQuery, Typography, Link, Divider, Tooltip, colors, Button } from '@mui/material'

// NPM Imports
import { useSelector } from 'react-redux'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons"

// Project Imports
import { checkFanbase, joinFanbase, leaveFanbase } from '@/axios/axios';





const ProfileUserInfo = ({ profile }) => {
    const router = useRouter()
    const { username } = router.query
    const currentLoggedInUser = useSelector((state) => state.auth.userInfo)
    const accessToken = useSelector((state) => state.auth.token)
    const is_darkMode = useSelector((state) => state.theme.isDarkMode)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [is_aFan, setIs_aFan] = useState(false)
    // const [fanbase_count, setFanbase_count] = useState(0)
    const [userFanObject, setUserFanObject] = useState(null)



    // Fanbase Fns
    const profileUsername = username

    const profilePageProfileID = {
        profileId: profile?.id,
        userId: currentLoggedInUser?.id
    }
    
    const { data: fanbase } = useQuery(["retrieve-fanbase-object", profilePageProfileID], (profilePageProfileID) => checkFanbase(profilePageProfileID), {
        onSuccess: (data, _variables, _context) => {
            setUserFanObject(data)
        },
        enabled: !!currentLoggedInUser?.id && !!profile?.id
    })



    const queryClient = useQueryClient()
    const { mutate: addNewFan } = useMutation(joinFanbase, { 
        onSuccess: (data, _variables, _context) => {
          queryClient.invalidateQueries(["profile-page-details", profileUsername])
          setIs_aFan(true)
          setUserFanObject(data)
        //   console.log("new fan added:", data)
        },
        onError: (error, _variables, _context) => {
            // console.log("new fan error:", error)
        }
       })

    const { mutate: removeFan } = useMutation(leaveFanbase, {
        onSuccess: (data, _variables, _context) => {
            queryClient.invalidateQueries(["profile-page-details", profileUsername])
            setIs_aFan(false)
        }
    })



    // useEffect(() => {
    //     setFanbase_count(profile?.fanbase_count)
    // }, [profile?.fanbase_count])
    
    useEffect(() => {
        if (fanbase?.id > 0) {
            setIs_aFan(true)
        } else {
            setIs_aFan(false)
        }
    }, [fanbase?.id, profileUsername])
    
    const newFanDetails = {
        accessToken,
        customuserprofile: profile?.id,
    }

    const handleJoin = () => {
        addNewFan(newFanDetails)
        setIs_aFan(true)
        // setFanbase_count(prevCount => prevCount + 1)
    }


    const userFanDetails = {
        accessToken,
        id: userFanObject?.id,
    }
    
    const handleLeave = () => {
        removeFan(userFanDetails)
        setIs_aFan(false)
        // setFanbase_count(prevCount => prevCount - 1)
    }






  return (
    <Paper elevation={0} variant="outlined" sx={{padding: 2}}>
        <Grid container spacing={3} >
            <Grid item xs={12} sm={4}>
                {/* <Avatar sx={{ width: "100%", height: 220 }}  variant='rounded' src='' alt=""/> */}
                <Box 
                    sx={{ backgroundColor: colors.grey[200], width: '100%', position: "relative",}}
                    >
                    <Image 
                        src={profile?.profile_avatar}
                        layout='responsive'
                        alt={profile?.stage_name}
                        width='100%'
                        height={100}
                        />
                </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Box>
                    <Stack spacing={2}>
                        <Stack>
                            <Stack direction='row' spacing={1}>
                                <Typography variant="h5">{profile?.stage_name}</Typography>
                                {profile?.is_verified == "True" && <Tooltip title='Verified'><CheckCircleIcon sx={{ fontSize: 20, color: colors.grey[100], cursor: 'pointer' }} /></Tooltip>}
                            </Stack>
                            <Typography variant="body2">{`@${profile?.username}`}</Typography>
                        </Stack>
                        <Divider/>
                        <Stack>
                            <Grid container rowSpacing={0.5}>
                                <Grid item xs={1}>
                                    <FontAwesomeIcon icon={faFacebook} />
                                </Grid>
                                <Grid item xs={11}>
                                    {profile?.facebook != "null" ? (
                                        <Link href={profile?.facebook} underline='none' target="_blank" rel="noopener">
                                            {profile?.facebook?.length > 45 ? <Typography variant="caption">{`${profile?.facebook?.substring(0, 44)}...`}</Typography> : <Typography variant="caption">{profile?.facebook}</Typography>}
                                            {/* <Typography variant="caption">{profile?.facebook}</Typography> */}
                                        </Link>
                                    ) 
                                    : 
                                    (<Typography variant="caption">Account not found</Typography>)
                                }
                                </Grid>
                                <Grid item xs={1}>
                                    <FontAwesomeIcon icon={faTwitter} />
                                </Grid>
                                <Grid item xs={11}>
                                {profile?.twitter != "null" ? (
                                    <Link href={profile?.twitter} underline='none' target="_blank" rel="noopener">
                                        {profile?.twitter?.length > 45 ? <Typography variant="caption">{`${profile?.twitter?.substring(0, 44)}...`}</Typography> : <Typography variant="caption">{profile?.twitter}</Typography>}
                                            {/* <Typography variant="caption">{profile?.twitter}</Typography> */}
                                        </Link>
                                    ) 
                                    : 
                                    (<Typography variant="caption">Account not found</Typography>)
                                }
                                </Grid>
                                <Grid item xs={1}>
                                    <FontAwesomeIcon icon={faInstagram} />
                                </Grid>
                                <Grid item xs={11}>
                                {profile?.instagram != "null" ? (
                                    <Link href={profile?.instagram} underline='none' target="_blank" rel="noopener">
                                        {profile?.instagram?.length > 45 ? <Typography variant="caption">{`${profile?.instagram?.substring(0, 44)}...`}</Typography> : <Typography variant="caption">{profile?.instagram}</Typography>}
                                            {/* <Typography variant="caption">{profile?.instagram}</Typography> */}
                                        </Link>
                                    ) 
                                    : 
                                    (<Typography variant="caption">Account not found</Typography>)
                                }
                                </Grid>
                                <Grid item xs={1}>
                                    <FontAwesomeIcon icon={faTiktok} />
                                </Grid>
                                <Grid item xs={11}>
                                {profile?.tiktok != "null" ? (
                                    <Link href={profile?.tiktok} underline='none' target="_blank" rel="noopener">
                                        {profile?.tiktok?.length > 45 ? <Typography variant="caption">{`${profile?.tiktok?.substring(0, 44)}...`}</Typography> : <Typography variant="caption">{profile?.tiktok}</Typography>}
                                            {/* <Typography variant="caption">{profile?.tiktok}</Typography> */}
                                        </Link>
                                    ) 
                                    : 
                                    (<Typography variant="caption">Account not found</Typography>)
                                }
                                </Grid>
                                <Grid item xs={1}>
                                    <FontAwesomeIcon icon={faYoutube} />
                                </Grid>
                                <Grid item xs={11}>
                                {profile?.youtube_channel != "null" ? (
                                        <Link href={profile?.youtube_channel} underline='none' target="_blank" rel="noopener">
                                            {profile?.youtube_channel?.length > 45 ? <Typography variant="caption">{`${profile?.youtube_channel?.substring(0, 44)}...`}</Typography> : <Typography variant="caption">{profile?.youtube_channel}</Typography>}
                                            {/* <Typography variant="caption">{profile?.youtube_channel}</Typography> */}
                                        </Link>
                                    ) 
                                    : 
                                    (<Typography variant="caption">Account not found</Typography>)
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                {currentLoggedInUser ? (<Box>
                                    {is_aFan ?
                                        <Button 
                                            sx={{
                                                background: "linear-gradient(45deg, #FF3366 30%, #FF9933 90%)",
                                                borderRadius: "5px",
                                                border: 0,
                                                color: "white",
                                                transition: "box-shadow 0.3s ease-in-out",
                                            }} 
                                            startIcon={<FavoriteBorderOutlinedIcon/>} 
                                            variant='contained' 
                                            size='small'
                                            fullWidth
                                            onClick={handleLeave}
                                            >Leave the Fanbase</Button>
                                        :
                                        <Button  
                                            sx={{
                                                background: "linear-gradient(45deg, #2900be 30%, #b723d5 90%)",
                                                borderRadius: "5px",
                                                border: 0,
                                                color: "white",
                                                transition: "box-shadow 0.3s ease-in-out",
                                            }} 
                                            startIcon={<FavoriteIcon/>} 
                                            variant='contained' 
                                            size='small'
                                            fullWidth
                                            onClick={handleJoin}
                                            >Join the Fanbase</Button>
                                }
                                </Box>) : (
                                    <Box>
                                        <Button  
                                            sx={{
                                                background: "linear-gradient(45deg, #2900be 30%, #b723d5 90%)",
                                                borderRadius: "5px",
                                                border: 0,
                                                color: "white",
                                                transition: "box-shadow 0.3s ease-in-out",
                                            }} 
                                            startIcon={<FavoriteIcon/>} 
                                            variant='contained' 
                                            size='small'
                                            fullWidth
                                            onClick={() => router.push({ pathname: "/account/login" })}
                                            >Join the Fanbase</Button>
                                    </Box>
                                )}  
                                </Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    </Paper>
  )
}

export default ProfileUserInfo