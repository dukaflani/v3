// React Imports
import { useState } from 'react'

// Next Image
import Image from "next/legacy/image";


// MUI Imports
import { Box, Button, Grid, Paper, Stack, Typography, Tooltip } from "@mui/material"

// React Slick Carousel
import Slider from "react-slick";

// Project Imports
import product1 from '../../../public/assets/pictures/dukaflani-hoodie-mockup.jpg'


// Icons
import { RightOutlined, UserOutlined } from "@ant-design/icons";



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




const ProductsCarouselDukaflani = ({ promoter, color1, color2, icon }) => {
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
              <Typography sx={{color: 'white'}} variant='subtitle1'>{`More From ${promoter}`}</Typography>
            </Stack>
            <Button size='small' variant='text' style={{color: 'white'}} endIcon={<RightOutlined style={{color: 'white', fontSize: 15}} />}>See All</Button>
          </Stack>
          <Paper square>
          <Grid>
              <Slider {...settings} >
                  {[...Array(10).keys()].map((item, i) => (
                    <Grid onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave} key={i} xs={12} sx={{ width: '100%', cursor:'pointer', padding: 0.5}} item>
                      <Box>
                          <Paper square elevation={productHovered == i ? 5 : productHovered == null ? 0 : 0}>
                            <Stack>
                            <Box sx={{position: "relative", cursor:'pointer'}}>
                              <Image 
                                  src={product1} 
                                  layout='responsive'
                                  alt='product title'
                                  width="100%"
                                  height='75%'
                                  />
                            </Box>
                            <Box sx={{padding: 0.5}}>
                              <Stack>
                                <Typography variant='body2'>Dukaflani branded hoodie</Typography>
                                <Typography variand='h6'>Ksh.3,500</Typography>
                                <Tooltip title={`From ${promoter}`} placement="top">
                                  <Stack direction='row' spacing={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                    <UserOutlined style={{fontSize: 12}} />
                                    <Typography variant='caption'>{promoter}</Typography>
                                  </Stack>
                                </Tooltip>
                              </Stack>
                            </Box>
                            </Stack>
                            <Box sx={{padding: 0.5}}>
                              <Button variant='text' size='small' fullWidth >View Details</Button>
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