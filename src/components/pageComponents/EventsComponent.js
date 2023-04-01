// Next Image
import Image from "next/legacy/image";

// MUI Imports
import { Box, Typography, Grid, Paper, Stack, Button } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// React Slick Carousel
import Slider from "react-slick";

// Project Imports
import adposter1 from '../../../public/assets/pictures/event1.jpg'
import EventsCarousel from '@/components/reusableComponents/EventsCarousel'
import Copyright from "../reusableComponents/Copyright";

// Icons
import { FireOutlined } from '@ant-design/icons';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import OutlinedFlagTwoToneIcon from '@mui/icons-material/OutlinedFlagTwoTone';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';



const EventsComponent = () => {
  const theme = useTheme()


  return (
    <Box>
      {/* Carousel */}
      <Grid xs={12} item sx={{paddingBottom: 4}}>
        <Paper square >
              <Box sx={{padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                <Stack>
                  <Typography component='h1' variant='subtitle1'>FEATURED EVENTS</Typography>
                  <Typography component='h2' variant='body2'>Top Music Events Happening in Kenya</Typography>
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
                    {[...Array(5).keys()].map((item, i) => (
                        <Box key={i}>
                          <Grid container>
                            <Grid item xs={12} md={6} sx={{padding: 5, display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                              <Stack>
                                <Stack spacing={2} direction='row' sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', marginBottom: 2}}>
                                  <Box>
                                    <Paper elevation={5} sx={{padding: 1, textAlign: 'center'}}>
                                      <Stack>
                                        <Typography variant='subtitle2'>SUN</Typography>
                                        <Typography variant='subtitle2'>09</Typography>
                                        <Typography variant='subtitle2'>MAR</Typography>
                                      </Stack>
                                    </Paper>
                                  </Box>
                                  <Box>
                                    <Stack spacing={1}>
                                      <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                        <LocationOnOutlinedIcon fontSize='small' />
                                        <Typography className='line-clamp-1 line-clamp' variant='caption'>Event Venue</Typography>
                                      </Stack>
                                      <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                        <OutlinedFlagTwoToneIcon fontSize='small' />
                                        <Typography className='line-clamp-1 line-clamp' variant='caption'>Event Location</Typography>
                                      </Stack>
                                      <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                                        <ScheduleOutlinedIcon fontSize='small' />
                                        <Typography className='line-clamp-1 line-clamp' variant='caption'>Event Time</Typography>
                                      </Stack>
                                    </Stack>
                                  </Box>
                                </Stack>
                                <Typography className='line-clamp-2 line-clamp' variant='h6'>Event Title jjygiyug jhjhg hgkugkug hkuku kjkuhkh kuhouh kuhouh  jhgiuiuh jygiuio8 kugiuig jugi7o8g kuoyo8y kui7i7fclhut urduhof</Typography>
                                <Typography variant='caption' sx={{color: '#1976d2'}}>Concert Event</Typography>
                                <Typography className='line-clamp-2 line-clamp' variant='body1'>Event description ygiuiuh yugiugiu iugiiu iguygi yguygig gygiygiu yguygiig kguyioyg ugutiuhiyfiy kuguohiyv kuguou ouguyiuhiy kuguygohut </Typography>
                                <Stack direction='row' spacing={2} sx={{marginTop: 2}}>
                                  <Button variant='outlined'>Event Details</Button>
                                  <Button variant='outlined'>Buy Tickets</Button>
                                </Stack>
                              </Stack>
                            </Grid>
                            <Grid item md={6} sx={{display:{xs:'none', md:'flex'}, alignItems: 'center', justifyContent: 'start', padding: 3}}>
                              <Box sx={{ width: '60%', position: "relative"}}>
                                <Image 
                                  src={adposter1} 
                                  layout='responsive'
                                  alt='Event poster'
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
              color1="#f48e21"
              color2="#2900be"
              icon={<FireOutlined style={{fontSize: 25, color: '#ffffff'}} />} 
            />
          </Box>
          {/* Concert Events */}
          <Box>
            <EventsCarousel
              title="Concert Events"
              color1="#f48e21"
              color2="#2900be"
              icon={<FireOutlined style={{fontSize: 25, color: '#ffffff'}} />} 
            />
          </Box>
          {/* Corporate Events */}
          <Box>
            <EventsCarousel
              title="Corporate Events"
              color1="#f48e21"
              color2="#2900be"
              icon={<FireOutlined style={{fontSize: 25, color: '#ffffff'}} />} 
            />
          </Box>
          {/* Campus Events */}
          <Box>
            <EventsCarousel
              title="Campus Events"
              color1="#f48e21"
              color2="#2900be"
              icon={<FireOutlined style={{fontSize: 25, color: '#ffffff'}} />} 
            />
          </Box>
          {/* Other Events */}
          <Box>
            <EventsCarousel
              title="Other Events"
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