// React Imports
import { useState } from 'react'

// Next Image
import Image from "next/legacy/image";


// MUI Imports
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material"

// React Slick Carousel
import Slider from "react-slick";

// Project Imports
import poster1 from '../../../public/assets/pictures/event1.jpg'


// Icons
import { ClockCircleOutlined, EnvironmentOutlined, FlagOutlined, RightOutlined } from "@ant-design/icons";



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
  return (
    <div
      className={className}
      style={{ ...style, display: "flex", alignItems: 'center', justifyContent: 'center' ,backgroundColor: "black", opacity: 0.5 , left: 10, height:40, width: 40, borderRadius: '50%', zIndex: 1}}
      onClick={onClick}
    />
  );
}




const ProductsCarouselDukaflani = ({ title, color1, color2, icon }) => {
    const [productHovered, setProductHovered] = useState(null)
  
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
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
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
            <Button size='small' variant='text' style={{color: 'white'}} endIcon={<RightOutlined style={{color: 'white', fontSize: 15}} />}>Explore</Button>
          </Stack>
          <Paper square>
          <Grid>
              <Slider {...settings} >
                  {[...Array(10).keys()].map((item, i) => (
                    <Grid onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave} key={i} xs={12} sx={{ width: '100%', cursor:'pointer', padding: 0.5}} item>
                      <Box>
                          <Paper square elevation={productHovered == i ? 5 : productHovered == null ? 0 : 0}>
                            <Stack>
                            <Box sx={{ position: "relative", cursor:'pointer'}}>
                              <Image 
                                  src={poster1} 
                                  layout='responsive'
                                  alt='Event title'
                                  width="100%"
                                  height='75%'
                                  />
                            </Box>
                            <Box sx={{padding: 0.5}}>
                              <Stack >
                                <Typography gutterBottom className='line-clamp-1 line-clamp' variant='body2'>Event title jvjdjn ljnljnln lnljdnlscn ldkndjdln knkdjndljn jnjnln kkjnlknk knjnkj ljnljnl</Typography>
                                  <Stack spacing={0.5}>
                                    <Stack direction='row' spacing={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                      <EnvironmentOutlined style={{fontSize: 12}} />
                                      <Typography className='line-clamp-1 line-clamp' variant='caption'>Event Venue</Typography>
                                    </Stack>
                                    <Stack direction='row' spacing={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                      <FlagOutlined style={{fontSize: 12}} />
                                      <Typography className='line-clamp-1 line-clamp' variant='caption'>Event Location</Typography>
                                    </Stack>
                                      <Stack direction='row' spacing={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                        <ClockCircleOutlined style={{fontSize: 12}} />
                                        <Typography className='line-clamp-1 line-clamp' variant='caption'>Event Time</Typography>
                                      </Stack>
                                  </Stack>
                              </Stack>
                            </Box>
                            </Stack>
                            <Box sx={{padding: 0.5}}>
                              <Button variant='text' size='small' fullWidth >Event Details</Button>
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