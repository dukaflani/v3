// React Imports
import { useState, useEffect } from 'react';

// Nextjs Imports
import Head from "next/head"
import Image from "next/legacy/image";
import { useRouter } from "next/router";

//MUI Imports
import { Avatar, Box, Button, colors, Container, Divider, Grid, Link, Paper, Stack, Skeleton, Typography, 
    useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// NPM Imports
import numeral from 'numeral';
import { useDispatch, useSelector } from "react-redux";

// Icons
import { AppstoreOutlined, WhatsAppOutlined, CheckCircleFilled, FireOutlined } from "@ant-design/icons";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

// TanStack/React-Query
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Project Imports
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'
import UpsellProductsCarousel from '@/components/reusableComponents/UpsellProductsCarousel'
import Copyright from '@/components/reusableComponents/Copyright'
import { addProductView, getCurrentVideoProduct, getCurrentVideoUserProfile, getUpsellProducts } from "@/axios/axios";
import { pageHasChanged } from "@/redux/features/navigation/navigationSlice";


const ProductPageMobile = ({ setIsDarkMode, isDarkMode }) => {
    const is_darkMode = useSelector((state) => state.theme.isDarkMode)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const referralURL = useSelector((state) => state.navigation.referralURL)
    const isRegularPageView = useSelector((state) => state.navigation.isRegularView)
    const theme = useTheme()
    const router = useRouter()
    const dispatch = useDispatch()
    const { productid, UserCountry, UserIP  } = router.query
    const [user_country, setUser_country] = useState(null)
    const [user_ip, setUser_ip] = useState(null)
    const [referrer_url, setReferrer_url] = useState(null)


    useEffect(() => {
        if (referralURL?.split(".")?.includes("dukaflani") || isRegularPageView === true ) {
            setUser_country(UserCountry)
            setUser_ip(UserIP)
            setReferrer_url(null)  
        } else {
            setUser_country(UserCountry)
            setUser_ip(UserIP)
            setReferrer_url(referralURL)
        }
      }, [referralURL, UserCountry, UserIP, isRegularPageView])


    const queryClient = useQueryClient()
    const videoProductID = productid 
    const { data: product, isLoading: loadingProduct } = useQuery(["current-video-product", videoProductID], (videoProductID) => getCurrentVideoProduct(videoProductID), {
        initialData: () => {
            const videoProduct = queryClient.getQueryData(["current-video-product", Number(videoProductID)])
            if(videoProduct) {
                return videoProduct
            } else {
                return undefined
            }
        },
        enabled: !!videoProductID
    })


    const publisherUserID = product?.user 
    const { data: profile, isLoading: loadingProfile, isFetching } = useQuery(["current-video-profile", publisherUserID], (publisherUserID) => getCurrentVideoUserProfile(publisherUserID), {
        enabled: !!publisherUserID
    })
    
    const { data: upsellProducts } = useQuery(["upsell-products", publisherUserID], (publisherUserID) => getUpsellProducts(publisherUserID), {
        enabled: !!publisherUserID
    })
    
    const msg = `Hello ${product?.promoted_by}, I'm interested in the ${product?.title} from ${product?.sold_by} on dukaflani.com`
    const msg2 = msg.replace(/ /g, "%20")
    const whatsappLink = `https://wa.me/${product?.whatsapp}?text=${msg2}`


    const newProductView = {
        product: product?.id,
        product_profile: product?.customuserprofile,
        ip_address: user_ip,
        country: user_country,
        referral_url: referrer_url,
    }

    const { mutate: addNewReferredProductView } = useMutation(addProductView, {
        onSuccess: (data, _variables, _context) => {
        //   console.log("Reffered product view success:", data)
        },
        onError: (error, _variables, _context) => {
        //   console.log("Reffered product view error:", error)
        },
      })


      const handleReferredView = () => {
        addNewReferredProductView(newProductView)
   }
   

   useEffect(() => {
    const addMyReferralView = () => {
        if (referrer_url?.length > 1 && product?.id >= 1 && product?.customuserprofile >= 1 && user_ip?.length > 1 && user_country?.length > 1) {
            handleReferredView()
        }
    };
    addMyReferralView();
   }, [referrer_url, product?.id, product?.customuserprofile, user_ip, user_country])




  return (
    <MobileNavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} >
        <Head>
            <title>{`Buy ${product?.title} - ${product?.local_currency}${numeral(product?.local_price).format('0,0')} | Dukaflani Shopping`}</title>
            <meta name="title" content={`Buy ${product?.title} - ${product?.local_currency}${numeral(product?.local_price).format('0,0')} | Dukaflani Shopping`} />
            <meta name="description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
            <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>
        </Head>
        <Paper sx={{ minHeight: '100vh', paddingY: 5}}>
            <Container maxWidth='lg'>
                <Box>
                    <Grid container sx={{paddingTop: 5}} rowSpacing={3}>
                        <Grid item xs={12}>
                            <Paper variant="outlined" square sx={{padding: 2}}>
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
                                                    {/* <Box sx={{width: '100%', paddingBottom: 2}}>
                                                        <Button startIcon={<WhatsAppOutlined />} sx={{backgroundColor: '#25D366'}} fullWidth  variant="contained" size='small'>Order on WhatsApp</Button>
                                                    </Box> */}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {product?.is_sponsored ? (<Typography variant="subtitle1" gutterBottom>Sponsored By:</Typography>) : (<Typography variant="subtitle1" gutterBottom>Promoted By:</Typography>)}
                                                <Stack direction='row' spacing={1}>
                                                <Box onClick={() => {
                                                        dispatch(pageHasChanged(true))
                                                        router.push({ pathname: `/${profile?.username}` })
                                                        }}>
                                                    <Avatar  src={profile?.profile_avatar} />
                                                </Box>
                                                <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'start', justifyContent: 'start'}}>
                                                    <Stack spacing={-0.5}>
                                                        <Stack onClick={() => {
                                                            dispatch(pageHasChanged(true))
                                                            router.push({ pathname: `/${profile?.username}` })
                                                            }} spacing={0.5} direction='row'>
                                                            {!loadingProfile ? (<Box><Typography variant='subtitle2'>{profile?.stage_name}</Typography></Box>) : (<Typography variant='subtitle2'>Loading profile...</Typography>)}
                                                            {profile?.is_verified == "True" && <CheckCircleFilled style={{ fontSize: 13, color: colors.grey[100]}} />}                   
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
                            <Paper variant="outlined" square>
                                <Stack>
                                    <Box sx={{padding: 1.5}}>
                                        <Typography variant="h6">View details</Typography>
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
        </Paper>
        <Container sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99}} maxWidth='lg'>
        <Link href={whatsappLink} underline='none' target="_blank" rel="noopener">
            <Paper elevation={0} square sx={{width: '100%', paddingBottom: 2}}>
                <Button startIcon={<WhatsAppOutlined />} sx={{backgroundColor: '#25D366'}} fullWidth  variant="contained" size='medium'>Order on WhatsApp</Button>
            </Paper>
        </Link>
        </Container>
    </MobileNavigationLayout>
  )
}

export default ProductPageMobile