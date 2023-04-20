// React Imports
import { useCallback, useRef, useState } from 'react';

// Next Imports
import { useRouter } from 'next/router';
import Head from "next/head"

// TanStack/React-Query
import { useQuery } from '@tanstack/react-query';

// MUI Imports
import { Avatar, Box, Container, Stack, Tab, Tabs, Typography, colors } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// Icons
import WhatshotTwoToneIcon from '@mui/icons-material/WhatshotTwoTone';

// Project Imports
import NavigationLayout2 from '@/layout/desktop/NavigationLayout2';
import VideoResultsComponent from '@/components/reusableComponents/VideoResultsComponent'
import ProductResultsComponent from '@/components/reusableComponents/ProductResultsComponent'
import EventResultsComponent from '@/components/reusableComponents/EventResultsComponent'
import { searchVideos, searchProducts, searchEvents } from '@/axios/axios';

const searchPage = ({ setIsDarkMode, isDarkMode, value, setValue }) => {

    const [tabValue, setTabValue] = useState(0);
    const router = useRouter()
    const { search_query } = router.query
    const theme = useTheme()

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };


    const { data: videos, isLoading: loadingVideos, isFetching: fetchingVideos } = useQuery(["video-results", search_query], (search_query) => searchVideos(search_query))
    const { data: products, isLoading: loadingProducts, isFetching: fetchingProducts } = useQuery(["product-results", search_query], (search_query) => searchProducts(search_query))
    const { data: events, isLoading: loadingEvents, isFetching: fetchingEvents } = useQuery(["event-results", search_query], (search_query) => searchEvents(search_query))
   


  return (
    <>
    <NavigationLayout2 setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
        <Head>
            <title>Search Results | Dukaflani</title>
            <meta name="description" content="Search results page" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box sx={{minHeight: '100vh', backgroundColor: theme.myColors.myBackground, paddingTop: 5, paddingBottom: 10}}>
            <Container maxWidth='lg'>
                <Container sx={{paddingTop: 3}} maxWidth='md'>
                    <Stack direction='row' spacing={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                        <Avatar sx={{ bgcolor: colors.pink[500], width: 56, height: 56 }}>
                            <WhatshotTwoToneIcon fontSize="large" />
                        </Avatar>
                        <Typography variant='h5'>Search Results</Typography>
                    </Stack>
                </Container>
                    <Box sx={{ width: '100%', backgroundColor: theme.myColors.myBackground, borderBottom: '1px solid lightGray' }}>
                        <Container maxWidth='md'>
                            <Tabs value={tabValue} onChange={handleChange} >
                                <Tab label={videos?.length > 0 ? `Videos (${videos?.length})` : 'Videos (0)'} />
                                <Tab label={products?.length > 0 ? `Products (${products?.length})` : 'Products (0)'} />
                                <Tab label={events?.length > 0 ? `Events (${events?.length})` : 'Events (0)'} />
                            </Tabs>
                        </Container>
                    </Box>
                    <Container maxWidth="md">
                        <Box sx={{paddingTop: 3}}>
                            {
                                {
                                    0: <VideoResultsComponent isLoading={loadingVideos} videos={videos} />,
                                    1: <ProductResultsComponent isLoading={loadingProducts} products={products} />,
                                    2: <EventResultsComponent isLoading={loadingEvents} events={events} />,
                                }[tabValue]
                            }
                        </Box>
                    </Container>
            </Container>
        </Box>
    </NavigationLayout2>
    </>
  )
}

export default searchPage