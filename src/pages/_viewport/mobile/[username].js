// React Imports
import { useState } from 'react'

// NextJS Imports
import { useRouter } from 'next/router'
import Head from 'next/head'

// MUI Imports
import { Stack, Container, Paper, Grid, Typography, CircularProgress, Dialog, DialogActions, 
    DialogContent, DialogTitle, Box, Button } from '@mui/material'
import MobileProfileUserInfo from '@/components/reusableComponents/MobileProfileUserInfo'

// NPM Imports
import numeral from 'numeral';

// Tanstack Query
import { useQuery } from '@tanstack/react-query'

// Project Imports
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'
import MobileProfileUserTabs from '@/components/reusableComponents/MobileProfileUserTabs'
import MobileProfileUserItemsTabs from '@/components/reusableComponents/MobileProfileUserItemsTabs'
import { profilePage } from '@/axios/axios'

const UserProfile = ({ setIsDarkMode, isDarkMode, }) => {
    const router = useRouter()
    const { username } = router.query
    const [loadingProfileDialog, setLoadingProfileDialog] = useState(true)
    const [showProfile, setShowProfile] = useState(false)

    const profileUsername = username
    const { data: profile, isLoading: loadingProfile } = useQuery(["profile-page-details", profileUsername], (profileUsername) => profilePage(profileUsername), {
        enabled: !! profileUsername,
        onSuccess : (_data, _variables, _context) => {
            setLoadingProfileDialog(false)
            setShowProfile(true)
        }
    })
            

  return (
    <>
        <MobileNavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} >
            <Head>
                    <title>{profileUsername ? `@${profileUsername} - Dukaflani Profile` : 'Loading profile...'}</title>
                    <meta name="title" content={`${profileUsername} profile on Dukaflani`} />
                    <meta name="description" content="Buy products from the biggest celebrities and name brands in Africa"/>
                    <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>

                    
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/${profileUsername}`} />
                    <meta property="og:title" content={`${profileUsername} profile on Dukaflani`} />
                    <meta property="og:description" content="Buy products from the biggest celebrities and name brands in Africa"/>
                    <meta 
                        property="og:image" 
                        // content={`${process.env.NEXT_PUBLIC_NEXT_URL}/api/og?stage_name=${data?.stage_name}&fanbase_count=${videoProfile?.fanbase_count}&song_title=${data?.song_title}&video_title=${data?.title}&avatar=${data?.profile_avatar}`} />
                        content={profile?.profile_avatar} 
                        />

                    
                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/${username}`} />
                    <meta property="twitter:title" content={`${username} profile on Dukaflani`} />
                    <meta property="twitter:description" content="Buy products from the biggest celebrities and name brands in Africa"/>
                    <meta 
                        property="twitter:image" 
                        // content={`${process.env.NEXT_PUBLIC_NEXT_URL}/api/og?stage_name=${data?.stage_name}&fanbase_count=${videoProfile?.fanbase_count}&song_title=${data?.song_title}&video_title=${data?.title}&avatar=${data?.profile_avatar}`} />
                        content={profile?.profile_avatar} 
                        />
            </Head>
            <Paper sx={{ minHeight: '100vh', paddingY: 10}}>
                    {showProfile && <Container maxWidth="md">
                        <Stack spacing={1}>
                            <MobileProfileUserInfo profile={profile} />
                            <Grid container>
                                <Grid item xs={12} sm={4} sx={{paddingBottom: 2}}>
                                    <MobileProfileUserTabs profile={profile} />
                                </Grid>
                                <Grid item xs={12} sm={8} sx={{paddingLeft: {sm: 1.5}}}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6} sm={4} md={3}>
                                            <Paper variant='outlined' sx={{padding: 0.5}}>
                                                <Stack>
                                                    <Typography variant='subtitle2'>Videos</Typography>
                                                    <Typography variant='caption'>{numeral(profile?.video_count).format('0,0')}</Typography>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6} sm={4} md={3}>
                                            <Paper variant='outlined' sx={{padding: 0.5}}>
                                                <Stack>
                                                    <Typography variant='subtitle2'>Products</Typography>
                                                    <Typography variant='caption'>{numeral(profile?.product_count).format('0,0')}</Typography>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6} sm={4} md={3}>
                                            <Paper variant='outlined' sx={{padding: 0.5}}>
                                                <Stack>
                                                    <Typography variant='subtitle2'>Events</Typography>
                                                    <Typography variant='caption'>{numeral(profile?.events_count).format('0,0')}</Typography>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6} sm={4} md={3}>
                                            <Paper variant='outlined' sx={{padding: 0.5}}>
                                                <Stack>
                                                    <Typography variant='subtitle2'>Media Tours</Typography>
                                                    <Typography variant='caption'>{numeral(profile?.media_tours_count).format('0,0')}</Typography>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                    <MobileProfileUserItemsTabs profile={profile} />
                                </Grid>
                            </Grid>
                        </Stack>
                        
                    </Container>}
            </Paper>

            {/* Loading Profile Information Dialogue */}
        <Dialog
            open={loadingProfileDialog}
            onClose={() => setLoadingProfileDialog(false)} 
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Loading profile..."}
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', justifyContent: "center", alignItems: "center", padding: 2}}>
                    <CircularProgress />
                </Box>
            </DialogContent>
            <DialogActions>
            <Button color="error" onClick={() => setLoadingProfileDialog(false)}>Close</Button>
            </DialogActions>
        </Dialog>
        </MobileNavigationLayout>
    </>
  )
}

export default UserProfile