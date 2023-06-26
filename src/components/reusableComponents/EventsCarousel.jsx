// React Imports
import { useEffect, useState } from 'react'

// Next Image
import Image from "next/legacy/image";
import { useRouter } from 'next/router'


// MUI Imports
import { Box, Button, colors, Grid, Paper, Stack, Typography } from "@mui/material"

// React Slick Carousel
import Slider from "react-slick";



// Icons
import PublicIcon from '@mui/icons-material/Public';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { pageHasChanged } from '@/redux/features/navigation/navigationSlice';
import { useDispatch } from 'react-redux';



function CarouselNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", alignItems: 'center', justifyContent: 'center' ,backgroundColor: "black", opacity: 0.5 , right: 10, height:40, width: 40, borderRadius: '50%'}}
      onClick={onClick}
    />
  );
}

function CarouselPrevArrow(props) {
  const { className, style, onClick } = props;

  useEffect(() => {
    if (onClick) {
      onClick()
    }
  },[onClick])
  
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", alignItems: 'center', justifyContent: 'center' ,backgroundColor: "black", opacity: 0.5 , left: 10, height:40, width: 40, borderRadius: '50%', zIndex: 1}}
      onClick={onClick}
    />
  );
}




const ProductsCarouselDukaflani = ({ title, color1, color2, icon, events }) => {
    const router = useRouter()
    const [productHovered, setProductHovered] = useState(null)
    const dispatch = useDispatch()
  
    const handleMouseEnter = (index) => {
      setProductHovered(index)
    }
  
    const handleMouseLeave = () => {
      setProductHovered(null)
    }
    

    const settings = {
      slidesToShow: 4,
      slidesToScroll: 2,
      infinite: false,
      speed: 1200,
      nextArrow: <CarouselNextArrow />,
      prevArrow: <CarouselPrevArrow />,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
      ]
    };
  
  
    return (
      <Box sx={{marginTop: 2}}>
        <Stack>
          <Stack direction='row' sx={{paddingX: 3, paddingY: 1.5, borderTopRightRadius: 5, borderTopLeftRadius: 5, display: 'flex', alignItems: 'center', justifyContent:'space-between', backgroundImage: `linear-gradient(to right, ${color1}, ${color2})`}}>
            <Stack direction='row' spacing={1}>
              <Box >
                {icon}
              </Box>
              <Typography sx={{color: 'white'}} variant='subtitle1'>{title}</Typography>
            </Stack>
            {/* <Button size='small' variant='text' disabled style={{color: 'white'}} endIcon={<RightOutlined style={{color: 'white', fontSize: 15}} />}>Explore</Button> */}
          </Stack>
          <Paper square>
          <Grid>
              <Slider {...settings} >
                  {events?.map((event, i) => (
                    <Grid onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave} key={i} xs={12} sx={event?.id == 1 ? {display: "none"} : { width: '100%', cursor:'pointer', padding: 0.5}} item>
                      <Box>
                          <Paper square elevation={productHovered == i ? 5 : productHovered == null ? 0 : 0}>
                            <Stack>
                            <Box sx={{ position: "relative", cursor:'pointer', backgroundColor: colors.grey[100]}}>
                              <Image 
                                  src={event?.poster} 
                                  layout='responsive'
                                  alt={event?.title}
                                  width="100%"
                                  height='75%'
                                  />
                            </Box>
                            <Box sx={{padding: 0.5}}>
                              <Stack >
                                <Typography gutterBottom className='line-clamp-1 line-clamp' variant='body2'>{event?.title}</Typography>
                                  <Stack spacing={0.5}>
                                    <Stack direction='row' spacing={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                      <LocationOnOutlinedIcon sx={{fontSize: 15}} />
                                      <Typography className='line-clamp-1 line-clamp' variant='caption'>{event?.venue}</Typography>
                                    </Stack>
                                    <Stack direction='row' spacing={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                      <FlagOutlinedIcon sx={{fontSize: 15}} />
                                      <Typography className='line-clamp-1 line-clamp' variant='caption'>{event?.location}</Typography>
                                    </Stack>
                                    <Stack direction='row' spacing={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                      <PublicIcon sx={{fontSize: 15}} />
                                      <Typography className='line-clamp-1 line-clamp' variant='caption'>{`${event?.city}, ${event?.country}`}</Typography>
                                    </Stack>
                                      <Stack direction='row' spacing={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                        <InsertInvitationOutlinedIcon sx={{fontSize: 15}} />
                                        <Typography className='line-clamp-1 line-clamp' variant='caption'>{new Date(event?.date).toDateString()}</Typography>
                                      </Stack>
                                  </Stack>
                              </Stack>
                            </Box>
                            </Stack>
                            <Box sx={{padding: 0.5}}>
                              <Button onClick={() => {
                                dispatch(pageHasChanged(true))
                                router.push({ pathname: `/events/${event?.id}`, query: {a: event?.user} }) 
                                }} variant='text' size='small' fullWidth >Event Details</Button>
                            </Box>
                          </Paper>
                      </Box>
                    </Grid>
                  ))}
            </Slider>
          </Grid>
          </Paper>
        </Stack>
      </Box>
    )
  }


  export default ProductsCarouselDukaflani;