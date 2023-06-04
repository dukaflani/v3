// React Imports
import { useState } from 'react';

// Nextjs Imports
import Head from 'next/head'

//  Mui Imports
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Project Imports
import NavigationLayout from '@/layout/desktop/NavigationLayout'
import EventsHomePageContent from '@/components/pageComponents/EventsHomePageContent'
import NavbarAdDesktopModal from '@/components/modals/NavbarAdDesktopModal'
import BottomNavDesktop from '@/components/reusableComponents/BottomNavDesktop';

const EventsHomePage = ({ setIsDarkMode, isDarkMode, value, setValue }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false);
  const adString = 'Rong Reggae (Official Music Video) ft Mc GiJo, RiDiQ & Skillo'


  return (
    <>
      <NavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
      <Head>
        <title>Dukaflani Events — Events Featuring Your Favourite Artists</title>
        <meta name="title" content="Dukaflani Events — Events Featuring Your Favourite Artists"/>
        <meta name="description" content="Discover tour dates and buy tickets to events featuring your favourite artists"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/events`} />
        <meta property="og:title" content="Dukaflani Events — Events Featuring Your Favourite Artists"/>
        <meta property="og:description" content="Discover tour dates and buy tickets to events featuring your favourite artists"/>
        <meta property="og:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/events`} />
        <meta property="twitter:title" content="Dukaflani Events — Events Featuring Your Favourite Artists"/>
        <meta property="twitter:description" content="Discover tour dates and buy tickets to events featuring your favourite artists"/>
        <meta property="twitter:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>
      </Head>
        <Paper sx={{ minHeight: '100vh', paddingTop: 15, paddingBottom: 10}}>
          <EventsHomePageContent value={value} />
           {/* <Box sx={{display: { xs: 'block', md: 'none' }}}>
            <BottomNavDesktop value={value} setValue={setValue}/>
          </Box> */}
        </Paper>
      </NavigationLayout>

      <NavbarAdDesktopModal open={open} setOpen={setOpen} />
    </>
  )
}

export default EventsHomePage