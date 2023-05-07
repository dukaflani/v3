// React Imports
import { useEffect, useState } from 'react'

// Next Image
import Image from "next/legacy/image";
import { useRouter } from 'next/router';

// NPM Imports
import numeral from 'numeral';

// MUI Imports
import { Box, Button, colors, Grid, Paper, Stack, Typography, Tooltip } from "@mui/material"

// React Slick Carousel
import Slider from "react-slick";

// Project Imports
import whiteLogo from '../../../public/assets/pictures/dukaflani-white-logo-small.png'


// Icons
import {  UserOutlined } from "@ant-design/icons";



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
  },[])


  return (
    <div
      className={className}
      style={{ ...style, display: "flex", alignItems: 'center', justifyContent: 'center' ,backgroundColor: "black", opacity: 0.5 , left: 10, height:40, width: 40, borderRadius: '50%', zIndex: 1}}
      onClick={onClick}
    />
  );
}




const ProductsCarouselDukaflani = ({ title, color1, color2, products }) => {
    const router = useRouter()
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
            <Stack direction='row' spacing={2}>
              <Box sx={{ width: 26, height: 26, position: "relative", cursor:'pointer'}}>
                <Image 
                    src={whiteLogo} 
                    layout='responsive'
                    alt='Dukaflani'
                    />
              </Box>
              <Typography sx={{color: 'white'}} variant='subtitle1'>{title}</Typography>
            </Stack>
            {/* <Button size='small' disabled variant='text' style={{color: 'white'}} endIcon={<RightOutlined style={{color: 'white', fontSize: 15}} />}>See All</Button> */}
          </Stack>
          <Paper square>
          <Grid>
              <Slider {...settings} >
                  {products?.map((product, i) => (
                    <Grid onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave} key={i} xs={12} sx={{ width: '100%', cursor:'pointer', padding: 0.5}} item>
                      <Box>
                          <Paper square elevation={productHovered == i ? 5 : productHovered == null ? 0 : 0}>
                            <Stack>
                            <Box sx={{ position: "relative", cursor:'pointer', backgroundColor: colors.grey[100]}}>
                              <Image 
                                  src={product?.image} 
                                  layout='responsive'
                                  alt={product?.title}
                                  width="100%"
                                  height='75%'
                                  />
                            </Box>
                            <Box sx={{padding: 0.5}}>
                              <Stack spacing={0.5}>
                                <Typography className="line-clamp-1 line-clamp" variant='body2'>{product?.title}</Typography>
                                <Typography className="line-clamp-1 line-clamp" variand='h6'>{`${product?.local_currency}${numeral(product?.local_price).format('0,0')}`}</Typography>
                                <Tooltip title={`From ${product?.sold_by}`} placement="top">
                                  <Stack direction='row' spacing={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                    <UserOutlined style={{fontSize: 12}} />
                                    <Typography className="line-clamp-1 line-clamp" variant='caption'>{product?.sold_by}</Typography>
                                  </Stack>
                                </Tooltip>
                              </Stack>
                            </Box>
                            </Stack>
                            <Box sx={{padding: 0.5}}>
                              <Button onClick={() => router.push({ pathname: `/shop/${product?.id}` })} variant='text' size='small' fullWidth >View Details</Button>
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