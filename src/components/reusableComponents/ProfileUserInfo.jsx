// NextJS Imports
import { useRouter } from 'next/router'
import Image from "next/legacy/image";

// MUI Imports
import { Box, Stack, Grid, Paper, Avatar, useMediaQuery, Typography, Link, Divider, Tooltip, colors } from '@mui/material'

// NPM Imports
import { useSelector } from 'react-redux'

// Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons"





const ProfileUserInfo = ({ profile }) => {
    const is_darkMode = useSelector((state) => state.theme.isDarkMode)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')


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