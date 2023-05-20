// React Imports
import { useState } from 'react';

// Nextjs Imports
import Head from 'next/head'
import { useRouter } from 'next/router';

//  Mui Imports
import { Box, Button, Container, Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Icons
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Components
import NavigationLayout from '@/layout/desktop/NavigationLayout'
import HomePageContent from '@/components/pageComponents/HomePageContent'
import NavbarAdDesktopModal from '@/components/modals/NavbarAdDesktopModal'
import BottomNavDesktop from '@/components/reusableComponents/BottomNavDesktop';




export default function Home({ setIsDarkMode, isDarkMode, value, setValue }) {
  const router = useRouter()
  const theme = useTheme()
  const [open, setOpen] = useState(false);
  const adString = 'Start selling on Dukaflani now!'
  
  return (
    <>
      <NavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
      <Head>
        <title>Dukaflani — Buy Celebrity Merchandise</title>
        <meta name="title" content="Dukaflani — Buy Celebrity Merchandise"/>
        <meta name="description" content="Buy products from the biggest celebrities and name brands in Africa"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content="Dukaflani — Buy Celebrity Merchandise"/>
        <meta property="og:description" content="Buy products from the biggest celebrities and name brands in Africa"/>
        <meta property="og:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content="Dukaflani — Buy Celebrity Merchandise"/>
        <meta property="twitter:description" content="Buy products from the biggest celebrities and name brands in Africa"/>
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
                      <span style={{marginRight: 6, fontSize: 12, color: 'GrayText', width: 250, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>Dukaflani Marketplace</span>
                    </div>
                </div>
                <div>
                  <Button startIcon={<InfoOutlinedIcon/>} onClick={() => router.push({ pathname: '/links/contact_us' })} size="small">Learn How</Button>
                </div>
              </div>
            </Container>
          </Paper>
          <HomePageContent value={value} />
           <Box sx={{display: { xs: 'block', md: 'none' }}}>
            <BottomNavDesktop value={value} setValue={setValue}/>
          </Box>
        </Box>
      </NavigationLayout>

      <NavbarAdDesktopModal open={open} setOpen={setOpen} />
    </>
  )
}
