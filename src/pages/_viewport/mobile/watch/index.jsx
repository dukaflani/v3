// React Imports
import { useState, useEffect } from 'react';

// NextJs Imports
import Head from 'next/head'
import Image from "next/legacy/image";
import { useRouter } from 'next/router';

// TanStack/React-Query
import { useQuery, useQueryClient } from '@tanstack/react-query';

// NPM Imports
import numeral from 'numeral';
import { formatDistanceStrict } from 'date-fns'
import Linkify from 'react-linkify';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// MUI Imports
import { Box, Container, Paper, Skeleton, Tab, Tabs, Typography, Stack, Avatar, Button, Grid, Drawer, Divider, IconButton, colors } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Icons
import LinkIcon from '@mui/icons-material/Link';
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

// Project Imports
import adPoster from '../../../../../public/assets/media/dukaflani-advert-poster.jpg'
import { getCurrentVideo, getCurrentVideoUserProfile, getCurrentVideoStreamingLinks, 
    getCurrentVideoProduct, getCurrentVideoLyrics, getCurrentVideoLyricsVerses,
    getCurrentVideoSkizaTuneList, getCurrentVideoAlbum, getCurrentVideoAlbumTracks,
    getCurrentVideoEvents } from '@/axios/axios';

// Components
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'
import TabStreamingLinks from '@/components/reusableComponents/TabStreamingLinks';
import TabProductCard from '@/components/reusableComponents/TabProductCard';
import TabLyricsCard from '@/components/reusableComponents/TabLyricsCard';
import TabSkizaCards from '@/components/reusableComponents/TabSkizaCards';
import TabAlbumCard from '@/components/reusableComponents/TabAlbumCard';
import TabEventsCards from '@/components/reusableComponents/TabEventsCards';
import MoreVideos from '@/components/reusableComponents/MoreVideos';
import Copyright from '@/components/reusableComponents/Copyright';




const CurrentVideo = ({ setIsDarkMode, isDarkMode }) => {
    const theme = useTheme()
    const router = useRouter()
    const { v } = router.query
    const [tabPosition, setTabPosition] = useState(0)
    const [showSongDetails, setShowSongDetails] = useState(false)
    const [showMoreVideos, setShowMoreVideos] = useState(false)
    const [linkCopied, setLinkCopied] = useState(false)
    const [shareButtonText, setShareButtonText] = useState('Share')
    const [numberOfLikes, setNumberOfLikes] = useState('') 
    const [numberOfUnlikes, setNumberOfUnlikes] = useState('')  
    const [is_liked, setIs_liked] = useState(false)
    const [is_unliked, setIs_unliked] = useState(false)

    useEffect(() => {
        if (linkCopied) {
            setShareButtonText('Copied!')
            setTimeout(() => {
                setShareButtonText('Share')
                setLinkCopied(false)
            }, 2000);    
        }
    }, [linkCopied])



    const handleChange = (event, newValue) => {
        setTabPosition(newValue);
      };


    const queryClient = useQueryClient()
    const { data } = useQuery(["current-video", v], (v) => getCurrentVideo(v), {
        initialData: () => {
            const video = queryClient.getQueryData(["videos-list"])?.pages[0]?.find(video => video.youtube_id === v)
            if(video) {
                return video
            } else {
                return undefined
            }
        }
    })

    const videoProfileUserID = data?.user ? data?.user : 0
    const { data: profile, isLoading, isFetching } = useQuery(["current-video-profile", videoProfileUserID], (videoProfileUserID) => getCurrentVideoUserProfile(videoProfileUserID))
    
    const videoLinksID = data?.links ? data?.links : 0
    const { data: streamingLinks } = useQuery(["current-video-streaming-links", videoLinksID], (videoLinksID) => getCurrentVideoStreamingLinks(videoLinksID))
    
    const videoProductID = data?.product ? data?.product : 0
    const { data: product } = useQuery(["current-video-product", videoProductID], (videoProductID) => getCurrentVideoProduct(videoProductID))
    
    const videoLyricsID = data?.lyrics ? data?.lyrics : 0
    const { data: lyrics } = useQuery(["current-video-lyrics", videoLyricsID], (videoLyricsID) => getCurrentVideoLyrics(videoLyricsID))
    
    const videoLyricsVersesID = data?.lyrics ? data?.lyrics : 0
    const { data: lyrics_verses } = useQuery(["current-video-lyrics-verses", videoLyricsVersesID], (videoLyricsVersesID) => getCurrentVideoLyricsVerses(videoLyricsVersesID))
    
    const videoSkizaID = data?.skiza ? data?.skiza : 0
    const { data: skiza_list } = useQuery(["current-video-skiza-list", videoSkizaID], (videoSkizaID) => getCurrentVideoSkizaTuneList(videoSkizaID))
    
    const videoAlbumID = data?.album ? data?.album : 0
    const { data: album } = useQuery(["current-video-album", videoAlbumID], (videoAlbumID) => getCurrentVideoAlbum(videoAlbumID))
    
    const videoAlbumTracksID = data?.album ? data?.album : 0
    const { data: albumTracks } = useQuery(["current-video-album-tracks", videoAlbumTracksID], (videoAlbumTracksID) => getCurrentVideoAlbumTracks(videoAlbumTracksID))
    
    const videoUserID = data?.user ? data?.user : 0
    const { data: events } = useQuery(["current-video-events", videoUserID], (videoUserID) => getCurrentVideoEvents(videoUserID))

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
            <title>{`Get The ${data?.song_title} Song's Merchandise, Streaming/Download Links, Lyrics, Skiza Tunes, Album and Events by ${data?.stage_name} - Dukaflani`}</title>
            <meta name="title" content={`Get ${data?.song_title} Song's Merchandise, Streaming/Download Links, Lyrics, Skiza Tunes, Album and Events by ${data?.stage_name} - Dukaflani`} />
            <meta name="description" content="Buy products from the biggest celebrities and name brands in Africa"/>
            <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>
        </Head>
        <Box sx={{backgroundColor: theme.myColors.myBackground, minHeight: '100vh', paddingTop: 5, paddingBottom: 10}}>
            <Box sx={{position: 'sticky', top: 48, zIndex: 99}} >
                <Box sx={{backgroundColor: 'black', width: '100%'}}>
                    <Container disableGutters maxWidth='sm'>
                        {data?.youtube_embed_link ? (<Box sx={{position: 'relative', paddingBottom: '56.25%'}}>
                            <iframe width='100%' height='100%' src={data?.youtube_embed_link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </Box>) : (<Skeleton animation="wave"  variant="rectangular" sx={{ paddingTop: '56.25%', width: '100%'}} />)}
                    </Container>
                </Box>
                <Paper square sx={{display: 'flex', justifyContent: 'center'}}>
                    <Tabs
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        value={tabPosition}
                        onChange={handleChange}
                        sx={{}}
                    >
                        <Tab icon={<LinkIcon />} iconPosition='start' label="Links" />
                        <Tab icon={<ShoppingBasketOutlinedIcon />} iconPosition='start' label="Shop" />
                        <Tab icon={<MicNoneOutlinedIcon />} iconPosition='start' label="Lyrics" />
                        <Tab icon={<PhonelinkRingOutlinedIcon />} iconPosition='start' label="Skiza Tunes" />
                        <Tab icon={<LibraryMusicOutlinedIcon />} iconPosition='start' label="Album" />
                        <Tab icon={<EventAvailableOutlinedIcon />} iconPosition='start' label="Events" />
                    </Tabs>
                </Paper>
            </Box>
            <Container sx={{paddingTop: 3}} maxWidth='sm'>
                <Stack spacing={1.5}>
                    <Box onClick={() => setShowSongDetails(true)}>
                    {data?.title ? (<Typography gutterBottom sx={{lineHeight: 1}} variant='subtitle1' component='h1'>{data?.title}</Typography>) : (<Skeleton width="80%" />)}
                    <Stack sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}} direction='row' spacing={1}>
                            {data?.genre_title ? (<Typography sx={{color: '#1976d2'}} variant='button'>{data?.genre_title}</Typography>) : (<Skeleton width="10%" />)}
                            {data?.views_count ? (<Typography variant='caption'>{formatedViewCount} {data?.views_count == 1 ? 'view' : 'views'}</Typography>) : (<Skeleton width="10%" />)}
                            {data?.date ? (<Typography variant='caption'>{videoUploadTime}</Typography>) : (<Skeleton width="15%" />)}
                            <Typography variant='subtitle2'>more...</Typography>
                        </Stack>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                        {data?.profile_avatar ? (<Avatar  src={data?.profile_avatar} alt={data?.stage_name} />) : (<Skeleton animation="wave" variant="circular" width={40} height={40} />)}
                        <Box sx={{paddingX: 1, display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                            <Stack spacing={0.5} direction='row'>
                                {data?.stage_name ? (<Typography className="line-clamp-1 line-clamp" variant='subtitle2'>{data?.stage_name}</Typography>) : (<Skeleton width="100%" />)}
                                {data?.verified && <CheckCircleIcon sx={{ fontSize: 13, color: theme.myColors.textDark }} />}
                            </Stack>
                        </Box>
                        <Box sx={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'start', paddingX: 1}}>
                            <Typography variant='caption'>{isLoading ? '--' :  `${formatedFanBaseCount}`}</Typography>
                        </Box>
                        <IconButton disabled>
                            <FavoriteBorderOutlinedIcon fontSize='small' />
                        </IconButton>
                    </Box>
                    <Paper variant='outlined' sx={{ backgroundColor: theme.myColors.myBackground, padding: 1 }}>
                        <Stack>
                            <Typography variant='subtitle2'>SPONSORED:</Typography>
                            <Grid direction='row' container columnSpacing={1}>
                                <Grid xs={4} item>
                                    <Box sx={{ width: '100%', borderRadius: 2, position: "relative", cursor:'pointer', backgroundColor: colors.grey[100]}}>
                                        <Image 
                                            src={adPoster} 
                                            layout='responsive'
                                            alt={`Ad poster by Dukaflani Marketplace`}
                                            style={{borderRadius: 6}}
                                            />
                                    </Box>
                                </Grid>
                                <Grid xs={6.5} item>
                                    <Stack>
                                        <Typography sx={{lineHeight: 1}} gutterBottom variant='subtitle2'>Start selling on Dukaflani now!</Typography>
                                        <Stack spacing={1.5}>
                                            <Stack direction="row" spacing={0.5}>
                                                <Typography sx={{fontSize: 12, backgroundColor: 'yellow'}} className="line-clamp-1 line-clamp" variant='caption'>Ad</Typography>
                                                <Typography sx={{fontSize: 12, color: 'GrayText'}} className="line-clamp-1 line-clamp" variant='caption'>Dukaflani Marketplace</Typography>
                                            </Stack>
                                            <Button startIcon={<InfoOutlinedIcon/>} onClick={() => router.push({ pathname: '/links/contact_us' })} variant='text' size='small'>Learn More</Button>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid xs={1.5} item>
                                    <Box onClick={() => router.push({ pathname: '/links/contact_us' })}>
                                        <OpenInNewOutlinedIcon />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Paper>
                    <Box sx={{paddingTop: 2}}>
                        {
                            {
                                0: <TabStreamingLinks streamingLinks={streamingLinks} data={data} youtubeID={v} />,
                                1: <TabProductCard product={product} data={data} />,
                                2: <TabLyricsCard  data={data} lyrics={lyrics} verses={lyrics_verses}  />,
                                3: <TabSkizaCards data={data} skiza={skiza_list}   />,
                                4: <TabAlbumCard  data={data} album={album} albumTracks={albumTracks}  />,
                                5: <TabEventsCards  data={data} events={events} videoUserID={videoUserID} />,
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
                    }[tabPosition]
                }
            </Box>
        </Box>
        <Container sx={{backgroundColor: theme.myColors.myBackground, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99}} maxWidth='sm'>
            <Box sx={{width: '100%', paddingBottom: 2}}>
                <Button onClick={() => setShowMoreVideos(true)} startIcon={<OndemandVideoOutlinedIcon />} fullWidth  variant="contained" size='medium'>Show more videos</Button>
            </Box>
        </Container>
    </MobileNavigationLayout>

    {/* Song Details Drawer */}
    <Box> 
        <Drawer
             open={showSongDetails}
             onClose={() => setShowSongDetails(false)}
             anchor='bottom'
        >
            <Box sx={{ backgroundColor: theme.myColors.myBackground}}>
                <Container sx={{height: '60vh'}} maxWidth='sm'>
                    <Stack spacing={2}>
                        <Box sx={{paddingTop: 3, position: 'sticky', top: 0, backgroundColor: theme.myColors.myBackground, zIndex: 99}}>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Typography variant='subtitle1'>INFO:</Typography>
                                <Box onClick={() => setShowSongDetails(false)}>
                                    <CloseOutlinedIcon />
                                </Box>
                            </Box>
                            <Divider/>
                        </Box>
                        <Box>
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
            <Box sx={{ backgroundColor: theme.myColors.myBackground}}>
                <Container sx={{ height: '60vh'}} maxWidth='sm'>
                    <Stack>
                        <Box sx={{paddingTop: 3, position: 'sticky', top: 0, backgroundColor: theme.myColors.myBackground, zIndex: 99}}>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Typography variant='subtitle1'>MORE VIDEOS:</Typography>
                                <Box onClick={() => setShowMoreVideos(false)}>
                                    <CloseOutlinedIcon />
                                </Box>
                            </Box>
                            <Divider/>
                        </Box>
                        <Box>
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