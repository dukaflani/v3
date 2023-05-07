// React Imports
import { useState } from 'react';

// Nextjs Imports
import Head from 'next/head'
import { useRouter } from 'next/router';

//  Mui Imports
import { Box, Container, Paper, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Icons
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Components
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'
import HomePageContent from '@/components/pageComponents/HomePageContent'
import NavbarAdDesktopModal from '@/components/modals/NavbarAdDesktopModal'
import BottomNavMobile from '@/components/reusableComponents/BottomNavMobile';




export default function Home({ setIsDarkMode, isDarkMode, value, setValue }) {
  const theme = useTheme()
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const adString = 'Start selling on Dukaflani now!'
  
  return (
    <>
      <MobileNavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
        <Head>
          <title>Dukaflani — Buy Celebrity Merchandise</title>
          <meta name="title" content="Dukaflani — Buy Celebrity Merchandise"/>
          <meta name="description" content="Buy products from the biggest celebrities and name brands in Africa"/>
          <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>
        </Head>
        <Box sx={{backgroundColor: theme.myColors.myBackground, minHeight: '100vh', paddingTop: 5, paddingBottom: 10}}>
          <Paper elevation={0} sx={{backgroundColor: theme.myColors.myBackground, paddingBottom: 0.4, paddingTop: 1, paddingX: 1.5, position: 'sticky', top: 47, zIndex: 999}}>
            <Container disableGutters maxWidth='lg'>
              <div onClick={() => router.push({ pathname: '/links/contact_us' })} style={{display:'flex', flexDirection:'row', alignItems: 'start', justifyContent: 'center'}}>
                <div style={{display:'flex', flexDirection:'column', alignItems: 'start', justifyContent: 'center', }}>
                    <span style={{marginRight: 10, fontSize: 13, fontWeight: 'bold', lineHeight: 1.1}} className="line-clamp-1 line-clamp">{adString}</span>
                    <div style={{display:'flex', flexDirection:'row', marginTop: -2,}}>
                      <span style={{ fontSize: 12, backgroundColor: 'yellow', paddingLeft: 5, paddingRight: 5}}>Ad</span>
                      <span style={{ fontSize: 12, color: 'GrayText', width: 250, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Dukaflani Marketplace</span>
                    </div>
                </div>
              </div>
            </Container>
          </Paper>
          <HomePageContent value={value} />
           {/* <Box sx={{display: { xs: 'block', md: 'none' }}}> */}
           <Box>
            <BottomNavMobile value={value} setValue={setValue}/>
          </Box>
        </Box>
      </MobileNavigationLayout>

      <NavbarAdDesktopModal open={open} setOpen={setOpen} />
    </>
  )
}
