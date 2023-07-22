// React Imports
import { useState } from 'react'

// Next Image
import Image from "next/legacy/image";
import { useRouter } from 'next/router';

// MUI Imports
import { Box, Divider, Grid, Paper, Stack, Typography, colors, Link, useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';

// React Slick Carousel
import Slider from "react-slick";

// NPM Imports
import { useDispatch, useSelector } from 'react-redux';

// TanStack/React-Query
import { useQuery } from '@tanstack/react-query';

// Project Imports
import { getProductByCategory } from "@/axios/axios";
import Leaderboard3Ads from '@/components/reusableComponents/Leaderboard3Ads'
import ProductsCarouselDukaflani from '@/components/reusableComponents/ProductsCarouselDukaflani'
import Copyright from '@/components/reusableComponents/Copyright'
import ProductsCarousel from '@/components/reusableComponents/ProductsCarousel'
import adposter1 from '../../../public/assets/pictures/dukaflani-ad-poster5.png'
import adposter2 from '../../../public/assets/pictures/dukaflani-ad-poster1.png'
import adposter3 from '../../../public/assets/pictures/dukaflani-ad-poster2.png'
import adposter4 from '../../../public/assets/pictures/dukaflani-ad-poster3.png'
import adposter5 from '../../../public/assets/pictures/dukaflani-ad-poster4.png'
import { pageHasChanged } from '@/redux/features/navigation/navigationSlice';


// Icons
import { ApiTwoTone,  BarcodeOutlined,  CheckCircleOutlined, DollarCircleTwoTone, HeartOutlined,  
  QuestionCircleTwoTone, SkinOutlined, TabletOutlined } from "@ant-design/icons";
  import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';




const ProductsComponent = () => {
  const is_darkMode = useSelector((state) => state.theme.isDarkMode)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const router = useRouter()
  const adPostersArray = [adposter1, adposter2, adposter3, adposter4, adposter5]
  const [categoryHovered, setCategoryHovered] = useState('')
  const [vendorHovered, setVendorHovered] = useState('')
  const theme = useTheme()
  const dispatch = useDispatch()

  const handleMouseIn = (index) => {
    setCategoryHovered(index)
  }

  const handleMouseOut = () => {
    setCategoryHovered('')
  }

  const handleMouseInVendor = (index) => {
    setVendorHovered(index)
  }

  const handleMouseOutVendor = () => {
    setVendorHovered('')
  }


  const storeCategories = [
    {
      name: <Typography sx={ categoryHovered == '0' ? {color: '#1976d2'} : {color: colors.grey[100]}} variant="caption">Dukaflani Brands</Typography>,
      icon: <CheckCircleOutlined style={ categoryHovered == '0' ? {fontSize: 15, color: '#1976d2'} : {fontSize: 15, color: colors.grey[100]}} />,
      link: '#dukaflani'
    },
    {
      name: <Typography sx={ categoryHovered == '1' ? {color: '#1976d2'} : {color: colors.grey[100]}} variant="caption">Apparel</Typography>,
      icon: <SkinOutlined style={ categoryHovered == '1' ? {fontSize: 15, color: '#1976d2'} : {fontSize: 15, color: colors.grey[100]}} />,
      link: '#apparel'
    },
    {
      name: <Typography sx={ categoryHovered == '2' ? {color: '#1976d2'} : {color: colors.grey[100]}} variant="caption">Wellness</Typography>,
      icon: <HeartOutlined style={ categoryHovered == '2' ? {fontSize: 15, color: '#1976d2'} : {fontSize: 15, color: colors.grey[100]}} />,
      link: '#wellness'
    },
    {
      name: <Typography sx={ categoryHovered == '3' ? {color: '#1976d2'} : {color: colors.grey[100]}} variant="caption">Electronics</Typography>,
      icon: <TabletOutlined style={ categoryHovered == '3' ? {fontSize: 15, color: '#1976d2'} : {fontSize: 15, color: colors.grey[100]}} />,
      link: '#electronics'
    },
    {
      name: <Typography sx={ categoryHovered == '3' ? {color: '#1976d2'} : {color: colors.grey[100]}} variant="caption">Albums</Typography>,
      icon: <BarcodeOutlined style={ categoryHovered == '3' ? {fontSize: 15, color: '#1976d2'} : {fontSize: 15, color: colors.grey[100]}} />,
      link: '#albums'
    },
  ]

  const topVendors = [
    {
      name: <Typography sx={ vendorHovered == '0' ? {color: '#1976d2'} : {color: colors.grey[100]}} variant="caption">Dukaflani Brands</Typography>
    },
    // {
    //   name: <Typography sx={ vendorHovered == '1' ? {color: '#1976d2'} : {color: colors.grey[100]}} variant="caption">Mbichwa</Typography>
    // },
    // {
    //   name: <Typography sx={ vendorHovered == '2' ? {color: '#1976d2'} : {color: colors.grey[100]}} variant="caption">Home 254 Apparel</Typography>
    // },
    // {
    //   name: <Typography sx={ vendorHovered == '3' ? {color: '#1976d2'} : {color: colors.grey[100]}} variant="caption">Vazzi</Typography>
    // },
    // {
    //   name: <Typography sx={ vendorHovered == '4' ? {color: '#1976d2'} : {color: colors.grey[100]}} variant="caption">Kaka Empire</Typography>
    // },
    // {
    //   name: <Typography sx={ vendorHovered == '5' ? {color: '#1976d2'} : {color: colors.grey[100]}} variant="caption">Zozanation</Typography>
    // },
    // {
    //   name: <Typography sx={ vendorHovered == '6' ? {color: '#1976d2'} : {color: colors.grey[100]}} variant="caption">Calif Wear</Typography>
    // },
  ]

  const categoryDukaflani = 'Dukaflani'
  const { data: dukaflaniProducts } = useQuery(["dukaflani-products", categoryDukaflani], (categoryDukaflani) => getProductByCategory(categoryDukaflani))
  
  const categoryApparel = 'Apparel'
  const { data: apparelProducts } = useQuery(["apparel-products", categoryApparel], (categoryApparel) => getProductByCategory(categoryApparel))
  
  const categoryBeauty = 'Beauty'
  const { data: beautyProducts } = useQuery(["beauty-products", categoryBeauty], (categoryBeauty) => getProductByCategory(categoryBeauty))
  
  const categoryWellness = 'Wellness'
  const { data: wellnessProducts } = useQuery(["wellness-products", categoryWellness], (categoryWellness) => getProductByCategory(categoryWellness))
  
  const categoryElectronics = 'Electronics'
  const { data: electronicsProducts } = useQuery(["electronics-products", categoryElectronics], (categoryElectronics) => getProductByCategory(categoryElectronics))
  
  const categoryAlbums = 'Albums'
  const { data: albumsProducts } = useQuery(["electronics-products", categoryAlbums], (categoryAlbums) => getProductByCategory(categoryAlbums))
  

  return (
    <Box>
      {/* Hero Section */}
      <Box>
        <Grid container spacing={2}>
          <Grid md={2} sx={{ display: {xs:'none', md:'block'}}} item>
            <Paper variant='outlined' square sx={{padding: 1, height: '100%'}}>
                {storeCategories.map((category, i) => (
                  <Link underline='none' key={i} href={category?.link}>
                    <Stack 
                        spacing={1} 
                        direction='row' 
                        sx={{cursor: 'pointer', paddingBottom: 0.5}}
                        onMouseEnter={() => handleMouseIn(i)}
                        onMouseLeave={handleMouseOut}
                      >
                      <Box>{category.icon}</Box>
                      <Box>{category.name}</Box>
                    </Stack>
                  </Link>
                ))}
                <Box sx={{paddingTop: 1}}>
                  <Typography variant='caption'>Top Vendors:</Typography>
                </Box>
                <Divider />
                  <Stack 
                      sx={{cursor: 'pointer'}}
                      spacing={-0.5}
                      >
                      {topVendors.map((vendor, i) => (
                    <Box 
                        key={i}
                        onMouseEnter={() => handleMouseInVendor(i)}
                        onMouseLeave={handleMouseOutVendor}
                        >
                      {vendor.name}
                    </Box>
                    ))}
                  </Stack>
            </Paper>
          </Grid>
          {/* Carousel */}
          <Grid xs={12} sm={9} md={7} item>
              <Box sx={{ width: '100%', height: '100%', position: "relative", cursor:'pointer', backgroundColor: colors.grey[100]}}>
                  <Slider 
                      className="carousel-styles" 
                      autoplay
                      infinite
                      arrows={false}
                      speed={1200}
                      dots
                      >
                    {adPostersArray.map((posterItem, i) => (
                        <Image 
                            key={i}
                            src={posterItem} 
                            layout='responsive'
                            alt='Banner Ad'
                            // style={{borderRadius: 6}}
                            />
                    ))}
                  </Slider>
              </Box>
          </Grid>
          <Grid sm={3} sx={{ display: {xs:'none', sm:'block'}}} item>
            <Stack spacing={2} sx={{height:'100%'}}>
            <Paper variant='outlined' square sx={{padding: 1, height: '50%'}}>
              <Stack onClick={() => {
                dispatch(pageHasChanged(true))
                router.push({ pathname: '/links/contact_us' })
                }} sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'space-evenly', height: '100%'}}>
                <Stack direction='row' spacing={1} sx={{display: 'flex', alignItems:'center', cursor: 'pointer'}}>
                  <DollarCircleTwoTone style={{fontSize: 25}} twoToneColor='#1976d2'/>
                  <Stack spacing={-1}>
                    <Typography variant='subtitle2'>Sell on Dukaflani</Typography>
                    <Typography variant='caption'>Become a Vendor</Typography>
                  </Stack>
                </Stack>
                <Stack direction='row' spacing={1} sx={{display: 'flex', alignItems:'center', cursor: 'pointer'}}>
                  <ApiTwoTone style={{fontSize: 25}} twoToneColor='#1976d2' />
                  <Stack spacing={-1}>
                    <Typography variant='subtitle2'>How it Works</Typography>
                    <Typography variant='caption'>Self Help Guide</Typography>
                  </Stack>
                </Stack>
                <Stack direction='row' spacing={1} sx={{display: 'flex', alignItems:'center', cursor: 'pointer'}}>
                  <QuestionCircleTwoTone style={{fontSize: 25}}  twoToneColor='#1976d2' />
                  <Stack spacing={-1}>
                    <Typography variant='subtitle2'>Help Center</Typography>
                    <Typography  variant='caption'>Frequently Asked Questions</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
            <Paper sx={{width: '100%', height: '50%'}}>
            <Link href='https://hub.dukaflani.com' underline='none' target="_blank" rel="noopener">
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent:'center'}} className='animated-gradient'>
                <Stack sx={{textAlign: 'center'}} spacing={1}>
                  <Typography sx={{color: 'white'}} variant='caption'>GET STARTED</Typography>
                  <Typography onClick={() => {
                    dispatch(pageHasChanged(true))
                    router.push({ pathname: '/links/contact_us' })
                    }} sx={{color: 'white', border: '2px solid white', cursor: 'pointer'}} variant='h6'>LOGIN</Typography>
                  <Typography sx={{color: 'white', letterSpacing: 3}} variant='body1'>CREATOR&apos;S HUB!</Typography>
                </Stack>
              </Box>
              </Link>
            </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {/* Dukaflani Ads */}
      <Box>
        <Leaderboard3Ads/>
      </Box>
      {/* Dukaflani Brands Carousel */}
      <Box id='dukaflani'>
        <ProductsCarouselDukaflani
          title="Dukaflani Brands"
          products={dukaflaniProducts}
          color1="#2900be"
          color2="#b723d5"
        />
      </Box>
      {/* Apparel Carousel */}
      <Box id='apparel'>
        <ProductsCarousel
          title="Apparel"
          products={apparelProducts}
          color1="#f48e21"
          color2="#b723d5"
          icon={<SkinOutlined style={{fontSize: 25, color: '#ffffff'}}/>}
        />
      </Box>
      {/* Beauty Products Carousel */}
      <Box id='beauty'>
        <ProductsCarousel
          title="Beauty"
          products={beautyProducts}
          color1="#f48e21"
          color2="#b723d5"
          icon={<Face3OutlinedIcon sx={{fontSize: 28, color: '#ffffff'}}/>}
        />
      </Box>
      {/* Wellness Carousel */}
      <Box id='wellness'>
        <ProductsCarousel
          title="Wellness"
          products={wellnessProducts}
          color1="#f48e21"
          color2="#b723d5"
          icon={<HeartOutlined style={{fontSize: 25, color: '#ffffff'}}/>}
        />
      </Box>
      {/* Electronics Carousel */}
      <Box id='electronics'>
        <ProductsCarousel
          title="Electronics"
          products={electronicsProducts}
          color1="#f48e21"
          color2="#b723d5"
          icon={<TabletOutlined style={{fontSize: 25, color: '#ffffff'}}/>}
        />
      </Box>
      {/* Albums Carousel */}
      <Box id='albums'>
        <ProductsCarousel
          title="Albums"
          products={albumsProducts}
          color1="#f48e21"
          color2="#b723d5"
          icon={<BarcodeOutlined style={{fontSize: 25, color: '#ffffff'}}/>}
        />
      </Box>
      {/* About Dukaflani */}
      <Box>
        <Paper variant='outlined' square sx={{padding: 2, marginTop: 3}}>
          <Stack>
            <Typography variant='h6' component='h1'>Dukaflani Shopping - Buy Celebrity Merchandise</Typography>
            <Typography variant='body1'>
              We help celebrities sell online.
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

export default ProductsComponent