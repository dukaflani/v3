// React Imports
import { useState } from 'react';

// Nextjs Imports
import Head from 'next/head'
import { useRouter } from 'next/router';

//  Mui Imports
import { Box, Container, Paper, Button, colors } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// NPM Imports
import { useDispatch } from 'react-redux';

// Icons
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Components
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'
import HomePageContent from '@/components/pageComponents/HomePageContent'
import NavbarAdDesktopModal from '@/components/modals/NavbarAdDesktopModal'
import BottomNavMobile from '@/components/reusableComponents/BottomNavMobile';
import { pageHasChanged } from '@/redux/features/navigation/navigationSlice';




export default function Home({ setIsDarkMode, isDarkMode, value, setValue }) {
  const theme = useTheme()
  const router = useRouter()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const adString = 'Start selling on Dukaflani now!'
  
  return (
    <>
      <MobileNavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
        <Head>
          <title>Dukaflani — Hub Of All Things Music</title>
          <meta name="title" content="Dukaflani — Hub Of All Things Music"/>
          <meta name="description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
          <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>
        </Head>
        <Paper sx={{minHeight: '100vh', paddingTop: 5, paddingBottom: 10}}>
          <Paper elevation={0} sx={{ paddingBottom: 0.4, paddingTop: 1, paddingX: 1.5, position: 'sticky', top: 47, zIndex: 999}}>
            <Container disableGutters maxWidth='lg'>
              <div onClick={() => {
                dispatch(pageHasChanged(true))
                router.push({ pathname: '/links/contact_us' })
                }} style={{display:'flex', flexDirection:'row', alignItems: 'start', justifyContent: 'center'}}>
                <div style={{display:'flex', flexDirection:'column', alignItems: 'start', justifyContent: 'center', }}>
                    <span style={{marginRight: 10, fontSize: 13, fontWeight: 'bold', lineHeight: 1.1}} className="line-clamp-1 line-clamp">{adString}</span>
                    <div style={{display:'flex', flexDirection:'row', marginTop: -2,}}>
                      <span style={{marginRight: 3, fontSize: 12, backgroundColor: 'yellow', paddingLeft: 3, paddingRight: 3, color: colors.grey[800]}}>Ad</span>
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
        </Paper>
      </MobileNavigationLayout>

      <NavbarAdDesktopModal open={open} setOpen={setOpen} />
    </>
  )
}
