// React Imports
import { useEffect, useState } from 'react'

// Next Image
import Image from "next/legacy/image";
import { useRouter } from "next/router"


// MUI Imports
import { Box, Button, Grid, Paper, Stack, Typography, Tooltip, colors } from "@mui/material"

// React Slick Carousel
import Slider from "react-slick";

// NPM Imports
import numeral from 'numeral';


// Icons
import { UserOutlined } from "@ant-design/icons";
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




const ProductsCarouselDukaflani = ({ promoter, color1, color2, icon, upsellProducts }) => {
    const router = useRouter()
    const dispatch = useDispatch()
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
            {/* <Button size='small' variant='text' disabled style={{color: 'white'}} endIcon={<RightOutlined style={{color: 'white', fontSize: 15}} />}>See All</Button> */}
          </Stack>
          <Paper square>
          <Grid>
              <Slider {...settings} >
                  {upsellProducts?.map((upsellProduct, i) => (
                    <Grid onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave} key={i} xs={12} sx={{ width: '100%', cursor:'pointer', padding: 0.5}} item>
                      <Box>
                          <Paper square elevation={productHovered == i ? 5 : productHovered == null ? 0 : 0}>
                            <Stack>
                            <Box sx={{position: "relative", cursor:'pointer', backgroundColor: colors.grey[100]}}>
                              <Image 
                                  src={upsellProduct?.image} 
                                  layout='responsive'
                                  alt={upsellProduct?.title}
                                  width="100%"
                                  height='75%'
                                  />
                            </Box>
                            <Box sx={{padding: 0.5}}>
                              <Stack spacing={0.5}>
                                <Typography className="line-clamp-1 line-clamp" variant='body2'>{upsellProduct?.title}</Typography>
                                <Typography className="line-clamp-1 line-clamp" variand='h6'>{upsellProduct?.local_currency}{numeral(upsellProduct?.local_price).format('0,0')}</Typography>
                                <Tooltip title={`From ${promoter}`} placement="top">
                                  <Stack direction='row' spacing={0.5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                    <UserOutlined style={{fontSize: 12}} />
                                    <Typography className="line-clamp-1 line-clamp" variant='caption'>{promoter}</Typography>
                                  </Stack>
                                </Tooltip>
                              </Stack>
                            </Box>
                            </Stack>
                            <Box sx={{padding: 0.5}}>
                              <Button onClick={() => {
                                dispatch(pageHasChanged(true))
                                router.push({ pathname: `/shop/${upsellProduct?.id}` })
                                }} variant='text' size='small' fullWidth >View Details</Button>
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