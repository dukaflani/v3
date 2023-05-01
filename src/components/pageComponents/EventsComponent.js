// Next Image
import Image from "next/legacy/image";
import { useRouter } from 'next/router'

// MUI Imports
import { Box, Typography, Grid, Paper, Stack, Button, Skeleton } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// React Slick Carousel
import Slider from "react-slick";

// TanStack/React-Query
import { useQuery } from '@tanstack/react-query';

// Project Imports
import { getFeaturedEvents, getEventByCategory } from "@/axios/axios";
import EventsCarousel from '@/components/reusableComponents/EventsCarousel'
import Copyright from "../reusableComponents/Copyright";

// Icons
import { FireOutlined } from '@ant-design/icons';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import OutlinedFlagTwoToneIcon from '@mui/icons-material/OutlinedFlagTwoTone';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';



const EventsComponent = () => {
  const theme = useTheme()
  const router = useRouter()

  const { data: featuredEvents, isLoading: loadingFeaturedEvents } = useQuery(["featured-events"], getFeaturedEvents)

  const clubCategory = 'Club+Events'
  const { data: clubEvents } = useQuery(["club-events", clubCategory], (clubCategory) => getEventByCategory(clubCategory))
  
  const concertCategory = 'Concert+Events'
  const { data: concertEvents } = useQuery(["concert-events", concertCategory], (concertCategory) => getEventByCategory(concertCategory))
  
  const corporateCategory = 'Corporate+Events'
  const { data: corporateEvents } = useQuery(["corporate-events", corporateCategory], (corporateCategory) => getEventByCategory(corporateCategory))
  
  const campusCategory = 'Campus+Events'
  const { data: campusEvents } = useQuery(["campus-events", campusCategory], (campusCategory) => getEventByCategory(campusCategory))
  
  const othersCategory = 'Other+Events'
  const { data: otherEvents } = useQuery(["other-events", othersCategory], (othersCategory) => getEventByCategory(othersCategory))
  

  return (
    <Box>
      {/* Carousel */}
      <Grid xs={12} item sx={{paddingBottom: 4}}>
        <Paper square >
              <Box sx={{padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                <Stack>
                  {loadingFeaturedEvents ? (<Typography component='h1' variant='subtitle1'>Loading events. Please wait ...</Typography>) : (<Typography component='h1' variant='subtitle1'>FEATURED EVENTS</Typography>)}
                  {!loadingFeaturedEvents && <Typography component='h2' variant='body2'>Top Music Events Happening in Kenya</Typography>}
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
                    {featuredEvents?.map((featuredEvent, i) => (
                        <Box key={i}>
                          <Grid container>
                            <Grid item xs={12} md={6} sx={{padding: 5, display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                              <Stack>
                                <Stack spacing={2} direction='row' sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', marginBottom: 2}}>
                                  <Box>
                                    <Paper elevation={5} sx={{padding: 1, textAlign: 'center'}}>
                                      <Stack>
                                        <Typography sx={{textTransform: 'uppercase'}} variant='subtitle2'>{new Date(featuredEvent?.date).toDateString().split(" ")[0]}</Typography>
                                        <Typography sx={{textTransform: 'uppercase'}} variant='subtitle2'>{new Date(featuredEvent?.date).toDateString().split(" ")[2]}</Typography>
                                        <Typography sx={{textTransform: 'uppercase'}} variant='subtitle2'>{new Date(featuredEvent?.date).toDateString().split(" ")[1]}</Typography>
                                      </Stack>
                                    </Paper>
                                  </Box>
                                  <Box>
                                    <Stack spacing={1}>
                                      <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                        <LocationOnOutlinedIcon fontSize='small' />
                                        <Typography className='line-clamp-1 line-clamp' variant='caption'>{featuredEvent?.venue}</Typography>
                                      </Stack>
                                      <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                        <OutlinedFlagTwoToneIcon fontSize='small' />
                                        <Typography className='line-clamp-1 line-clamp' variant='caption'>{featuredEvent?.location}</Typography>
                                      </Stack>
                                      <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                        <ScheduleOutlinedIcon fontSize='small' />
                                        <Typography className='line-clamp-1 line-clamp' variant='caption'>{`${featuredEvent?.time?.split(":").map(Number)[0]}:${featuredEvent?.time?.split(":").map(Number)[1]?.toString().padStart(2, '0')}hrs`}</Typography>
                                      </Stack>
                                    </Stack>
                                  </Box>
                                </Stack>
                                <Typography className='line-clamp-2 line-clamp' variant='h6'>{featuredEvent?.title}</Typography>
                                <Typography variant='caption' sx={{color: '#1976d2'}}>{featuredEvent?.event_category}</Typography>
                                <Typography className='line-clamp-2 line-clamp' variant='body1'>{featuredEvent?.description}</Typography>
                                <Stack spacing={2} sx={{marginTop: 2}}>
                                  <Button onClick={() => router.push({ pathname: `/events/${featuredEvent?.id}`, query: {a: featuredEvent?.user} }) } variant='outlined'>Event Details</Button>
                                </Stack>
                              </Stack>
                            </Grid>
                            <Grid item md={6} sx={{display:{xs:'none', md:'flex'}, alignItems: 'center', justifyContent: 'start', padding: 3}}>
                              <Box sx={{ width: '60%', position: "relative"}}>
                                <Image 
                                  src={featuredEvent?.poster} 
                                  layout='responsive'
                                  height='100%'
                                  width='100%'
                                  alt={featuredEvent?.title}
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
          {/* Copyright */}
          <Box>
            <Copyright/>
          </Box>
    </Box>
  )
}

export default EventsComponent