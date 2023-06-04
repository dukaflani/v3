// React Imports
import { useState } from 'react';

// Nextjs Imports
import Head from 'next/head'
import { useRouter } from 'next/router';

//  Mui Imports
import { Box, Button, Container, Paper, Stack, Typography, colors } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Project Imports
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'
import EventsHomePageContent from '@/components/pageComponents/EventsHomePageContent'
import NavbarAdDesktopModal from '@/components/modals/NavbarAdDesktopModal'
import BottomNavDesktop from '@/components/reusableComponents/BottomNavDesktop';

const MobileEventsHomePage = ({ setIsDarkMode, isDarkMode, value, setValue }) => {
  const theme = useTheme()
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const adString = 'Start selling on Dukaflani now!'


  return (
    <>
      <MobileNavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
        <Head>
          <title>Dukaflani Events — Events Featuring Your Favourite Artists</title>
          <meta name="title" content="Dukaflani Events — Events Featuring Your Favourite Artists"/>
          <meta name="description" content="Discover tour dates and buy tickets to events featuring your favourite artists"/>
          <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>
        </Head>
        <Paper sx={{minHeight: '100vh', paddingTop: 5, paddingBottom: 10}}>
          <Paper elevation={0} sx={{ paddingBottom: 0.4, paddingTop: 1, position: 'sticky', top: 47, zIndex: 999}}>
            <Container disableGutters maxWidth='lg'>
              <div onClick={() => router.push({ pathname: '/links/contact_us' })} style={{display:'flex', flexDirection:'row', alignItems: 'start', justifyContent: 'center'}}>
                <div style={{display:'flex', flexDirection:'column', alignItems: 'start', justifyContent: 'center', }}>
                    <span style={{marginRight: 10, fontSize: 13, fontWeight: 'bold', lineHeight: 1.1}} className="line-clamp-1 line-clamp">{adString}</span>
                    <div style={{display:'flex', flexDirection:'row', marginTop: -2,}}>
                      <span style={{ fontSize: 12, backgroundColor: 'yellow', paddingLeft: 5, paddingRight: 5, color: colors.grey[800]}}>Ad</span>
                      <span style={{ fontSize: 12, color: 'GrayText', width: 250, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Dukaflani Marketplace</span>
                    </div>
                </div>
              </div>
            </Container>
          </Paper>
          <EventsHomePageContent value={value} />
           {/* <Box sx={{display: { xs: 'block', md: 'none' }}}>
            <BottomNavDesktop value={value} setValue={setValue}/>
          </Box> */}
        </Paper>
      </MobileNavigationLayout>

      <NavbarAdDesktopModal open={open} setOpen={setOpen} />
    </>
  )
}

export default MobileEventsHomePage