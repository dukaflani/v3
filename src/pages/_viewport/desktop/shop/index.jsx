// React Imports
import { useState } from 'react';

// Nextjs Imports
import Head from 'next/head'

//  Mui Imports
import { Box, Button, Container, Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Components
import ShopHomePageContent from '@/components/pageComponents/ShopHomePageContent'
import NavbarAdDesktopModal from '@/components/modals/NavbarAdDesktopModal'
import BottomNavDesktop from '@/components/reusableComponents/BottomNavDesktop';
import NavigationLayout from '@/layout/desktop/NavigationLayout';



const ShopHomePage = ({ setIsDarkMode, isDarkMode, value, setValue }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false);
  const adString = 'Rong Reggae (Official Music Video) ft Mc GiJo, RiDiQ & Skillo'


  return (
    <>
      <NavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
      <Head>
        <title>Dukaflani Shopping — Buy Celebrity Merchandise</title>
        <meta name="title" content="Dukaflani Shopping — Buy Celebrity Merchandise"/>
        <meta name="description" content="Buy products from the biggest celebrities and name brands in Africa"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/shop`} />
        <meta property="og:title" content="Dukaflani Shopping — Buy Celebrity Merchandise"/>
        <meta property="og:description" content="Buy products from the biggest celebrities and name brands in Africa"/>
        <meta property="og:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/shop`} />
        <meta property="twitter:title" content="Dukaflani Shopping — Buy Celebrity Merchandise"/>
        <meta property="twitter:description" content="Buy products from the biggest celebrities and name brands in Africa"/>
        <meta property="twitter:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>
      </Head>
        <Paper sx={{ minHeight: '100vh', paddingTop: 15, paddingBottom: 10}}>
          <ShopHomePageContent value={value} />
           {/* <Box sx={{display: { xs: 'block', md: 'none' }}}>
            <BottomNavDesktop value={value} setValue={setValue}/>
          </Box> */}
        </Paper>
      </NavigationLayout>

      <NavbarAdDesktopModal open={open} setOpen={setOpen} />
    </>
  )
}

export default ShopHomePage