// React Imports
import { useEffect, useState } from 'react';

// NextJs Imports
import { useRouter } from 'next/router'
import Image from "next/legacy/image";

// MUI Imports
import { Box, Button, Card, CardActionArea, CardContent, Stack, Typography, colors, Grid, useMediaQuery } from '@mui/material'

// NPM Imports
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';

// Icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

// Project imports
import { months } from '@/data/months';
import { pageHasChanged, setRegularPageView } from '@/redux/features/navigation/navigationSlice';
import { addEventView } from '@/axios/axios';



const ProfilePageEventCard = ({ event }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const userCountry = useSelector((state) => state.auth.country)
  const userIpAddress = useSelector((state) => state.auth.ip_address)
  const is_darkMode = useSelector((state) => state.theme.isDarkMode)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [user_country, setUser_country] = useState(null)
  const [user_ip, setUser_ip] = useState(null)


  useEffect(() => {
    setUser_country(userCountry)
    setUser_ip(userIpAddress)
}, [userCountry, userIpAddress])

  const date = event?.date
  const time = event?.time
  const dateArray = date?.split("-").map(Number);
  const timeArray = time?.split(":").map(Number);
  const year = event?.date ? dateArray[0] : null
  const month = event?.date ? dateArray[1] : null
  const monthWithoutLeadingZero = parseInt(month,10)
  const monthFormatted =  months[monthWithoutLeadingZero - 1]
  const day = event?.date ? dateArray[2] : null
  const hours = event?.time ? timeArray[0] : null
  const minutes = event?.time ? timeArray[1] : null

  const newEventView = {
    event: event?.id,
    event_profile: event?.customuserprofile,
    ip_address: user_ip,
    country: user_country,
    referral_url: "https://dukaflani.com",
}

const { mutate: addNewEventView } = useMutation(addEventView, {
    onSuccess: (data, _variables, _context) => {
    //   console.log("event view success:", data)
    },
    onError: (error, _variables, _context) => {
    //   console.log("event view error:", error)
    },
  })


  
  
  const handleEventClick = () => {
    dispatch(pageHasChanged(true))
    dispatch(setRegularPageView())
    router.push({ pathname: `/events/${event?.id}`, query: {a: event?.user} })
    addNewEventView(newEventView)
  }




  return (
    <Box sx={event?.id == 1 ? {display: "none"} : {paddingTop: 2}}>
      <Stack>
        <Card variant='outlined' onClick={handleEventClick} square>
            <CardActionArea>
                <Box 
                    sx={{ backgroundColor: is_darkMode === "dark" || prefersDarkMode === true ? colors.grey[800] : is_darkMode === "light" && prefersDarkMode === true ?  colors.grey[200] : colors.grey[200], width: '100%', position: "relative", cursor:'pointer'}}
                    >
                    <Image 
                        src={event?.poster}
                        layout='responsive'
                        alt={event?.title}
                        width='100%'
                        height={100}
                        />
                </Box>
                <Box sx={{padding: 1, backgroundColor: colors.grey[800]}}>
                  <Typography className="line-clamp-1 line-clamp"  sx={{color: 'whitesmoke'}} variant='caption'>{event?.event_category?.toUpperCase()}</Typography>
                </Box>
                <CardContent>
                    <Stack spacing={1}>
                        <Stack spacing={0.4}>
                        <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                            <LocationOnOutlinedIcon fontSize='small' />
                            <Typography className="line-clamp-1 line-clamp" variant='caption'>{event?.venue}</Typography>
                        </Stack>
                        <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                            <FlagOutlinedIcon fontSize='small' />
                            <Typography className="line-clamp-1 line-clamp" variant='caption'>{event?.location}</Typography>
                        </Stack>
                        <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                            <PublicOutlinedIcon fontSize='small' />
                            <Typography className="line-clamp-1 line-clamp" variant='caption'>{`${event?.city}, ${event?.country}`}</Typography>
                        </Stack>
                        </Stack>
                        <Typography className="line-clamp-2 line-clamp" variant='subtitle2'>{event?.title}</Typography>
                        <Box sx={{border: '1px solid lightgrey', paddingTop: 1}}>
                        <Stack sx={{textAlign: 'center'}}>
                            <Typography className="line-clamp-1 line-clamp" variant='subtitle2'>{`${day} ${monthFormatted?.toUpperCase()} ${year}`}</Typography>
                            <Typography variant='caption'>{`${hours}:${minutes?.toString().padStart(2, '0')}hrs`}</Typography>
                        </Stack>
                        </Box>
                        <Box sx={{width: '100%', paddingTop: 1}}>
                            <Button startIcon={<LocalActivityOutlinedIcon/>} fullWidth variant='contained' size="small" >Event Details</Button>
                        </Box>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
      </Stack>
    </Box>
  )
}


const ProfilePageEvents = ({ events, loadingEvents }) => {
  return (
    <>
      {loadingEvents && <div>Loading events...</div>}
      <Grid container spacing={2}>
        {events?.map((event, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <ProfilePageEventCard  event={event}  />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ProfilePageEvents