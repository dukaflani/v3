// React Imports
import { useCallback, useRef, useState } from 'react';

// Next Imports
import { useRouter } from 'next/router';
import Head from "next/head"

// TanStack/React-Query
import { useQuery } from '@tanstack/react-query';

// MUI Imports
import { Avatar, Box, Container, Paper, Stack, Tab, Tabs, Typography, colors } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// NPM Imports
import { useSelector } from 'react-redux';

// Icons
import WhatshotTwoToneIcon from '@mui/icons-material/WhatshotTwoTone';

// Project Imports
import NavigationLayout2 from '@/layout/desktop/NavigationLayout2';
import VideoResultsComponent from '@/components/reusableComponents/VideoResultsComponent'
import ProductResultsComponent from '@/components/reusableComponents/ProductResultsComponent'
import EventResultsComponent from '@/components/reusableComponents/EventResultsComponent'
import { searchVideos, searchProducts, searchEvents, searchPageProfileLink } from '@/axios/axios';

const SearchPage = ({ setIsDarkMode, isDarkMode, value, setValue }) => {
    const searchTerm = useSelector((state) => state.search.searchTerm)
    const formattedSearchTerm = searchTerm?.replace(/%2/g, "+")

    const [tabValue, setTabValue] = useState(0);
    const router = useRouter()
    const { search_query } = router.query
    const theme = useTheme()

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };


    const { data: profile, isLoading: loadingProfile, isFetching: fetchingProfile } = useQuery(["profile-result", search_query], (search_query) => searchPageProfileLink(search_query), {
    enabled: !!search_query
    })
    const { data: videos, isLoading: loadingVideos, isFetching: fetchingVideos } = useQuery(["video-results", search_query], (search_query) => searchVideos(search_query), {
        enabled: !!search_query
    })
    const { data: products, isLoading: loadingProducts, isFetching: fetchingProducts } = useQuery(["product-results", search_query], (search_query) => searchProducts(search_query), {
        enabled: !!search_query
    })
    const { data: events, isLoading: loadingEvents, isFetching: fetchingEvents } = useQuery(["event-results", search_query], (search_query) => searchEvents(search_query), {
        enabled: !!search_query
    })
   

  return (
    <>
    <NavigationLayout2 setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
    <Head>
        <title>{`${searchTerm} results | Dukaflani Search`}</title>
        <meta name="title" content={`${searchTerm} results | Dukaflani Search`}/>
        <meta name="description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/results?search_query=${formattedSearchTerm}`} />
        <meta property="og:title" content={`${searchTerm} results | Dukaflani Search`}/>
        <meta property="og:description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
        <meta property="og:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/results?search_query=${formattedSearchTerm}`} />
        <meta property="twitter:title" content={`${searchTerm} results | Dukaflani Search`}/>
        <meta property="twitter:description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
        <meta property="twitter:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>
      </Head>
        <Paper sx={{minHeight: '100vh', paddingTop: 5, paddingBottom: 10}}>
            <Container maxWidth='lg'>
                <Container sx={{paddingTop: 3}} maxWidth='md'>
                    <Stack direction='row' spacing={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                        <Avatar sx={{ bgcolor: colors.pink[500], width: 56, height: 56 }}>
                            <WhatshotTwoToneIcon fontSize="large" />
                        </Avatar>
                        <Typography variant='h5'>Search Results</Typography>
                    </Stack>
                </Container>
                    <Box sx={{ width: '100%', borderBottom: '1px solid lightGray' }}>
                        <Container maxWidth='md'>
                            <Tabs value={tabValue} onChange={handleChange} >
                                <Tab label={videos?.length > 0 ? `Links (${videos?.length})` : 'Links (0)'} />
                                <Tab label={products?.length > 0 ? `Products (${products?.length})` : 'Products (0)'} />
                                <Tab label={events?.length > 0 ? `Events (${events?.length})` : 'Events (0)'} />
                            </Tabs>
                        </Container>
                    </Box>
                    <Container maxWidth="md">
                        <Box sx={{paddingTop: 3}}>
                            {
                                {
                                    0: <VideoResultsComponent isLoading={loadingVideos} videos={videos} profile={profile} />,
                                    1: <ProductResultsComponent isLoading={loadingProducts} products={products} />,
                                    2: <EventResultsComponent isLoading={loadingEvents} events={events} />,
                                }[tabValue]
                            }
                        </Box>
                    </Container>
            </Container>
        </Paper>
    </NavigationLayout2>
    </>
  )
}

export default SearchPage