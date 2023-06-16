// Nextjs Imports
import Head from "next/head"
import Image from "next/legacy/image";
import { useRouter } from "next/router";

//MUI Imports
import { Avatar, Box, Button, colors, Container, Divider, Grid, Link, Paper, Skeleton, 
    Stack, Typography, useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// TanStack/React-Query
import { useQuery, useQueryClient } from '@tanstack/react-query';

// NPM Imports
import numeral from 'numeral';
import { useDispatch, useSelector } from "react-redux";

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
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

// Project Imports
import NavigationLayout2 from '@/layout/desktop/NavigationLayout2'
import UpsellEventsCarousel from '@/components/reusableComponents/UpsellEventsCarousel'
import Copyright from '@/components/reusableComponents/Copyright'
import { getCurrentEvent, getCurrentVideoUserProfile, getUpsellEvents } from "@/axios/axios";
import { pageHasChanged } from "@/redux/features/navigation/navigationSlice";



const EventPage = ({ setIsDarkMode, isDarkMode }) => {
    const is_darkMode = useSelector((state) => state.theme.isDarkMode)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const theme = useTheme()
    const router = useRouter()
    const dispatch = useDispatch()
    const { eventid } = router.query
    const { a } = router.query


    const queryClient = useQueryClient()
    const { data: event, isLoading: loadingEvent } = useQuery(["current-event", eventid], (eventid) => getCurrentEvent(eventid), {
        initialData: () => {
            const eventCache = queryClient.getQueryData(["current-video-events",Number(a)])?.find(event => event?.id == eventid)
            if(eventCache) {
                    return eventCache
                } else {
                        return undefined
                    }
                },
                enabled: !!eventid
            })

    const publisherUserID = event?.user 
    const { data: profile, isLoading: loadingProfile } = useQuery(["current-video-profile", publisherUserID], (publisherUserID) => getCurrentVideoUserProfile(publisherUserID), {
        enabled: !!publisherUserID
    })

    const { data: upsellEvents } = useQuery(["upsell-events", publisherUserID], (publisherUserID) => getUpsellEvents(publisherUserID), {
        enabled: !!publisherUserID
    })
            
    const time = event?.time
    const timeArray = time?.split(":").map(Number);
    const hours = event?.time ? timeArray[0] : null
    const minutes = event?.time ? timeArray[1] : null
    


  return (
    <NavigationLayout2 setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} >
        <Head>
            <title>{`Discover ${event?.title} by ${event?.event_organizer} happening at the ${event?.venue} | Dukaflani Events`}</title>
            <meta name="title" content={`Discover ${event?.title} by ${event?.event_organizer} happening at the ${event?.venue} | Dukaflani Events`} />
            <meta name="description" content="Discover events from the biggest event organisers in Africa"/>
            <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>

            
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/events/${event?.id}?a=${event?.user}`} />
            <meta property="og:title" content={`Discover ${event?.title} by ${event?.event_organizer} happening at the ${event?.venue} | Dukaflani Events`} />
            <meta property="og:description" content="Discover events from the biggest event organisers in Africa"/>
            <meta 
                property="og:image" 
                // content={`${process.env.NEXT_PUBLIC_NEXT_URL}/api/og?stage_name=${data?.stage_name}&fanbase_count=${videoProfile?.fanbase_count}&song_title=${data?.song_title}&video_title=${data?.title}&avatar=${data?.profile_avatar}`} />
                content={event?.poster} 
                />

            
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/events/${event?.id}?a=${event?.user}`} />
            <meta property="twitter:title" content={`Discover ${event?.title} by ${event?.event_organizer} happening at the ${event?.venue} | Dukaflani Events`} />
            <meta property="twitter:description" content="Discover events from the biggest event organisers in Africa"/>
            <meta 
                property="twitter:image" 
                // content={`${process.env.NEXT_PUBLIC_NEXT_URL}/api/og?stage_name=${data?.stage_name}&fanbase_count=${videoProfile?.fanbase_count}&song_title=${data?.song_title}&video_title=${data?.title}&avatar=${data?.profile_avatar}`} />
                content={event?.poster} 
                />
      </Head>
        <Paper sx={{ minHeight: '100vh', paddingTop: 5}}>
            <Container maxWidth='lg'>
                <Box>
                    <Grid container sx={{padding: 5}} rowSpacing={3}>
                        <Grid item xs={12}>
                            <Paper variant="outlined" square sx={{padding: 2}}>
                                <Grid container columnSpacing={3}>
                                    <Grid item xs={12} md={4}>
                                        {!loadingEvent ? (<Box sx={{position: 'relative', borderRadius: 2, background: colors.grey[100]}}>
                                            <Image 
                                                src={event?.poster} 
                                                layout='responsive'
                                                alt={event?.title}
                                                height='100%'
                                                width='100%'
                                                style={{borderRadius: 6}}
                                            />
                                        </Box>) : (<Skeleton animation="wave"  variant="rectangular" sx={{ paddingTop: '100%', width: '100%', borderRadius: 2}} />)}
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Grid container columnSpacing={4}>
                                            <Grid item xs={12} md={7}>
                                                <Stack spacing={2}>
                                                    <Stack spacing={1}>
                                                        {!loadingEvent ? (<Typography variant="h6" component='h1'>{event?.title}</Typography>) : (<Skeleton width="70%" />)}
                                                        {!loadingEvent ? (<Typography variant="caption">{`Event By: ${event?.event_organizer}`}</Typography>) : (<Skeleton width="40%" />)}
                                                    </Stack>
                                                    <Divider/>
                                                    <Box sx={{backgroundColor: '#f48e21', borderRadius: 2}}>
                                                        <Stack sx={{padding: 1}}>
                                                            <Stack direction='row' spacing={1}>
                                                                <CategoryOutlinedIcon sx={{color: 'white', fontSize: 20}} />
                                                                {!loadingEvent ? (<Typography sx={{color: 'white'}} variant="subtitle2">{event?.event_category}</Typography>) : (<Skeleton width="30%" />)}
                                                            </Stack>
                                                        </Stack>
                                                        <Stack sx={{padding: 0.2}}>
                                                            <Paper sx={{padding: 2, borderBottomLeftRadius: 6, borderBottomRightRadius: 6}} elevation={0} square>
                                                                <Stack>
                                                                    <Box sx={{paddingBottom: 0.5}}>
                                                                        {!loadingEvent ? (<Typography sx={{backgroundColor: colors.blue[50], padding: 0.5, color: colors.blue[500]}} variant="caption">{event?.event_ticket_info}</Typography>) : (<Skeleton width="30%" />)}
                                                                    </Box>
                                                                        {!loadingEvent ? (<Typography variant="h4">{`${event?.local_currency}${numeral(event?.local_price).format('0,0')}`}</Typography>) : (<Skeleton width="50%" sx={{paddingTop: 4}} />)}
                                                                    <Box>
                                                                        {!loadingEvent ? (<Typography sx={{backgroundColor: colors.green[50], padding: 0.5, color: colors.green[500]}} variant="caption">{`${event?.ticket_platform}`}</Typography>) : (<Skeleton width="40%" />)}
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
                                                    <Link href={event?.ticket_link} underline='none' target="_blank" rel="noopener">
                                                        <Box sx={{width: '100%', paddingBottom: 2}}>
                                                            <Button disabled={!event?.ticket_link} startIcon={<LocalActivityOutlinedIcon/>}  fullWidth  variant="contained" size='small'>Buy Tickets</Button>
                                                        </Box>
                                                    </Link>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {event?.is_sponsored ? (<Typography variant="subtitle1" gutterBottom>Sponsored By:</Typography>) : (<Typography variant="subtitle1" gutterBottom>Promoted By:</Typography>)}
                                                <Stack direction='row' spacing={1}>
                                                <Box onClick={() => {
                                                    dispatch(pageHasChanged(true))
                                                    router.push({ pathname: `/${profile?.username}` })
                                                    }}>
                                                    <Avatar  src={profile?.profile_avatar} />
                                                </Box>
                                                <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'start', justifyContent: 'start'}}>
                                                    <Stack spacing={-0.5}>
                                                        <Stack onClick={() => {
                                                             dispatch(pageHasChanged(true))
                                                            router.push({ pathname: `/${profile?.username}` })
                                                            }} sx={{cursor: 'pointer'}} spacing={0.5} direction='row'>
                                                            {!loadingProfile ? (<Typography variant='subtitle2'>{profile?.stage_name}</Typography>) : (<Typography variant='subtitle2'>Loading profile...</Typography>)}
                                                            {profile?.is_verified == 'True' && <CheckCircleIcon sx={is_darkMode === "dark" || prefersDarkMode === true ? { fontSize: 15, color: colors.grey[100] } : is_darkMode === "light" && prefersDarkMode === true ?  { fontSize: 15, color: colors.grey[800] } : { fontSize: 15, color: colors.grey[800] }} />}  
                                                        </Stack>
                                                        {!loadingProfile ? (<Typography variant='caption'>{profile?.role}</Typography>) : (<Skeleton width="40%" />)}
                                                    </Stack>
                                                </Box>
                                                </Stack>
                                                <Box sx={{width: '100%', paddingTop: 1}}>
                                                    <Button disabled startIcon={<FavoriteBorderOutlinedIcon />} fullWidth variant="contained" size='small'>Join Fanbase</Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper variant="outlined" square>
                                <Stack>
                                    <Box sx={{padding: 1.5}}>
                                        <Typography variant="h6">Event Details</Typography>
                                    </Box>
                                    <Divider/>
                                    <Box sx={{padding: 1.5}}>
                                        <Stack spacing={1}>
                                            <Stack spacing={1}>
                                                <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                                    <LocationOnOutlinedIcon fontSize="small" />
                                                    {!loadingEvent ? (<Typography variant='body2'>{event?.venue}</Typography>) : (<Skeleton width="10%" />)}
                                                </Stack>
                                                <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                                    <OutlinedFlagTwoToneIcon fontSize="small" />
                                                    {!loadingEvent ? (<Typography variant='body2'>{event?.location}</Typography>) : (<Skeleton width="10%" />)}
                                                </Stack>
                                                <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                                    <PublicOutlinedIcon fontSize="small" />
                                                    {!loadingEvent ? (<Typography variant='body2'>{`${event?.city}, ${event?.country}`}</Typography>) : (<Skeleton width="10%" />)}
                                                </Stack>
                                                <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                                    <EventOutlinedIcon fontSize="small" />
                                                    {!loadingEvent ? (<Typography variant='body2'>{new Date(event?.date).toDateString()}</Typography>) : (<Skeleton width="10%" />)}
                                                </Stack>
                                                <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                                    <ScheduleOutlinedIcon fontSize="small" />
                                                    {!loadingEvent ? (<Typography variant='body2'>{`${hours}:${minutes?.toString().padStart(2, '0')}hrs`}</Typography>) : (<Skeleton width="10%" />)}
                                                </Stack>
                                            </Stack>
                                            <Stack>
                                                <Typography variant="subtitle2">Description</Typography>
                                                {!loadingEvent ? (<Typography variant="body1">{event?.description}</Typography>) : (<Skeleton width="80%" />)}
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
                                    promoter={profile?.stage_name}
                                    upsellEvents={upsellEvents}
                                    publisherUserID={publisherUserID}
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
        </Paper>

    </NavigationLayout2>
  )
}

export default EventPage