// React Imports
import { useEffect, useState } from 'react';

// Next Image
import Image from "next/legacy/image";
import { useRouter } from 'next/router'

// MUI Imports
import { Box, Typography, Grid, Paper, Stack, Button, Skeleton, colors } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// React Slick Carousel
import Slider from "react-slick";

// TanStack/React-Query
import { useMutation, useQuery } from '@tanstack/react-query';

// NPM Imports
import { useDispatch, useSelector } from "react-redux";

// Project Imports
import { getEventByCategory, addEventView, getSponsoredEvents } from "@/axios/axios";
import EventsCarousel from '@/components/reusableComponents/EventsCarousel'
import Copyright from "../reusableComponents/Copyright";
import { pageHasChanged, setRegularPageView } from "@/redux/features/navigation/navigationSlice";
import { countriesChoices } from "@/data/countries"

// Icons
import { FireOutlined } from '@ant-design/icons';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import OutlinedFlagTwoToneIcon from '@mui/icons-material/OutlinedFlagTwoTone';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';



const EventsComponent = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const userCountry = useSelector((state) => state.auth.country)
  const userIpAddress = useSelector((state) => state.auth.ip_address)
  const [user_country, setUser_country] = useState(null)
  const [user_ip, setUser_ip] = useState(null)
  const [country_name, setCountry_name] = useState({})


  useEffect(() => {
    setUser_country(userCountry)
    setUser_ip(userIpAddress)
}, [userCountry, userIpAddress])

useEffect(() => {
  if (userCountry?.length > 1) {
    setCountry_name(countriesChoices?.filter((country) => country.code === userCountry))
  }
}, [userCountry])



const { mutate: addNewEventView } = useMutation(addEventView, {
  onSuccess: (data, _variables, _context) => {
  //   console.log("event view success:", data)
  },
  onError: (error, _variables, _context) => {
  //   console.log("event view error:", error)
  },
})



  const { data: sponsoredEvents, isLoading: loadingSponsoredEvents } = useQuery(["sponsored-events", userCountry], (userCountry) => getSponsoredEvents(userCountry), {
    enabled: !!userCountry
  })

  const clubObject ={
    country: userCountry,
    category: 'Club+Events'
  }
  const { data: clubEvents } = useQuery(["club-events", clubObject], (clubObject) => getEventByCategory(clubObject), {
    enabled: !!userCountry
  })
  
  const concertObject ={
    country: userCountry,
    category: 'Concert+Events'
  }
  const { data: concertEvents } = useQuery(["concert-events", concertObject], (concertObject) => getEventByCategory(concertObject), {
    enabled: !!userCountry
  })
  
  const corporateObject ={
    country: userCountry,
    category: 'Corporate+Events'
  }
  const { data: corporateEvents } = useQuery(["corporate-events", corporateObject], (corporateObject) => getEventByCategory(corporateObject), {
    enabled: !!userCountry
  })
  
  const campusObject ={
    country: userCountry,
    category: 'Campus+Events'
  }
  const { data: campusEvents } = useQuery(["campus-events", campusObject], (campusObject) => getEventByCategory(campusObject), {
    enabled: !!userCountry
  })
  
  const othersObject ={
    country: userCountry,
    category: 'Other+Events'
  }
  const { data: otherEvents } = useQuery(["other-events", othersObject], (othersObject) => getEventByCategory(othersObject), {
    enabled: !!userCountry
  })
  

  return (
    <Box>
      {/* Carousel */}
      <Grid xs={12} item sx={{paddingBottom: 4}}>
        <Paper square >
              <Box sx={{padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                <Stack>
                  {loadingSponsoredEvents ? (<Typography component='h1' variant='subtitle1'>Loading events. Please wait ...</Typography>) : (
                    <Stack direction="row" sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}} spacing={0.5}>
                      <Typography component='h1' variant='subtitle1'>FEATURED EVENTS</Typography>
                      <Typography sx={{bgcolor: 'yellow', color: colors.grey[800], padding: 0}} variant='caption'>SPONSORED</Typography>
                    </Stack>
                  )}
                  {!loadingSponsoredEvents && (
                    <Stack direction="row" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} spacing={0.5}>
                      <Typography component='h2' variant='body2'>{`Top Music Events Happening in ${country_name[0]?.label}`}</Typography>
                    </Stack>
                  )}
                </Stack>
              </Box>
              <Box sx={{ width: '100%', borderRadius: 2, position: "relative", cursor:'pointer'}}>
                  <Slider 
                      className="carousel-styles" 
                      autoplay
                      infinite
                      arrows={false}
                      speed={1200}
                      dots
                      >
                    {sponsoredEvents?.map((sponsoredEvent, i) => (
                        <Box key={i}>
                          <Grid container>
                            <Grid item xs={12} md={6} sx={{padding: 5, display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                              <Stack>
                                <Stack spacing={2} direction='row' sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', marginBottom: 2}}>
                                  <Box>
                                    <Paper elevation={5} sx={{padding: 1, textAlign: 'center'}}>
                                      <Stack>
                                        <Typography sx={{textTransform: 'uppercase'}} variant='subtitle2'>{new Date(sponsoredEvent?.date).toDateString().split(" ")[0]}</Typography>
                                        <Typography sx={{textTransform: 'uppercase'}} variant='subtitle2'>{new Date(sponsoredEvent?.date).toDateString().split(" ")[2]}</Typography>
                                        <Typography sx={{textTransform: 'uppercase'}} variant='subtitle2'>{new Date(sponsoredEvent?.date).toDateString().split(" ")[1]}</Typography>
                                      </Stack>
                                    </Paper>
                                  </Box>
                                  <Box>
                                    <Stack spacing={1}>
                                      <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                        <LocationOnOutlinedIcon fontSize='small' />
                                        <Typography className='line-clamp-1 line-clamp' variant='caption'>{sponsoredEvent?.venue}</Typography>
                                      </Stack>
                                      <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                        <OutlinedFlagTwoToneIcon fontSize='small' />
                                        <Typography className='line-clamp-1 line-clamp' variant='caption'>{sponsoredEvent?.location}</Typography>
                                      </Stack>
                                      <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                        <ScheduleOutlinedIcon fontSize='small' />
                                        <Typography className='line-clamp-1 line-clamp' variant='caption'>{`${sponsoredEvent?.time?.split(":").map(Number)[0]}:${sponsoredEvent?.time?.split(":").map(Number)[1]?.toString().padStart(2, '0')}hrs`}</Typography>
                                      </Stack>
                                    </Stack>
                                  </Box>
                                </Stack>
                                <Typography className='line-clamp-2 line-clamp' variant='h6'>{sponsoredEvent?.title}</Typography>
                                <Typography variant='caption' sx={{color: '#1976d2'}}>{sponsoredEvent?.event_category}</Typography>
                                <Typography className='line-clamp-2 line-clamp' variant='body1'>{sponsoredEvent?.description}</Typography>
                                <Stack spacing={2} sx={{marginTop: 2}}>
                                  <Button onClick={() => {
                                    dispatch(pageHasChanged(true))
                                    dispatch(setRegularPageView())
                                    router.push({ pathname: `/events/${sponsoredEvent?.id}`, query: {a: sponsoredEvent?.user} })
                                    addNewEventView({
                                      event: sponsoredEvent?.id,
                                      event_profile: sponsoredEvent?.customuserprofile,
                                      ip_address: user_ip,
                                      country: user_country,
                                      referral_url: "https://dukaflani.com",
                                    })
                                    } } variant='outlined'>Event Details</Button>
                                </Stack>
                              </Stack>
                            </Grid>
                            <Grid item md={6} sx={{display:{xs:'none', md:'flex'}, alignItems: 'center', justifyContent: 'start', padding: 3}}>
                              <Box sx={{ width: '60%', position: "relative"}}>
                                <Image 
                                  src={sponsoredEvent?.poster} 
                                  layout='responsive'
                                  height='100%'
                                  width='100%'
                                  alt={sponsoredEvent?.title}
                                  />
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                    ))}
                  </Slider>
              </Box>
        </Paper>
          </Grid>
          {/* Club Events */}
          <Box>
            <EventsCarousel
              title="Club Events"
              events={clubEvents}
              color1="#f48e21"
              color2="#2900be"
              icon={<FireOutlined style={{fontSize: 25, color: '#ffffff'}} />} 
            />
          </Box>
          {/* Concert Events */}
          <Box>
            <EventsCarousel
              title="Concert Events"
              events={concertEvents}
              color1="#f48e21"
              color2="#2900be"
              icon={<FireOutlined style={{fontSize: 25, color: '#ffffff'}} />} 
            />
          </Box>
          {/* Corporate Events */}
          <Box>
            <EventsCarousel
              title="Corporate Events"
              events={corporateEvents}
              color1="#f48e21"
              color2="#2900be"
              icon={<FireOutlined style={{fontSize: 25, color: '#ffffff'}} />} 
            />
          </Box>
          {/* Campus Events */}
          <Box>
            <EventsCarousel
              title="Campus Events"
              events={campusEvents}
              color1="#f48e21"
              color2="#2900be"
              icon={<FireOutlined style={{fontSize: 25, color: '#ffffff'}} />} 
            />
          </Box>
          {/* Other Events */}
          <Box>
            <EventsCarousel
              title="Other Events"
              events={otherEvents}
              color1="#f48e21"
              color2="#2900be"
              icon={<FireOutlined style={{fontSize: 25, color: '#ffffff'}} />} 
            />
          </Box>
          {/* About Dukaflani */}
          <Box>
            <Paper variant='outlined' square sx={{padding: 2, marginTop: 3}}>
              <Stack>
                <Typography variant='h6' component='h1'>Dukaflani Events - When & Where</Typography>
                <Typography variant='body1'>
                  A collection of music events from African Artists.
                </Typography>
                {/* <Box>
                  <ul>
                    <li>
                      <Typography variant='body2'>Musicians</Typography>
                    </li>
                    <li>
                      <Typography variant='body2'>Event organizers</Typography>
                    </li>
                    <li>
                      <Typography variant='body2'>Promoters</Typography>
                    </li>
                    <li>
                      <Typography variant='body2'>Select name brands</Typography>
                    </li>
                    <li>
                      <Typography variant='body2'>Vendors & brands who have influencer partnership agreements with musicians</Typography>
                    </li>
                  </ul>
                </Box> */}
                {/* <Typography gutterBottom variant='body1'>The above list will continue to grow with time as we continue to add more features to the platform.</Typography> */}
                {/* <Typography variant='body1'>At dukaflani.com, we help musicians sell merchandise online.</Typography> */}
              </Stack>
            </Paper>
          </Box>
          {/* Copyright */}
          <Box>
            <Copyright/>
          </Box>
    </Box>
  )
}

export default EventsComponent