// Nextjs Imports
import Head from "next/head"
import Image from "next/legacy/image";
import { useRouter } from "next/router";

//MUI Imports
import { Avatar, Box, Button, colors, Container, Divider, Grid, Link, Paper, Skeleton, Stack, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// NPM Imports
import numeral from 'numeral';

// Icons
import { WhatsAppOutlined, CheckCircleFilled, FireOutlined } from "@ant-design/icons";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

// TanStack/React-Query
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Project imports
import { getCurrentVideoProduct, getCurrentVideoUserProfile, getUpsellProducts } from "@/axios/axios";

// Components
import NavigationLayout2 from '@/layout/desktop/NavigationLayout2'
import UpsellProductsCarousel from '@/components/reusableComponents/UpsellProductsCarousel'
import Copyright from '@/components/reusableComponents/Copyright'



const ProductPage = ({ setIsDarkMode, isDarkMode }) => {
    const theme = useTheme()
    const router = useRouter()
    const { productid } = router.query

    
    const queryClient = useQueryClient()
    const videoProductID = productid ? productid : 0
    const { data: product, isLoading: loadingProduct } = useQuery(["current-video-product", videoProductID], (videoProductID) => getCurrentVideoProduct(videoProductID), {
        initialData: () => {
            const videoProduct = queryClient.getQueryData(["current-video-product", Number(videoProductID)])
            if(videoProduct) {
                return videoProduct
            } else {
                return undefined
            }
        }
    })


    const publisherUserID = product?.user ? product?.user : 0
    const { data: profile, isLoading: loadingProfile, isFetching } = useQuery(["current-video-profile", publisherUserID], (publisherUserID) => getCurrentVideoUserProfile(publisherUserID))
    
    const { data: upsellProducts } = useQuery(["upsell-products", publisherUserID], (publisherUserID) => getUpsellProducts(publisherUserID))
    
    const msg = `Hello ${product?.promoted_by}, I'm interested in the ${product?.title} from ${product?.sold_by} on dukaflani.com`
    const msg2 = msg.replace(/ /g, "%20")
    const whatsappLink = `https://wa.me/${product?.whatsapp}?text=${msg2}`


  return (
    <NavigationLayout2 setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} >
        <Head>
          <title>Buy Dukaflani Branded Hoodie - ksh.3,500 | Khaligraph Jones</title>
          <meta name="description" content="Watch 'Kwame' by Khaligraph Jones on
           Dukaflani to get the Lyrics, Streaming Links, Products and Merchandise, Skiza Tunes, The Album, Events and Tour Dates " />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box sx={{backgroundColor: theme.myColors.myBackground, minHeight: '100vh', paddingTop: 5}}>
            <Container maxWidth='lg'>
                <Box>
                    <Grid container sx={{padding: 5}} rowSpacing={3}>
                        <Grid item xs={12}>
                            <Paper square sx={{padding: 2}}>
                                <Grid container columnSpacing={3}>
                                    <Grid item xs={12} md={4}>
                                    {!loadingProduct ? (<Box sx={{position: 'relative', borderRadius: 2,}}>
                                        <Image 
                                            src={product?.image} 
                                            layout='responsive'
                                            height='100%'
                                            width='100%'
                                            alt={product?.title}
                                            style={{borderRadius: 6}}
                                        />
                                    </Box>) : (<Skeleton animation="wave"  variant="rectangular" sx={{ paddingTop: '100%', width: '100%', borderRadius: 2}} />)}
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Grid container columnSpacing={4}>
                                            <Grid item xs={12} md={7}>
                                                <Stack spacing={2}>
                                                    <Stack spacing={1}>
                                                        {!loadingProduct ? (<Typography variant="h6" component='h1'>{product?.title}</Typography>) : (<Skeleton width="70%" />)}
                                                        {!loadingProduct ? (<Typography variant="caption">{`Sold By: ${product?.sold_by}`}</Typography>) : (<Skeleton width="40%" />)}
                                                    </Stack>
                                                    <Divider/>
                                                    <Box sx={{backgroundColor: '#f48e21', borderRadius: 2}}>
                                                        <Stack sx={{padding: 1}}>
                                                            <Stack direction='row' spacing={1}>
                                                                <CategoryOutlinedIcon sx={{color: 'white', fontSize: 20}} />
                                                                {!loadingProduct ? (<Typography sx={{color: 'white'}} variant="subtitle2">{product?.product_category}</Typography>) : (<Skeleton width="30%" />)}
                                                            </Stack>
                                                        </Stack>
                                                        <Stack sx={{padding: 0.2}}>
                                                            <Paper sx={{padding: 2, borderBottomLeftRadius: 6, borderBottomRightRadius: 6}} elevation={0} square>
                                                                <Stack>
                                                                    {!loadingProduct ? (<Typography variant="h4">{`${product?.local_currency}${numeral(product?.local_price).format('0,0')}`}</Typography>) : (<Skeleton width="50%" sx={{paddingTop: 4}} />)}
                                                                    <Box>
                                                                        {!loadingProduct ? (<Typography sx={{backgroundColor: colors.blue[50], padding: 0.5, color: colors.blue[500]}} variant="caption">{product?.product_status}</Typography>) : (<Skeleton width="30%" />)}
                                                                    </Box>
                                                                    {!loadingProduct ? (<Typography variant="caption">{product?.status_description}</Typography>) : (<Skeleton width="45%" />)}
                                                                </Stack>
                                                            </Paper>
                                                        </Stack>
                                                    </Box>
                                                    <Link href={whatsappLink} underline='none' target="_blank" rel="noopener">
                                                        <Box sx={{width: '100%', paddingBottom: 2}}>
                                                            <Button startIcon={<WhatsAppOutlined />} sx={{backgroundColor: '#25D366'}} fullWidth  variant="contained" size='small'>Order on WhatsApp</Button>
                                                        </Box>
                                                    </Link>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {product?.is_sponsored ? (<Typography variant="subtitle1" gutterBottom>Sponsored By:</Typography>) : (<Typography variant="subtitle1" gutterBottom>Promoted By:</Typography>)}
                                                <Stack direction='row' spacing={1}>
                                                <Box>
                                                    <Avatar  src={profile?.profile_avatar} />
                                                </Box>
                                                <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'start', justifyContent: 'start', width: '100%'}}>
                                                    <Stack spacing={-0.5}>
                                                        <Stack spacing={0.5} direction='row'>
                                                            {!loadingProfile ? (<Typography variant='subtitle2'>{profile?.stage_name}</Typography>) : (<Typography variant='subtitle2'>Loading profile...</Typography>)}
                                                            {profile?.is_verified == "True" && <CheckCircleFilled style={{ fontSize: 13, color: theme.myColors.textDark }} />}                   
                                                        </Stack>
                                                        {!loadingProfile ? (<Typography variant='caption'>{profile?.role}</Typography>) : (<Skeleton width="40%" />)}
                                                    </Stack>
                                                </Box>
                                                </Stack>
                                                <Box sx={{width: '100%', paddingTop: 1}}>
                                                    <Button disabled startIcon={<FavoriteBorderOutlinedIcon />} fullWidth variant="contained" size='small'>Join Fanbase</Button>
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
                                            {!loadingProduct ? (<Typography variant="body1">{product?.description}</Typography>) : (<Skeleton width="80%" />)}
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            {/* Upsell Products Carousel */}
                            <Box>
                                <UpsellProductsCarousel
                                promoter={profile?.stage_name}
                                upsellProducts={upsellProducts}
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

    </NavigationLayout2>
  )
}

export default ProductPage