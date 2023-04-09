// React Imports
import { useState, useEffect } from 'react';

// Nextjs Imports
import Head from 'next/head'
import Image from "next/legacy/image";
import { useRouter } from 'next/router';

//  Mui Imports
import { Avatar, Box, Card, colors, Container, Divider, Grid, Button, Stack, Typography, 
    CardContent, CardActionArea, Tooltip, Tabs, Tab, Paper, Link, Skeleton } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// TanStack/React-Query
import { useQuery, useQueryClient } from '@tanstack/react-query';

// NPM Imports
import numeral from 'numeral';
import Linkify from 'react-linkify';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Icons
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LinkIcon from '@mui/icons-material/Link';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import PhonelinkRingOutlinedIcon from '@mui/icons-material/PhonelinkRingOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


// Components
import NavigationLayout2 from '@/layout/desktop/NavigationLayout2'
import TabStreamingLinks from '@/components/reusableComponents/TabStreamingLinks';
import TabProductCard from '@/components/reusableComponents/TabProductCard';
import TabLyricsCard from '@/components/reusableComponents/TabLyricsCard';
import TabSkizaCards from '@/components/reusableComponents/TabSkizaCards';
import TabAlbumCard from '@/components/reusableComponents/TabAlbumCard';
import TabEventsCards from '@/components/reusableComponents/TabEventsCards';
import MoreVideos from '@/components/reusableComponents/MoreVideos';

// Project Imports
import adposter1 from '../../../../../public/assets/pictures/event1.jpg'
import { getCurrentVideo, getCurrentVideoUserProfile, getCurrentVideoStreamingLinks, 
    getCurrentVideoProduct, getCurrentVideoLyrics, getCurrentVideoLyricsVerses,
    getCurrentVideoSkizaTuneList, getCurrentVideoAlbum, getCurrentVideoAlbumTracks,
    getCurrentVideoEvents } from '@/axios/axios';



const CurrentVideo = ({ setIsDarkMode, isDarkMode, value, setValue }) => {
    const theme = useTheme()
    const router = useRouter()
    const { v } = router.query
    const [tabPosition, setTabPosition] = useState(0)
    const [showMoreText, setShowMoreText] = useState(false)
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

    //   const { data } = useQuery(["current-video", v], (v) => getCurrentVideo(v))
    
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


    const rawFanBaseCount = profile?.fanbase_count ? profile?.fanbase_count : 0
    let formatedFanBaseCount = ''
    rawFanBaseCount < 1000 || rawFanBaseCount % 10 === 0 ? formatedFanBaseCount = numeral(rawFanBaseCount).format('0a') :  formatedFanBaseCount = numeral(rawFanBaseCount).format('0.0a')

    const rawLikesCount = data?.like_count ? data?.like_count : 0
    let formatedLikesCount = ''
    rawLikesCount < 1000 || rawLikesCount % 10 === 0 ? formatedLikesCount = numeral(rawLikesCount).format('0a') :  formatedLikesCount = numeral(rawLikesCount).format('0.0a')

    const desc = data?.description
    const hashTags = desc?.split(' ')
    const hashTagRegex = /#[a-z0-9_]+/gi 

  return (
    <NavigationLayout2 setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} >
        <Head>
          <title>Watch Goosebumps - Sammyboy Kenya | Dukaflani</title>
          <meta name="description" content="Watch 'Kwame' by Khaligraph Jones on
           Dukaflani to get the Lyrics, Streaming Links, Products and Merchandise, Skiza Tunes, The Album, Events and Tour Dates " />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box sx={{backgroundColor: theme.myColors.myBackground, minHeight: '100vh', paddingTop: 5}}>
            <Container maxWidth='lg'>
                <Box>
                    <Grid container sx={{padding: 5}} spacing={3}>
                        <Grid xs={12} md={8} item>
                            <Stack>
                                {data?.youtube_embed_link ? (<Box sx={{position: 'relative', paddingBottom: '56.25%'}}>
                                    <iframe width='100%' height='100%' src={data?.youtube_embed_link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                </Box>) : (<Skeleton animation="wave"  variant="rectangular" sx={{ paddingTop: '56.25%', width: '100%'}} />)}
                                <Stack>
                                    <Box>
                                        {data?.genre_title ? (<Typography sx={{color: '#1976d2'}} variant='button'>{data?.genre_title}</Typography>) : (<Skeleton width="10%" />)}
                                        {data?.title ? (<Typography variant='h6' component='h1'>{data?.title}</Typography>) : (<Skeleton width="70%" />)}
                                    </Box>
                                </Stack>
                                <Stack>
                                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', paddingBottom: 1}}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={6}>
                                                <Stack direction='row' spacing={1}>
                                                    {data?.views_count ? (<Typography variant='body2'>{numeral(data?.views_count).format('0,0')} {data?.views_count == 1 ? 'view' : 'views'}</Typography>) : (<Skeleton width="10%" />)}
                                                    <Box sx={{display: {xs: 'none', md: 'block'}}}>&bull;</Box>
                                                    {data?.date ? (<Typography sx={{display: {xs: 'none', md: 'block'}}} variant='body2'>{new Date(data?.date).toDateString()}</Typography>) : (<Skeleton width="15%" />)}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {data?.date ? (<Typography sx={{display: {xs: 'block', md: 'none'}}} variant='body2'>{new Date(data?.date).toDateString()}</Typography>) : (<Skeleton width="15%" />)}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    {formatedLikesCount && <Stack direction='row' spacing={2}>
                                        <Paper elevation={0} sx={{ backgroundColor: colors.grey[200], display: 'flex', alignItems: 'center', justifyContent: 'end', paddingY: 1, paddingX: 1.5, borderRadius: 10, }}>
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
                                        <Paper elevation={0} sx={{ backgroundColor: colors.grey[200], display: 'flex', alignItems: 'center', justifyContent: 'end', paddingY: 1, paddingX: 1.5, borderRadius: 10, cursor: 'pointer'}}>
                                            <Stack spacing={2} direction='row'>
                                            <CopyToClipboard
                                                    text={`${process.env.NEXT_PUBLIC_NEXT_URL}/watch?v=${v}`}
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
                                </Stack>
                                {data?.description && <Box sx={{paddingTop: 1, paddingBottom: 2}}>
                                    <Stack direction="column">
                                        <Linkify componentDecorator={(decoratedHref, decoratedText, key) => ( <Link target="blank" underline="none" rel="noopener" sx={{marginBottom: -1, width: 250, display: 'inline-block', overflowX: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}  href={decoratedHref} key={key}> {decoratedText} </Link> )} >
                                            <Typography className={showMoreText ? " " : "line-clamp-1 line-clamp"} gutterBottom variant='body1'>
                                                {data?.description}
                                            </Typography>
                                        </Linkify>
                                        <Button onClick={() => setShowMoreText(!showMoreText)} size="small">{showMoreText ? "Show Less" : "Show More"}</Button>
                                    </Stack>
                                </Box>}
                                {/* <Box sx={{paddingTop: 1, paddingBottom: 2}}>
                                    <Stack direction="column">
                                        <Linkify componentDecorator={(decoratedHref, decoratedText, key) => ( <Link target="blank" underline="none" rel="noopener" sx={{marginBottom: -1, width: 250, display: 'inline-block', overflowX: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}  href={decoratedHref} key={key}> {decoratedText} </Link> )} >
                                            <Typography className={showMoreText ? " " : "line-clamp-1 line-clamp"} gutterBottom variant='body1'>
                                                    {hashTags?.map((hashTag, i) => {
                                                        return hashTag.match(hashTagRegex) ? (
                                                            <Typography key={i}><Typography variant='body1' sx={{color: colors.blue[800]}}>{hashTag}</Typography> {' '}</Typography>
                                                        ) : hashTag + ' '
                                                    })}
                                            </Typography>
                                        </Linkify>
                                        <Button onClick={() => setShowMoreText(!showMoreText)} size="small">{showMoreText ? "Show Less" : "Show More"}</Button>
                                    </Stack>
                                </Box> */}
                                <Typography variant='subtitle2'>MORE VIDEOS:</Typography>
                                <Divider/>
                                <Box sx={{paddingX: 1, paddingY: 1}}>
                                    <MoreVideos/>
                                </Box>
                            </Stack>
                        </Grid >
                        <Grid xs={12} md={4} item >
                                <Card variant='outlined'>
                                    <CardContent>
                                        <Box sx={{ width: '100%'}}>
                                            <Stack spacing={1} direction='row' sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                                <Box>
                                                    {data?.profile_avatar ? (<Avatar  src={data?.profile_avatar} alt={data?.stage_name} />) : (<Skeleton animation="wave" variant="circular" width={40} height={40} />)}
                                                </Box>
                                                <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'start', justifyContent: 'start'}}>
                                                    <Stack spacing={-0.2}>
                                                        <Stack spacing={0.5} direction='row'>
                                                            <Tooltip title='Wakadinali'>
                                                                {data?.stage_name ? (<Typography sx={{cursor: 'pointer'}} className="line-clamp-1 line-clamp" variant='subtitle2'>{data?.stage_name}</Typography>) : (<Skeleton width="100%" />)}
                                                            </Tooltip>
                                                            {data?.verified && <Tooltip title='Verified'><CheckCircleIcon sx={{ fontSize: 15, color: theme.myColors.textDark, cursor: 'pointer' }} /></Tooltip>}                   
                                                        </Stack>
                                                        <Typography variant='caption'>{isLoading ? 'Fanbase --' :  `Fanbase ${formatedFanBaseCount}`}</Typography>
                                                    </Stack>
                                                </Box>
                                                <Box>
                                                    {
                                                    true ? <Tooltip title='Join Fanbase'>
                                                        <Button disabled startIcon={<FavoriteBorderOutlinedIcon/>} variant='contained' size='small'>Join</Button>
                                                    </Tooltip>
                                                    :
                                                    <Tooltip title='Leave Fanbase'>
                                                        <Button disabled startIcon={<FavoriteIcon/>} variant='outlined' size='small'>Leave</Button>
                                                    </Tooltip>
                                                    }
                                                </Box>        
                                            </Stack>
                                        </Box>
                                    </CardContent>
                                    <CardContent sx={{backgroundColor: theme.myColors.myBackground,}}>
                                        <Box>
                                            <Box>
                                                <Typography gutterBottom sx={{color: 'whitesmoke', backgroundColor: theme.myColors.textDark}} variant='caption'>SPONSORED</Typography>
                                            </Box>
                                            <Stack spacing={4}>
                                                <Box>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={5}>
                                                            <Box sx={{position: 'relative'}}>
                                                            <Image 
                                                                src={adposter1} 
                                                                layout='responsive'
                                                                alt='Ad poster'
                                                                height="100%"
                                                                width="100%"
                                                                />
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={7}>
                                                            <Box sx={{height: '100%', width: '100%', display: 'flex', alignItems: 'end', justifyContent: 'start'}}>
                                                                <Stack sx={{width: '100%'}}>
                                                                    <Typography className="line-clamp-2 line-clamp" variant='subtitle2'>Ad title goes here and should have a line clamp of two jhbhb jhbjhb hbjhb jhbjh jhbjhb hb hb jhbjhb jhb jh bjh jhbj hjhb </Typography>
                                                                    <Box sx={{width: '100%', paddingY: 1}}>
                                                                        <Stack spacing={1} direction='row' sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                                                            <Avatar sx={{ width: 24, height: 24 }}  src='/assets/pictures/wakadinali_profile.jpg' />
                                                                            <Typography className="line-clamp-1 line-clamp" variant='caption'>www.example-domain.com</Typography>
                                                                        </Stack>
                                                                    </Box>
                                                                    <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Button startIcon={<InfoOutlinedIcon/>} fullWidth size="small" variant='contained'>Learn More</Button></Box>
                                                                </Stack>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                                <Box>
                                                    <Stack spacing={2}>
                                                        <Box>
                                                            <Tabs
                                                                variant="scrollable"
                                                                scrollButtons
                                                                allowScrollButtonsMobile
                                                                value={tabPosition}
                                                                onChange={handleChange}
                                                            >
                                                                <Tab icon={<LinkIcon />} iconPosition='start' label="Links" />
                                                                <Tab icon={<ShoppingBasketOutlinedIcon />} iconPosition='start' label="Shop" />
                                                                <Tab icon={<MicNoneOutlinedIcon />} iconPosition='start' label="Lyrics" />
                                                                <Tab icon={<PhonelinkRingOutlinedIcon />} iconPosition='start' label="Skiza Tunes" />
                                                                <Tab icon={<LibraryMusicOutlinedIcon />} iconPosition='start' label="Album" />
                                                                <Tab icon={<EventAvailableOutlinedIcon />} iconPosition='start' label="Events" />
                                                            </Tabs>
                                                        </Box>
                                                        <Box>
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
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </CardContent>
                                    <CardActionArea>
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
                                    </CardActionArea>
                                </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    </NavigationLayout2>
  )
}

export default CurrentVideo