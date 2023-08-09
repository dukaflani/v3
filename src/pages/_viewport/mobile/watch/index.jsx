// React Imports
import { useState, useEffect } from 'react';

// NextJs Imports
import Head from 'next/head'
import Image from "next/legacy/image";
import { useRouter } from 'next/router';

// TanStack/React-Query
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// NPM Imports
import { useDispatch, useSelector } from 'react-redux';
import numeral from 'numeral';
import { formatDistanceStrict } from 'date-fns'
import Linkify from 'react-linkify';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// MUI Imports
import { Box, Container, Paper, Skeleton, Tab, Tabs, Typography, Tooltip,
    Stack, Avatar, Button, Grid, Drawer, Divider, IconButton, colors, useMediaQuery } from '@mui/material'

// Icons
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import PhonelinkRingOutlinedIcon from '@mui/icons-material/PhonelinkRingOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CastConnectedOutlinedIcon from '@mui/icons-material/CastConnectedOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { RadioOutlined } from '@mui/icons-material';

// Project Imports
import adPoster from '../../../../../public/assets/media/dukaflani-advert-poster.jpg'
import { getCurrentVideo, getCurrentVideoUserProfile, getCurrentVideoStreamingLinks, 
    getCurrentVideoProduct, getCurrentVideoLyrics, getCurrentVideoLyricsVerses,
    getCurrentVideoSkizaTuneList, getCurrentVideoAlbum, getCurrentVideoAlbumTracks,
    getCurrentVideoEvents, getCurrentVideoMediaTours, addView } from '@/axios/axios';
import { pageHasChanged } from '@/redux/features/navigation/navigationSlice';

// Components
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'
import TabStreamingLinks from '@/components/reusableComponents/TabStreamingLinks';
import TabProductCard from '@/components/reusableComponents/TabProductCard';
import TabLyricsCard from '@/components/reusableComponents/TabLyricsCard';
import TabSkizaCards from '@/components/reusableComponents/TabSkizaCards';
import TabAlbumCard from '@/components/reusableComponents/TabAlbumCard';
import TabEventsCards from '@/components/reusableComponents/TabEventsCards';
import TabMediaTourCard from '@/components/reusableComponents/TabMediaTourCard';
import MoreVideos from '@/components/reusableComponents/MoreVideos';
import Copyright from '@/components/reusableComponents/Copyright';


export const getServerSideProps = async (cxt) => {
    const { query } = cxt
    const video_youtube_id = query?.v

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(["current-video", video_youtube_id], (video_youtube_id) => getCurrentVideo(video_youtube_id))


    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    }

}




const CurrentVideo = ({ setIsDarkMode, isDarkMode }) => {
    const is_darkMode = useSelector((state) => state.theme.isDarkMode)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const referralURL = useSelector((state) => state.navigation.referralURL)
    const isRegularPageView = useSelector((state) => state.navigation.isRegularView)
    const router = useRouter()
    const dispatch = useDispatch()
    const { v, UserCountry, UserIP  } = router.query
    const [tabPosition, setTabPosition] = useState(0)
    const [showSongDetails, setShowSongDetails] = useState(false)
    const [showMoreVideos, setShowMoreVideos] = useState(false)
    const [linkCopied, setLinkCopied] = useState(false)
    const [shareButtonText, setShareButtonText] = useState('Share')
    const [numberOfLikes, setNumberOfLikes] = useState('') 
    const [numberOfUnlikes, setNumberOfUnlikes] = useState('')  
    const [is_liked, setIs_liked] = useState(false)
    const [is_unliked, setIs_unliked] = useState(false)
    const [user_country, setUser_country] = useState(null)
    const [user_ip, setUser_ip] = useState(null)
    const [referrer_url, setReferrer_url] = useState(null)

    useEffect(() => {
        if (linkCopied) {
            setShareButtonText('Copied!')
            setTimeout(() => {
                setShareButtonText('Share')
                setLinkCopied(false)
            }, 2000);    
        }
    }, [linkCopied])


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


    const handleChange = (event, newValue) => {
        setTabPosition(newValue);
      };


    const queryClient = useQueryClient()
    const { data, isLoading: loading_current_video } = useQuery(["current-video", v], (v) => getCurrentVideo(v))
    
    // const { data, isLoading: loading_current_video } = useQuery(["current-video", v], (v) => getCurrentVideo(v), {
    //     initialData: () => {
    //         const video = queryClient.getQueryData(["videos-list"])?.pages[0]?.find(video => video.youtube_id === v)
    //         if(video) {
    //             return video
    //         } else {
    //             return undefined
    //         }
    //     }
    // })

    // Referral Views
    const newView = { 
        video: data?.id,
        ip_address: user_ip,
        country: user_country,
        referral_url: referrer_url,
        video_profile: data?.customuserprofile,
      }


  const { mutate: addViewFromReferral } = useMutation(addView, { 
    onSuccess: (data, _variables, _context) => {
      queryClient.invalidateQueries(["videos-list"])
      queryClient.invalidateQueries(["current-video", data.youtube_id])
      setReferrer_url(null)
    },
    onError: (error, _variables, _context) => {
        // console.log("referrer error:", error)
    }
   })

   const handleReferredView = () => {
        addViewFromReferral(newView)
   }
   

   useEffect(() => {
    const addMyReferralView = () => {
        if (referrer_url?.length > 1 && data?.id >= 1 && data?.customuserprofile >= 1 && user_ip?.length > 1 && user_country?.length > 1) {
            handleReferredView()
        }
    };
    addMyReferralView();
   }, [referrer_url, data?.id, data?.customuserprofile, user_ip, user_country])




    const videoProfileUserID = data?.user
    const { data: profile, isLoading, isFetching } = useQuery(["current-video-profile", videoProfileUserID], (videoProfileUserID) => getCurrentVideoUserProfile(videoProfileUserID), {
        enabled: !!videoProfileUserID
    })
    
    const videoLinksID = data?.links 
    const { data: streamingLinks, isLoading: loadingLinks } = useQuery(["current-video-streaming-links", videoLinksID], (videoLinksID) => getCurrentVideoStreamingLinks(videoLinksID), {
        enabled: !!videoLinksID
    })
    
    const videoProductID = data?.product 
    const { data: product, isLoading: loadingProduct } = useQuery(["current-video-product", videoProductID], (videoProductID) => getCurrentVideoProduct(videoProductID), {
        enabled: !!videoProductID
    })
    
    const videoLyricsID = data?.lyrics
    const { data: lyrics, isLoading: loadingLyrics } = useQuery(["current-video-lyrics", videoLyricsID], (videoLyricsID) => getCurrentVideoLyrics(videoLyricsID), {
        enabled: !!videoLyricsID
    })
    
    const videoLyricsVersesID = data?.lyrics 
    const { data: lyrics_verses, isLoading: loadingLyricVerse } = useQuery(["current-video-lyrics-verses", videoLyricsVersesID], (videoLyricsVersesID) => getCurrentVideoLyricsVerses(videoLyricsVersesID), {
        enabled: !!videoLyricsVersesID
    })
    
    const videoSkizaID = data?.skiza 
    const { data: skiza_list, isLoading: loadingSkiza } = useQuery(["current-video-skiza-list", videoSkizaID], (videoSkizaID) => getCurrentVideoSkizaTuneList(videoSkizaID), {
        enabled: !!videoSkizaID
    })
    
    const videoAlbumID = data?.album 
    const { data: album, isLoading: loadingAlbum } = useQuery(["current-video-album", videoAlbumID], (videoAlbumID) => getCurrentVideoAlbum(videoAlbumID), {
        enabled: !!videoAlbumID
    })
    
    const videoAlbumTracksID = data?.album 
    const { data: albumTracks, isLoading: loadingTracks } = useQuery(["current-video-album-tracks", videoAlbumTracksID], (videoAlbumTracksID) => getCurrentVideoAlbumTracks(videoAlbumTracksID), {
        enabled: !!videoAlbumTracksID
    })
    
    const videoUserID = data?.user 
    const { data: events, isLoading: loadingEvents } = useQuery(["current-video-events", videoUserID], (videoUserID) => getCurrentVideoEvents(videoUserID), {
        enabled: !!videoUserID
    })
    const { data: mediaTours, isLoading: loadingMediaTours } = useQuery(["current-video-media-tours", videoUserID], (videoUserID) => getCurrentVideoMediaTours(videoUserID), {
        enabled: !!videoUserID
    })

    
    const uploadDate = data?.date ? data?.date : new Date()

    const videoUploadTime = formatDistanceStrict(
        new Date(uploadDate),
        new Date(),
        {
          addSuffix: true,
        },
      );

    const rawFanBaseCount = profile?.fanbase_count ? profile?.fanbase_count : 0
    let formatedFanBaseCount = ''
    rawFanBaseCount < 1000 || rawFanBaseCount % 10 === 0 ? formatedFanBaseCount = numeral(rawFanBaseCount).format('0a') :  formatedFanBaseCount = numeral(rawFanBaseCount).format('0.0a')

    const rawLikesCount = data?.like_count ? data?.like_count : 0
    let formatedLikesCount = ''
    rawLikesCount < 1000 || rawLikesCount % 10 === 0 ? formatedLikesCount = numeral(rawLikesCount).format('0a') :  formatedLikesCount = numeral(rawLikesCount).format('0.0a')


    const rawViewCount = data?.views_count ? data?.views_count : 0
    let formatedViewCount = ''
    rawViewCount < 1000 || rawViewCount % 10 === 0 ? formatedViewCount = numeral(rawViewCount).format('0a') :  formatedViewCount = numeral(rawViewCount).format('0.0a')


    const desc = data?.description
    const hashTags = desc?.split(' ')
    const hashTagRegex = /#[a-z0-9_]+/gi 


  return (
    <>
    <MobileNavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} >
        <Head>
            <title>{loading_current_video ? "Loading video..." : `Get The ${data?.song_title} Song's Merchandise, Streaming/Download Links, Lyrics, Skiza Tunes, Album and Events by ${data?.stage_name} - Dukaflani`}</title>
            <meta name="title" content={`Get ${data?.song_title} Song's Merchandise, Streaming/Download Links, Lyrics, Skiza Tunes, Album and Events by ${data?.stage_name} - Dukaflani`} />
            <meta name="description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
            <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>
        </Head>
        <Paper sx={{ minHeight: '100vh', paddingTop: 5, paddingBottom: 10}}>
            <Box sx={{position: 'sticky', top: 48, zIndex: 99}} >
                <Box sx={{backgroundColor: 'black', width: '100%'}}>
                    <Container disableGutters maxWidth='sm'>
                        {data?.youtube_embed_link ? (<Box sx={{position: 'relative', paddingBottom: '56.25%'}}>
                            <iframe width='100%' height='100%' src={data?.youtube_embed_link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </Box>) : (<Skeleton animation="wave"  variant="rectangular" sx={{ paddingTop: '56.25%', width: '100%'}} />)}
                    </Container>
                </Box>
                <Paper elevation={0} square sx={{display: 'flex', justifyContent: 'center'}}>
                    <Tabs
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        value={tabPosition}
                        onChange={handleChange}
                        sx={{}}
                    >
                        <Tab icon={<CastConnectedOutlinedIcon />} iconPosition='start' label="Stream" />
                        <Tab icon={<ShoppingBasketOutlinedIcon />} iconPosition='start' label="Shop" />
                        <Tab icon={<MicNoneOutlinedIcon />} iconPosition='start' label="Lyrics" />
                        <Tab icon={<PhonelinkRingOutlinedIcon />} iconPosition='start' label="Skiza Tunes" />
                        <Tab icon={<LibraryMusicOutlinedIcon />} iconPosition='start' label="Album" />
                        <Tab icon={<EventAvailableOutlinedIcon />} iconPosition='start' label="Events" />
                        <Tab icon={<RadioOutlined />} iconPosition='start' label="Media" />
                    </Tabs>
                </Paper>
            <Divider/>
            </Box>
            <Container sx={{paddingTop: 3}} maxWidth='sm'>
                <Stack spacing={1.5}>
                    <Box onClick={() => setShowSongDetails(true)}>
                    {data?.title ? (<Typography gutterBottom sx={{lineHeight: 1, fontWeight: "bold", color: colors.grey[100]}} variant='subtitle1' component='h1'>{data?.title}</Typography>) : (<Skeleton width="80%" />)}
                    <Stack sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}} direction='row' spacing={1}>
                            {data?.genre_title ? (<Typography sx={{color: '#1976d2'}} variant='button'>{data?.genre_title}</Typography>) : (<Skeleton width="10%" />)}
                            {data?.views_count ? (<Typography variant='caption'>{formatedViewCount} {data?.views_count == 1 ? 'view' : 'views'}</Typography>) : (<Skeleton width="10%" />)}
                            {data?.date ? (<Typography variant='caption'>{videoUploadTime}</Typography>) : (<Skeleton width="15%" />)}
                            <Typography variant='subtitle2'>more...</Typography>
                        </Stack>
                    </Box>
                    <Stack spacing={2}>
                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                            {data?.profile_avatar ? (<Box onClick={() => {
                                        router.push({ pathname: `/${data?.username}` })
                                        dispatch(pageHasChanged(true))
                                        }} ><Avatar  src={data?.profile_avatar} alt={data?.stage_name} /></Box>) : (<Skeleton animation="wave" variant="circular" width={40} height={40} />)}
                            <Box 
                                onClick={() => {
                                        router.push({ pathname: `/${data?.username}` })
                                        dispatch(pageHasChanged(true))
                                        }} 
                                sx={{paddingX: 1, display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                <Stack spacing={0.5} direction='row'>
                                    {data?.stage_name ? (<Box ><Typography className="line-clamp-1 line-clamp" variant='subtitle2'>{data?.stage_name}</Typography></Box>) : (<Skeleton width="100%" />)}
                                    {data?.verified && <CheckCircleIcon sx={{ fontSize: 13, color: colors.grey[100]}} />}
                                </Stack>
                            </Box>
                            <Box sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'start', paddingX: 1}}>
                                <Typography variant='caption'>{isLoading ? '--' :  `${formatedFanBaseCount}`}</Typography>
                            </Box>
                            <IconButton disabled>
                                <FavoriteBorderOutlinedIcon fontSize='small' />
                            </IconButton>
                        </Box>
                        <Box>
                            {formatedLikesCount && <Stack direction='row' spacing={2}>
                                <Paper variant='outlined'  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', paddingY: 1, paddingX: 1.5, borderRadius: 10, }}>
                                    <Stack spacing={2} direction='row'>
                                        <Tooltip placement="top" title='I like'>
                                            <Stack direction='row' spacing={1} sx={{cursor: 'pointer'}}>
                                                <ThumbUpOutlinedIcon sx={{fontSize: 19}} />
                                                {formatedLikesCount && <Typography sx={{ fontWeight:'bold' }} variant='body2'>{formatedLikesCount}</Typography>}
                                            </Stack>
                                        </Tooltip>
                                        <Divider orientation="vertical" variant="middle" flexItem />
                                        <Tooltip placement="top" title="I don't like"><ThumbDownOutlinedIcon sx={{fontSize: 19, cursor: 'pointer'}} /></Tooltip>
                                    </Stack>
                                </Paper>
                                <Paper variant='outlined' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', paddingY: 1, paddingX: 1.5, borderRadius: 10, cursor: 'pointer'}}>
                                    <Stack spacing={2} direction='row'>
                                    <CopyToClipboard
                                            text={`https://${data?.video_username}.duka.to/${data?.slug}`}
                                            onCopy={() => setLinkCopied(true)}
                                    >
                                        <Tooltip placement="top" title='Share'>
                                                <Stack direction='row' spacing={1}>
                                                    <ShareOutlinedIcon sx={{fontSize: 19}} />
                                                    <Typography sx={{ fontWeight:'bold' }} variant='body2'>{shareButtonText}</Typography>
                                                </Stack>
                                        </Tooltip>
                                    </CopyToClipboard>
                                    </Stack>
                                </Paper>
                            </Stack>}
                        </Box>
                        <Paper variant='outlined' sx={{ padding: 1 }}>
                            <Stack>
                                <Typography variant='subtitle2'>SPONSORED:</Typography>
                                <Grid direction='row' container columnSpacing={1}>
                                    <Grid xs={4} item>
                                        <Box sx={{ width: '100%', borderRadius: 2, position: "relative", cursor:'pointer', backgroundColor: colors.grey[100]}}>
                                            <Image 
                                                src={adPoster} 
                                                layout='responsive'
                                                alt={`Ad poster by Dukaflani Ads`}
                                                style={{borderRadius: 6}}
                                                />
                                        </Box>
                                    </Grid>
                                    <Grid xs={6.5} item>
                                        <Stack>
                                            <Typography sx={{lineHeight: 1}} gutterBottom variant='subtitle2'>Get the &quot;Everything Link&quot; for your music with Dukaflani</Typography>
                                            <Stack spacing={1.5}>
                                                <Stack direction="row" spacing={0.5}>
                                                    <Typography sx={{fontSize: 12, backgroundColor: 'yellow', color: colors.grey[800]}} className="line-clamp-1 line-clamp" variant='caption'>Ad</Typography>
                                                    <Typography sx={{fontSize: 12, color: 'GrayText'}} className="line-clamp-1 line-clamp" variant='caption'>Dukaflani Ads</Typography>
                                                </Stack>
                                                <Button startIcon={<InfoOutlinedIcon/>} onClick={() => {
                                                    dispatch(pageHasChanged(true))
                                                    router.push({ pathname: '/links/contact_us' })
                                                    }} variant='text' size='small'>Learn More</Button>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid xs={1.5} item>
                                        <Box onClick={() => {
                                            dispatch(pageHasChanged(true))
                                            router.push({ pathname: '/links/contact_us' })
                                            }}>
                                            <OpenInNewOutlinedIcon />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Paper>
                    </Stack>
                    <Box sx={{paddingTop: 2}}>
                        {
                            {
                                0: <TabStreamingLinks loadingLinks={loadingLinks} streamingLinks={streamingLinks} data={data} youtubeID={v} />,
                                1: <TabProductCard loadingProduct={loadingProduct} product={product} data={data} />,
                                2: <TabLyricsCard loadingLyrics={loadingLyrics} loadingLyricVerse={loadingLyricVerse}  data={data} lyrics={lyrics} verses={lyrics_verses}  />,
                                3: <TabSkizaCards loadingSkiza={loadingSkiza} data={data} skiza={skiza_list}   />,
                                4: <TabAlbumCard loadingAlbum={loadingAlbum} loadingTracks={loadingTracks}  data={data} album={album} albumTracks={albumTracks}  />,
                                5: <TabEventsCards loadingEvents={loadingEvents}  data={data} events={events} videoUserID={videoUserID} />,
                                6: <TabMediaTourCard loadingMediaTours={loadingMediaTours} data={data} mediaTours={mediaTours} />,
                            }[tabPosition]
                        }
                    </Box>
                </Stack>
            </Container>
            <Box sx={{padding: 1, textAlign: 'center'}}>
                {
                    {
                        0: <Typography variant='caption'>Terms & Conditions Apply</Typography>,
                        1: <Typography variant='caption'>{`Sold by ${product?.sold_by}`}</Typography>,
                        2: <Typography variant='caption'>&copy; {new Date().getFullYear()} {`${data?.stage_name}. All Rights Reserved`}</Typography>,
                        3: <Typography variant='caption'>Terms & Conditions Apply</Typography>,
                        4: <Typography variant='caption'>&copy; {new Date().getFullYear()} {`${data?.stage_name}. All Rights Reserved`}</Typography>,
                        5: <Typography variant='caption'>Terms & Conditions Apply</Typography>,
                        6: <Typography variant='caption'>Terms & Conditions Apply</Typography>,
                    }[tabPosition]
                }
            </Box>
        </Paper>
        <Container sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99}} maxWidth='sm'>
            <Paper elevation={0} square sx={{width: '100%', paddingBottom: 2}}>
                <Button onClick={() => setShowMoreVideos(true)} startIcon={<OndemandVideoOutlinedIcon />} fullWidth  variant="contained" size='medium'>Show more Links</Button>
            </Paper>
        </Container>
    </MobileNavigationLayout>

    {/* Song Details Drawer */}
    <Box> 
        <Drawer
             open={showSongDetails}
             onClose={() => setShowSongDetails(false)}
             anchor='bottom'
        >
            <Box>
                <Container sx={{height: '60vh'}} maxWidth='sm'>
                    <Stack spacing={2}>
                        <Box sx={{paddingTop: 3, position: 'sticky', top: 0, zIndex: 99999}}>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                                {/* <Typography variant='subtitle1'>INFO:</Typography> */}
                                <Box onClick={() => setShowSongDetails(false)}>
                                    <CloseOutlinedIcon />
                                </Box>
                            </Box>
                            {/* <Divider/> */}
                        </Box>
                        <Box sx={{zIndex: 9}}>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <Box sx={{textAlign: 'center'}}>
                                    {data?.views_count ? (<Typography variant='subtitle2'>{numeral(data?.views_count).format('0,0')}</Typography>) : (<Skeleton width="10%" />)}
                                    <Typography variant='caption'>{data?.views_count == 1 ? 'view' : 'views'}</Typography>
                                </Box>
                                <Box sx={{textAlign: 'center'}}>
                                    <Typography variant='subtitle2'>{formatedLikesCount}</Typography>
                                    <Typography variant='caption'>{data?.like_count == 1 ? 'like' : 'likes'}</Typography>
                                </Box>
                                <Box sx={{textAlign: 'center'}}>
                                    <Typography variant='subtitle2'>{new Date(data?.date).toDateString()}</Typography>
                                    <Typography variant='caption'>added</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Divider/>
                        <Box>
                            <Typography variant='body2'>{data?.description}</Typography>
                        </Box>
                    </Stack>
                    {/* Copyright */}
                    <Box>
                        <Copyright/>
                    </Box>
                </Container>
            </Box>
        </Drawer>
    </Box>

    {/* Show More Videos Drawer */}
    <Box>
        <Drawer
             open={showMoreVideos}
             onClose={() => setShowMoreVideos(false)}
             anchor='bottom'
        >
            <Box>
                <Container sx={{ height: '60vh'}} maxWidth='sm'>
                    <Stack>
                        <Box sx={{paddingTop: 3, position: 'sticky', top: 0, zIndex: 99}}>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                                {/* <Typography variant='subtitle1'>MORE LINKS:</Typography> */}
                                <Box onClick={() => setShowMoreVideos(false)}>
                                    <CloseOutlinedIcon />
                                </Box>
                            </Box>
                            {/* <Divider/> */}
                        </Box>
                        <Box onClick={() => setShowMoreVideos(false)}>
                            <MoreVideos setShowMoreVideos={setShowMoreVideos} />
                        </Box>
                        {/* Copyright */}
                        <Box>
                            <Copyright/>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </Drawer>
    </Box>
    </>
  )
}

export default CurrentVideo