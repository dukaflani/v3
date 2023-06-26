// React Imports
import { useState } from 'react';

// Nextjs Imports
import Head from 'next/head'
import { useRouter } from 'next/router';

//  Mui Imports
import { Box, Container, Paper, colors } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// NPM Imports
import { useDispatch } from 'react-redux';

// Components
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'
import ShopHomePageContent from '@/components/pageComponents/ShopHomePageContent'
import NavbarAdDesktopModal from '@/components/modals/NavbarAdDesktopModal'
import BottomNavMobile from '@/components/reusableComponents/BottomNavMobile';
import { pageHasChanged } from '@/redux/features/navigation/navigationSlice';

const ShopHomePageMobile = ({ setIsDarkMode, isDarkMode, value, setValue }) => {
    const theme = useTheme()
    const router = useRouter()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const adString = 'Get the "Everything Link" for your music with Dukaflani'


  return (
    <>
      <MobileNavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
        <Head>
          <title>Dukaflani Shopping — Buy Celebrity Merchandise</title>
          <meta name="title" content="Dukaflani Shopping — Buy Celebrity Merchandise"/>
          <meta name="description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
          <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>
        </Head>
        <Paper sx={{ minHeight: '100vh', paddingTop: 5, paddingBottom: 10}}>
          <Paper elevation={0} sx={{paddingBottom: 0.4, paddingTop: 1, paddingX: 1.5, position: 'sticky', top: 47, zIndex: 999}}>
            <Container disableGutters maxWidth='lg'>
              <div onClick={() => {
                dispatch(pageHasChanged(true))
                router.push({ pathname: '/links/contact_us' })
                }} style={{display:'flex', flexDirection:'row', alignItems: 'start', justifyContent: 'center'}}>
                <div style={{display:'flex', flexDirection:'column', alignItems: 'start', justifyContent: 'center', }}>
                    <span style={{marginRight: 10, fontSize: 13, fontWeight: 'bold', lineHeight: 1.1}} className="line-clamp-1 line-clamp">{adString}</span>
                    <div style={{display:'flex', flexDirection:'row', marginTop: -2,}}>
                      <span style={{ fontSize: 12, backgroundColor: 'yellow', paddingLeft: 5, paddingRight: 5, color: colors.grey[800]}}>Ad</span>
                      <span style={{ fontSize: 12, color: 'GrayText', width: 250, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Dukaflani Ads</span>
                    </div>
                </div>
              </div>
            </Container>
          </Paper>
          <ShopHomePageContent value={value} />
           {/* <Box sx={{display: { xs: 'block', md: 'none' }}}> */}
           {/* <Box>
            <BottomNavMobile value={value} setValue={setValue}/>
          </Box> */}
        </Paper>
      </MobileNavigationLayout>

      <NavbarAdDesktopModal open={open} setOpen={setOpen} />
    </>
  )
}

export default ShopHomePageMobile