// Nextjs Imports
import Head from "next/head"
import Image from "next/legacy/image";

//MUI Imports
import { Avatar, Box, Button, colors, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// Icons
import { AppstoreOutlined, WhatsAppOutlined, CheckCircleFilled, FireOutlined } from "@ant-design/icons";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';


// Components
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'
import UpsellProductsCarousel from '@/components/reusableComponents/UpsellProductsCarousel'
import Copyright from '@/components/reusableComponents/Copyright'

// Project Imports
import product from '../../../../../public/assets/pictures/product.jpg'


const ProductPageMobile = ({ setIsDarkMode, isDarkMode }) => {
    const theme = useTheme()


  return (
    <MobileNavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} >
        <Head>
          <title>Buy Dukaflani Branded Hoodie - ksh.3,500 | Khaligraph Jones</title>
          <meta name="description" content="Watch 'Kwame' by Khaligraph Jones on
           Dukaflani to get the Lyrics, Streaming Links, Products and Merchandise, Skiza Tunes, The Album, Events and Tour Dates " />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box sx={{backgroundColor: theme.myColors.myBackground, minHeight: '100vh', paddingY: 5}}>
            <Container maxWidth='lg'>
                <Box>
                    <Grid container sx={{paddingTop: 5}} rowSpacing={3}>
                        <Grid item xs={12}>
                            <Paper square sx={{padding: 2}}>
                                <Grid container columnSpacing={3}>
                                    <Grid item xs={12} md={4}>
                                    <Box sx={{position: 'relative', borderRadius: 2,}}>
                                        <Image 
                                            src={product} 
                                            layout='responsive'
                                            alt='product title'
                                            style={{borderRadius: 6}}
                                        />
                                    </Box>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Grid container columnSpacing={4}>
                                            <Grid item xs={12} md={7}>
                                                <Stack spacing={2}>
                                                    <Stack spacing={1}>
                                                        <Typography variant="h6" component='h1'>Product Title goes here</Typography>
                                                        <Typography variant="caption">Sold By: Home Apparel 254</Typography>
                                                    </Stack>
                                                    <Divider/>
                                                    <Box sx={{backgroundColor: '#f48e21', borderRadius: 2}}>
                                                        <Stack sx={{padding: 1}}>
                                                            <Stack direction='row' spacing={1}>
                                                                <CategoryOutlinedIcon sx={{color: 'white', fontSize: 20}} />
                                                                <Typography sx={{color: 'white'}} variant="subtitle2">Apparel</Typography>
                                                            </Stack>
                                                        </Stack>
                                                        <Stack sx={{padding: 0.2}}>
                                                            <Paper sx={{padding: 2, borderBottomLeftRadius: 6, borderBottomRightRadius: 6}} elevation={0} square>
                                                                <Stack>
                                                                    <Typography variant="h4">ksh.3,500</Typography>
                                                                    <Box>
                                                                        <Typography sx={{backgroundColor: colors.blue[50], padding: 0.5, color: colors.blue[500]}} variant="caption">Available</Typography>
                                                                    </Box>
                                                                    <Typography variant="caption">Hurry while stocks last!</Typography>
                                                                </Stack>
                                                            </Paper>
                                                        </Stack>
                                                    </Box>
                                                    {/* <Box sx={{width: '100%', paddingBottom: 2}}>
                                                        <Button startIcon={<WhatsAppOutlined />} sx={{backgroundColor: '#25D366'}} fullWidth  variant="contained" size='small'>Order on WhatsApp</Button>
                                                    </Box> */}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <Typography variant="subtitle1" gutterBottom>Promoted By:</Typography>
                                                <Stack direction='row' spacing={1}>
                                                <Box>
                                                    <Avatar  src='/assets/pictures/wakadinali_profile.jpg' />
                                                </Box>
                                                <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'start', justifyContent: 'start'}}>
                                                    <Stack spacing={-0.5}>
                                                        <Stack spacing={0.5} direction='row'>
                                                            <Typography variant='subtitle2'>Wakadinali</Typography>
                                                            {true && <CheckCircleFilled style={{ fontSize: 13, color: theme.myColors.textDark }} />}                   
                                                        </Stack>
                                                        <Typography variant='caption'>Artist</Typography>
                                                    </Stack>
                                                </Box>
                                                </Stack>
                                                <Box sx={{width: '100%', paddingTop: 1}}>
                                                    <Button startIcon={<FavoriteBorderOutlinedIcon />} fullWidth variant="contained" size='small'>Join Fanbase</Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper square>
                                <Stack>
                                    <Box sx={{padding: 1.5}}>
                                        <Typography variant="h6">Product Details</Typography>
                                    </Box>
                                    <Divider/>
                                    <Box sx={{padding: 1.5}}>
                                        <Stack>
                                            <Typography variant="subtitle2">Description</Typography>
                                            <Typography variant="body1">Product details goes here</Typography>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            {/* Upsell Products Carousel */}
                            <Box>
                                <UpsellProductsCarousel
                                promoter="Wakadinali"
                                color1="#f48e21"
                                color2="#b723d5"
                                icon={<FireOutlined style={{fontSize: 25, color: '#ffffff'}}/>}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                {/* Copyright */}
                <Box>
                    <Copyright/>
                </Box>
            </Container>
        </Box>
        <Container sx={{backgroundColor: theme.myColors.myBackground, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99}} maxWidth='lg'>
            <Box sx={{width: '100%', paddingBottom: 2}}>
                <Button startIcon={<WhatsAppOutlined />} sx={{backgroundColor: '#25D366'}} fullWidth  variant="contained" size='medium'>Order on WhatsApp</Button>
            </Box>
        </Container>
    </MobileNavigationLayout>
  )
}

export default ProductPageMobile