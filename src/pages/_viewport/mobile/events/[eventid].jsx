// Nextjs Imports
import Head from "next/head"
import Image from "next/legacy/image";

//MUI Imports
import { Avatar, Box, Button, colors, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// Icons
import { ScheduleOutlined } from "@ant-design/icons";
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import OutlinedFlagTwoToneIcon from '@mui/icons-material/OutlinedFlagTwoTone';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';


// Components
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'
import UpsellEventsCarousel from '@/components/reusableComponents/UpsellEventsCarousel'
import Copyright from '@/components/reusableComponents/Copyright'

// Project Imports
import poster1 from '../../../../../public/assets/pictures/event1.jpg'


const MobileEventPage = ({ setIsDarkMode, isDarkMode }) => {
    const theme = useTheme()


  return (
    <MobileNavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} >
        <Head>
          <title>Event title | Khaligraph Jones</title>
          <meta name="description" content="Watch 'Kwame' by Khaligraph Jones on
           Dukaflani to get the Lyrics, Streaming Links, Products and Merchandise, Skiza Tunes, The Album, Events and Tour Dates " />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box sx={{backgroundColor: theme.myColors.myBackground, minHeight: '100vh', paddingY: 5}}>
            <Container maxWidth='lg'>
                <Box>
                    <Grid container sx={{paddingTop: 5}} rowSpacing={3}>
                        <Grid item xs={12}>
                            <Paper square sx={{padding: 2}}>
                                <Grid container columnSpacing={3}>
                                    <Grid item xs={12} md={4}>
                                    <Box sx={{position: 'relative', borderRadius: 2,}}>
                                        <Image 
                                            src={poster1} 
                                            layout='responsive'
                                            alt='product title'
                                            style={{borderRadius: 6}}
                                        />
                                    </Box>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Grid container columnSpacing={4}>
                                            <Grid item xs={12} md={7}>
                                                <Stack spacing={2}>
                                                    <Stack spacing={1}>
                                                        <Typography variant="h6" component='h1'>Event Title goes here</Typography>
                                                        <Typography variant="caption">Event By: Safaricom Live</Typography>
                                                    </Stack>
                                                    <Divider/>
                                                    <Box sx={{backgroundColor: '#f48e21', borderRadius: 2}}>
                                                        <Stack sx={{padding: 1}}>
                                                            <Stack direction='row' spacing={1}>
                                                                <CategoryOutlinedIcon sx={{color: 'white', fontSize: 20}} />
                                                                <Typography sx={{color: 'white'}} variant="subtitle2">Concert Event</Typography>
                                                            </Stack>
                                                        </Stack>
                                                        <Stack sx={{padding: 0.2}}>
                                                            <Paper sx={{padding: 2, borderBottomLeftRadius: 6, borderBottomRightRadius: 6}} elevation={0} square>
                                                                <Stack>
                                                                    <Box sx={{paddingBottom: 0.5}}>
                                                                        <Typography sx={{backgroundColor: colors.blue[50], padding: 0.5, color: colors.blue[500]}} variant="caption">Ticket Prices From</Typography>
                                                                    </Box>
                                                                    <Typography variant="h4">ksh.1,500</Typography>
                                                                    <Box>
                                                                        <Typography sx={{backgroundColor: colors.green[50], padding: 0.5, color: colors.green[500]}} variant="caption">ticketsasa.com</Typography>
                                                                    </Box>
                                                                    {/* <Box sx={{paddingTop: 1}}>
                                                                        <Stack direction='row' spacing={0.5}>
                                                                            <ClockCircleOutlined />
                                                                            <Typography variant="caption">18:00hrs!</Typography>
                                                                        </Stack>
                                                                    </Box> */}
                                                                </Stack>
                                                            </Paper>
                                                        </Stack>
                                                    </Box>
                                                    {/* <Box sx={{width: '100%', paddingBottom: 2}}>
                                                        <Button  fullWidth  variant="contained" size='small'>Buy Tickets</Button>
                                                    </Box> */}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <Typography variant="subtitle1" gutterBottom>Promoted By:</Typography>
                                                <Stack direction='row' spacing={1}>
                                                <Box>
                                                    <Avatar  src='/assets/pictures/wakadinali_profile.jpg' />
                                                </Box>
                                                <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'start', justifyContent: 'start'}}>
                                                    <Stack spacing={-0.5}>
                                                        <Stack spacing={0.5} direction='row'>
                                                            <Typography variant='subtitle2'>Wakadinali</Typography>
                                                            {true && <CheckCircleIcon sx={{ fontSize: 15, color: theme.myColors.textDark }} />}                   
                                                        </Stack>
                                                        <Typography variant='caption'>Artist</Typography>
                                                    </Stack>
                                                </Box>
                                                </Stack>
                                                <Box sx={{width: '100%', paddingTop: 1}}>
                                                    <Button startIcon={<FavoriteBorderOutlinedIcon />} fullWidth variant="contained" size='small'>Join Fanbase</Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper square>
                                <Stack>
                                    <Box sx={{padding: 1.5}}>
                                        <Typography variant="h6">Event Details</Typography>
                                    </Box>
                                    <Divider/>
                                    <Box sx={{padding: 1.5}}>
                                        <Stack spacing={1}>
                                            <Stack spacing={1}>
                                                <Stack direction='row' spacing={1}>
                                                    <LocationOnOutlinedIcon />
                                                    <Typography variant='body2'>The English Piont Marina</Typography>
                                                </Stack>
                                                <Stack direction='row' spacing={1}>
                                                    <OutlinedFlagTwoToneIcon />
                                                    <Typography variant='body2'>Diani, Kenya</Typography>
                                                </Stack>
                                                <Stack direction='row' spacing={1}>
                                                    <EventOutlinedIcon />
                                                    <Typography variant='body2'>Fri 03 March 2023</Typography>
                                                </Stack>
                                                <Stack direction='row' spacing={1}>
                                                    <ScheduleOutlinedIcon />
                                                    <Typography variant='body2'>18:00hrs</Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack>
                                                <Typography variant="subtitle2">Description</Typography>
                                                <Typography variant="body1">Event details goes here</Typography>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                           {/* Upsell Events */}
                            <Box>
                                <UpsellEventsCarousel
                                title="Wakadinali Tour Dates"
                                color1="#f48e21"
                                color2="#2900be"
                                icon={<ScheduleOutlined style={{fontSize: 25, color: '#ffffff'}} />}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                {/* Copyright */}
                <Box>
                    <Copyright/>
                </Box>
            </Container>
        </Box>
        <Container sx={{backgroundColor: theme.myColors.myBackground, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99}} maxWidth='lg'>
            <Box sx={{width: '100%', paddingBottom: 2}}>
                <Button startIcon={<LocalActivityOutlinedIcon />}  fullWidth  variant="contained" size='medium'>Buy Tickets</Button>
            </Box>
        </Container>
    </MobileNavigationLayout>
  )
}

export default MobileEventPage