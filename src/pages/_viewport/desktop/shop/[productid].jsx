// React Imports
import { useState, useEffect } from 'react';

// Nextjs Imports
import Head from "next/head"
import Image from "next/legacy/image";
import { useRouter } from "next/router";

//MUI Imports
import { Avatar, Box, Button, colors, Container, Divider, Grid, Link, Paper, Skeleton, Stack, Typography, useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// NPM Imports
import { useDispatch, useSelector } from "react-redux";
import numeral from 'numeral';

// Icons
import { WhatsAppOutlined, FireOutlined } from "@ant-design/icons";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

// TanStack/React-Query
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Project imports
import NavigationLayout2 from '@/layout/desktop/NavigationLayout2'
import UpsellProductsCarousel from '@/components/reusableComponents/UpsellProductsCarousel'
import Copyright from '@/components/reusableComponents/Copyright'
import { addProductView, checkFanbase, getCurrentVideoProduct, getCurrentVideoUserProfile, getUpsellProducts, joinFanbase, leaveFanbase } from "@/axios/axios";
import { pageHasChanged } from "@/redux/features/navigation/navigationSlice";



const ProductPage = ({ setIsDarkMode, isDarkMode, ssrProductID }) => {
    const currentLoggedInUser = useSelector((state) => state.auth.userInfo)
    const accessToken = useSelector((state) => state.auth.token)
    const is_darkMode = useSelector((state) => state.theme.isDarkMode)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const referralURL = useSelector((state) => state.navigation.referralURL)
    const isRegularPageView = useSelector((state) => state.navigation.isRegularView)
    const router = useRouter()
    const dispatch = useDispatch()
    const { productid, UserCountry, UserIP  } = router.query

    const [is_aFan, setIs_aFan] = useState(false)
    const [fanbase_count, setFanbase_count] = useState(0)
    const [userFanObject, setUserFanObject] = useState(null)

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
        onSuccess: (data, _variables, _context) => {
            setFanbase_count(data?.fanbase_count)
        },
        enabled: !!publisherUserID
    })
    
    const { data: upsellProducts } = useQuery(["upsell-products", publisherUserID], (publisherUserID) => getUpsellProducts(publisherUserID), {
        enabled: !!publisherUserID
    })

    const videoProfileID = {
        profileId: profile?.id,
        userId: currentLoggedInUser?.id
    }
    
    const { data: fanbase } = useQuery(["retrieve-fanbase-object", videoProfileID], (videoProfileID) => checkFanbase(videoProfileID), {
        onSuccess: (data, _variables, _context) => {
            setUserFanObject(data)
        },
        enabled: !!currentLoggedInUser?.id && !!profile?.id
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

    //   console.log("referred view object:", newProductView)

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


   // const rawFanBaseCount = profile?.fanbase_count ? profile?.fanbase_count : 0
   let formatedFanBaseCount = ''
   fanbase_count < 1000 || fanbase_count % 10 === 0 || fanbase_count === 0 ? formatedFanBaseCount = numeral(fanbase_count).format('0a') :  formatedFanBaseCount = numeral(fanbase_count).format('0.0a')


   // Fanbase Fns

   const { mutate: addNewFan } = useMutation(joinFanbase, { 
    onSuccess: (data, _variables, _context) => {
      queryClient.invalidateQueries(["current-video-profile", publisherUserID])
      setIs_aFan(true)
      setUserFanObject(data)
    //   console.log("new fan added:", data)
    },
    onError: (error, _variables, _context) => {
        // console.log("new fan error:", error)
    }
   })

const { mutate: removeFan } = useMutation(leaveFanbase, {
    onSuccess: (data, _variables, _context) => {
        queryClient.invalidateQueries(["current-video-profile", publisherUserID])
        setIs_aFan(false)
    }
})



useEffect(() => {
    setFanbase_count(profile?.fanbase_count)
}, [profile?.fanbase_count])

useEffect(() => {
    if (fanbase?.id > 0) {
        setIs_aFan(true)
    } else {
        setIs_aFan(false)
    }
}, [fanbase?.id, productid])

const newFanDetails = {
    accessToken,
    customuserprofile: profile?.id,
}

const handleJoin = () => {
    addNewFan(newFanDetails)
    setIs_aFan(true)
    setFanbase_count(prevCount => prevCount + 1)
}


const userFanDetails = {
    accessToken,
    id: userFanObject?.id,
}

const handleLeave = () => {
    removeFan(userFanDetails)
    setIs_aFan(false)
    setFanbase_count(prevCount => prevCount - 1)
}



  return (
    <NavigationLayout2 setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} >
        <Head>
            <title>{`Buy ${product?.title} - ${product?.local_currency}${numeral(product?.local_price).format('0,0')} | Dukaflani Shopping`}</title>
            <meta name="title" content={`Buy ${product?.title} - ${product?.local_currency}${numeral(product?.local_price).format('0,0')} | Dukaflani Shopping`} />
            <meta name="description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
            <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>

            
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/shop/${product?.id}`} />
            <meta property="og:title" content={`Buy ${product?.title} - ${product?.local_currency}${numeral(product?.local_price).format('0,0')} | Dukaflani Shopping`} />
            <meta property="og:description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
            <meta 
                property="og:image" 
                // content={`${process.env.NEXT_PUBLIC_NEXT_URL}/api/og?stage_name=${data?.stage_name}&fanbase_count=${videoProfile?.fanbase_count}&song_title=${data?.song_title}&video_title=${data?.title}&avatar=${data?.profile_avatar}`} />
                content={product?.image} 
                />

            
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/shop/${product?.id}`} />
            <meta property="twitter:title" content={`Buy ${product?.title} - ${product?.local_currency}${numeral(product?.local_price).format('0,0')} | Dukaflani Shopping`} />
            <meta property="twitter:description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
            <meta 
                property="twitter:image" 
                // content={`${process.env.NEXT_PUBLIC_NEXT_URL}/api/og?stage_name=${data?.stage_name}&fanbase_count=${videoProfile?.fanbase_count}&song_title=${data?.song_title}&video_title=${data?.title}&avatar=${data?.profile_avatar}`} />
                content={product?.image} 
                />
      </Head>
        <Paper sx={{minHeight: '100vh', paddingTop: 5}}>
            <Container maxWidth='lg'>
                <Box>
                    <Grid container sx={{padding: 5}} rowSpacing={3}>
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
                                                    <Link href={whatsappLink} underline='none' target="_blank" rel="noopener">
                                                        <Box sx={{width: '100%', paddingBottom: 2}}>
                                                            <Button startIcon={<WhatsAppOutlined />} sx={{backgroundColor: '#25D366', "&:hover": {backgroundColor: '#07ab44'}}} fullWidth  variant="contained" size='small'>Order on WhatsApp</Button>
                                                        </Box>
                                                    </Link>
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
                                                <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'start', justifyContent: 'start', width: '100%'}}>
                                                    <Stack spacing={-0.5}>
                                                        <Stack onClick={() => {
                                                             dispatch(pageHasChanged(true))
                                                            router.push({ pathname: `/${profile?.username}` })
                                                            }} spacing={0.5} direction='row' sx={{cursor: 'pointer'}}>
                                                            {!loadingProfile ? (<Typography variant='subtitle2'>{profile?.stage_name}</Typography>) : (<Typography variant='subtitle2'>Loading profile...</Typography>)}
                                                            {profile?.is_verified == "True" && <CheckCircleIcon sx={{ fontSize: 15, color: colors.grey[100] }} />}                   
                                                        </Stack>
                                                        {!loadingProfile ? (<Typography variant='caption'>{profile?.role}</Typography>) : (<Skeleton width="40%" />)}
                                                    </Stack>
                                                </Box>
                                                </Stack>
                                                <Box sx={{width: '100%', paddingTop: 1}}>
                                                    {/* <Button disabled startIcon={<FavoriteBorderOutlinedIcon />} fullWidth variant="contained" size='small'>Join Fanbase</Button> */}
                                                    {currentLoggedInUser ? (<Box>
                                                        {is_aFan ?
                                                            <Button 
                                                                sx={{
                                                                    background: "linear-gradient(45deg, #FF3366 30%, #FF9933 90%)",
                                                                    borderRadius: "5px",
                                                                    border: 0,
                                                                    color: "white",
                                                                    transition: "box-shadow 0.3s ease-in-out",
                                                                }} 
                                                                startIcon={<FavoriteBorderOutlinedIcon/>} 
                                                                variant='contained' 
                                                                size='small'
                                                                fullWidth
                                                                onClick={handleLeave}
                                                                >Leave The Fanbase</Button>
                                                            :
                                                            <Button  
                                                                sx={{
                                                                    background: "linear-gradient(45deg, #2900be 30%, #b723d5 90%)",
                                                                    borderRadius: "5px",
                                                                    border: 0,
                                                                    color: "white",
                                                                    transition: "box-shadow 0.3s ease-in-out",
                                                                }} 
                                                                startIcon={<FavoriteIcon/>} 
                                                                variant='contained' 
                                                                size='small'
                                                                fullWidth
                                                                onClick={handleJoin}
                                                                >Join The Fanbase</Button>
                                                    }
                                                    </Box>) : (
                                                        <Box>
                                                            <Button  
                                                                sx={{
                                                                    background: "linear-gradient(45deg, #2900be 30%, #b723d5 90%)",
                                                                    borderRadius: "5px",
                                                                    border: 0,
                                                                    color: "white",
                                                                    transition: "box-shadow 0.3s ease-in-out",
                                                                }} 
                                                                startIcon={<FavoriteIcon/>} 
                                                                variant='contained' 
                                                                size='small'
                                                                fullWidth
                                                                onClick={() => router.push({ pathname: "/account/login" })}
                                                                >Join The Fanbase</Button>
                                                        </Box>
                                                    )}  
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

    </NavigationLayout2>
  )
}

export default ProductPage

