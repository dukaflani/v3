// React Imports
import { useState } from 'react';

// Nextjs Imports
import Head from 'next/head'

//  Mui Imports
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Project Imports
import NavigationLayout2 from '@/layout/desktop/NavigationLayout2'
import EventsHomePageContent from '@/components/pageComponents/EventsHomePageContent'
import NavbarAdDesktopModal from '@/components/modals/NavbarAdDesktopModal'
import BottomNavDesktop from '@/components/reusableComponents/BottomNavDesktop';

const EventsHomePage = ({ setIsDarkMode, isDarkMode, value, setValue }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false);
  const adString = 'Rong Reggae (Official Music Video) ft Mc GiJo, RiDiQ & Skillo'


  return (
    <>
      <NavigationLayout2 setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
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
        <Box sx={{backgroundColor: theme.myColors.myBackground, minHeight: '100vh', paddingTop: 5, paddingBottom: 10}}>
          <Paper elevation={0} sx={{backgroundColor: theme.myColors.myBackground, paddingBottom: 0.4, paddingTop: 1, position: 'sticky', top: 47, zIndex: 999}}>
            <Container maxWidth='lg'>
              <div style={{display:'flex', flexDirection:'row', alignItems: 'start', justifyContent: 'center'}}>
                <div style={{display:'flex', flexDirection:'column',}}>
                    <span style={{marginRight: 10, fontSize: 13, fontWeight: 'bold', lineHeight: 1.1}} className="line-clamp-1 line-clamp">{adString}</span>
                    <div style={{display:'flex', flexDirection:'row', marginTop: -2}}>
                      <span style={{marginRight: 6, fontSize: 12, backgroundColor: 'yellow', paddingLeft: 5, paddingRight: 5}}>Ad</span>
                      <span style={{marginRight: 6, fontSize: 12, color: 'GrayText', width: 250, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Wakadinali</span>
                    </div>
                </div>
                <div>
                  <Button onClick={() => setOpen(true)} size="small">View</Button>
                </div>
              </div>
            </Container>
          </Paper>
          <EventsHomePageContent value={value} />
           <Box sx={{display: { xs: 'block', md: 'none' }}}>
            <BottomNavDesktop value={value} setValue={setValue}/>
          </Box>
        </Box>
      </NavigationLayout2>

      <NavbarAdDesktopModal open={open} setOpen={setOpen} />
    </>
  )
}

export default EventsHomePage