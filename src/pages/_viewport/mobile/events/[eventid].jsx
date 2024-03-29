// React Imports
import { useEffect, useState } from "react";

// Nextjs Imports
import Head from "next/head"
import Image from "next/legacy/image";
import { useRouter } from "next/router";

//MUI Imports
import { Avatar, Box, Button, colors, Container, Divider, Grid, Link, Paper, Skeleton, Stack, Typography, 
    useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// TanStack/React-Query
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
import FavoriteIcon from '@mui/icons-material/Favorite';
import OutlinedFlagTwoToneIcon from '@mui/icons-material/OutlinedFlagTwoTone';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

// Project Imports
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'
import UpsellEventsCarousel from '@/components/reusableComponents/UpsellEventsCarousel'
import Copyright from '@/components/reusableComponents/Copyright'
import { addEventView, checkFanbase, getCurrentEvent, getCurrentVideoUserProfile, getUpsellEvents, joinFanbase, leaveFanbase } from "@/axios/axios";
import { pageHasChanged } from "@/redux/features/navigation/navigationSlice";
import { countriesChoices } from "@/data/countries"


const MobileEventPage = ({ setIsDarkMode, isDarkMode }) => {
    const currentLoggedInUser = useSelector((state) => state.auth.userInfo)
    const accessToken = useSelector((state) => state.auth.token)
    const isRegularPageView = useSelector((state) => state.navigation.isRegularView)
    const referralURL = useSelector((state) => state.navigation.referralURL)
    const is_darkMode = useSelector((state) => state.theme.isDarkMode)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const theme = useTheme()
    const dispatch = useDispatch()
    const router = useRouter()
    const { eventid, a, UserCountry, UserIP } = router.query

    const [is_aFan, setIs_aFan] = useState(false)
    const [fanbase_count, setFanbase_count] = useState(0)
    const [userFanObject, setUserFanObject] = useState(null)

    const [user_country, setUser_country] = useState(null)
    const [user_ip, setUser_ip] = useState(null)
    const [referrer_url, setReferrer_url] = useState(null)
    const [country_name, setCountry_name] = useState({})




    useEffect(() => {
        if (referralURL?.split(".")?.includes("dukaflani") || isRegularPageView === true ) {
            setUser_country(UserCountry)
            setUser_ip(UserIP)
            setReferrer_url(null)  
        } else {
            setUser_country(UserCountry)
            setUser_ip(UserIP)
            setReferrer_url(referralURL)
        }
      }, [referralURL, UserCountry, UserIP, isRegularPageView])


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
        onSuccess: (data, _variables, _context) => {
            setFanbase_count(data?.fanbase_count)
        },
        enabled: !!publisherUserID
    })

    const { data: upsellEvents } = useQuery(["upsell-events", publisherUserID], (publisherUserID) => getUpsellEvents(publisherUserID), {
        enabled: !!publisherUserID
    })

    const videoProfileID = {
        profileId: profile?.id,
        userId: currentLoggedInUser?.id
    }
    
    const { data: fanbase } = useQuery(["retrieve-fanbase-object", videoProfileID], (videoProfileID) => checkFanbase(videoProfileID), {
        onSuccess: (data, _variables, _context) => {
            setUserFanObject(data)
        },
        enabled: !!currentLoggedInUser?.id && !!profile?.id
    })
            
    const time = event?.time
    const timeArray = time?.split(":").map(Number);
    const hours = event?.time ? timeArray[0] : null
    const minutes = event?.time ? timeArray[1] : null



    useEffect(() => {
        if (event?.country?.length > 0) {
          setCountry_name(countriesChoices?.filter((country) => country.code === event?.country))
        }
      }, [event?.country])





    const newEventView = {
        event: event?.id,
        event_profile: event?.customuserprofile,
        ip_address: user_ip,
        country: user_country,
        referral_url: referrer_url,
    }
    
    const { mutate: addNewReferredEventView } = useMutation(addEventView, {
        onSuccess: (data, _variables, _context) => {
        //   console.log("event view success:", data)
        },
        onError: (error, _variables, _context) => {
        //   console.log("event view error:", error)
        },
      })

    const handleReferredView = () => {
        addNewReferredEventView(newEventView)
    }


    useEffect(() => {
        const addMyReferralView = () => {
            if (referrer_url?.length > 1 && event?.id >= 1 && event?.customuserprofile >= 1 && user_ip?.length > 1 && user_country?.length > 1) {
                handleReferredView()
            }
        };
        addMyReferralView();
        }, [referrer_url, event?.id, event?.customuserprofile, user_ip, user_country])


    // const rawFanBaseCount = profile?.fanbase_count ? profile?.fanbase_count : 0
   let formatedFanBaseCount = ''
   fanbase_count < 1000 || fanbase_count % 10 === 0 || fanbase_count === 0 ? formatedFanBaseCount = numeral(fanbase_count).format('0a') :  formatedFanBaseCount = numeral(fanbase_count).format('0.0a')


   // Fanbase Fns

   const { mutate: addNewFan } = useMutation(joinFanbase, { 
    onSuccess: (data, _variables, _context) => {
      queryClient.invalidateQueries(["current-video-profile", publisherUserID])
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
        queryClient.invalidateQueries(["current-video-profile", publisherUserID])
        setIs_aFan(false)
    }
})



useEffect(() => {
    setFanbase_count(profile?.fanbase_count)
}, [profile?.fanbase_count])

useEffect(() => {
    if (fanbase?.id > 0) {
        setIs_aFan(true)
    } else {
        setIs_aFan(false)
    }
}, [fanbase?.id, eventid])

const newFanDetails = {
    accessToken,
    customuserprofile: profile?.id,
}

const handleJoin = () => {
    addNewFan(newFanDetails)
    setIs_aFan(true)
    setFanbase_count(prevCount => prevCount + 1)
}


const userFanDetails = {
    accessToken,
    id: userFanObject?.id,
}

const handleLeave = () => {
    removeFan(userFanDetails)
    setIs_aFan(false)
    setFanbase_count(prevCount => prevCount - 1)
}


  return (
    <MobileNavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} >
        <Head>
            <title>{`Discover ${event?.title} by ${event?.event_organizer} happening at the ${event?.venue} | Dukaflani Events`}</title>
            <meta name="title" content={`Discover ${event?.title} by ${event?.event_organizer} happening at the ${event?.venue} | Dukaflani Events`} />
            <meta name="description" content="Discover events from the biggest event organisers in Africa"/>
            <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>
        </Head>
        <Paper sx={{ minHeight: '100vh', paddingY: 5}}>
            <Container maxWidth='lg'>
                <Box>
                    <Grid container sx={{paddingTop: 5}} rowSpacing={3}>
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
                                                    {/* <Box sx={{width: '100%', paddingBottom: 2}}>
                                                        <Button  fullWidth  variant="contained" size='small'>Buy Tickets</Button>
                                                    </Box> */}
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
                                                            }} spacing={0.5} direction='row'>
                                                            {!loadingProfile ? (<Typography variant='subtitle2'>{profile?.stage_name}</Typography>) : (<Typography variant='subtitle2'>Loading profile...</Typography>)}
                                                            {profile?.is_verified == 'True' && <CheckCircleIcon sx={{ fontSize: 15, color: colors.grey[100]}} />}                   
                                                        </Stack>
                                                        {!loadingProfile ? (<Typography variant='caption'>{profile?.role}</Typography>) : (<Skeleton width="40%" />)}
                                                    </Stack>
                                                </Box>
                                                </Stack>
                                                <Box sx={{width: '100%', paddingTop: 1}}>
                                                    {/* <Button disabled startIcon={<FavoriteBorderOutlinedIcon />} fullWidth variant="contained" size='small'>Join Fanbase</Button> */}
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
                                                                >Leave The Fanbase</Button>
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
                                                                >Join The Fanbase</Button>
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
                                                                >Join The Fanbase</Button>
                                                        </Box>
                                                    )}  
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
                                                <Stack direction='row' spacing={1}>
                                                    <LocationOnOutlinedIcon />
                                                    {!loadingEvent ? (<Typography variant='body2'>{event?.venue}</Typography>) : (<Skeleton width="10%" />)}
                                                </Stack>
                                                <Stack direction='row' spacing={1}>
                                                    <OutlinedFlagTwoToneIcon />
                                                    {!loadingEvent ? (<Typography variant='body2'>{event?.location}</Typography>) : (<Skeleton width="10%" />)}
                                                </Stack>
                                                <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                                    <PublicOutlinedIcon fontSize="small" />
                                                    {!loadingEvent ? (<Typography variant='body2'>{`${event?.city}, ${country_name[0]?.label}`}</Typography>) : (<Skeleton width="10%" />)}
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
        <Container sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99}} maxWidth='lg'>
        <Link href={event?.ticket_link} underline='none' target="_blank" rel="noopener">
            <Paper elevation={0} square sx={{width: '100%', paddingBottom: 2}}>
                <Button disabled={!event?.ticket_link} startIcon={<LocalActivityOutlinedIcon />}  fullWidth  variant="contained" size='medium'>Buy Tickets</Button>
            </Paper>
        </Link>
        </Container>
    </MobileNavigationLayout>
  )
}

export default MobileEventPage