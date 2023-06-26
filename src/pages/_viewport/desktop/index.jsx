// React Imports
import { useState } from 'react';

// Nextjs Imports
import Head from 'next/head'
import { useRouter } from 'next/router';

//  Mui Imports
import { AppBar, Box, Button, Container, Paper, Toolbar } from '@mui/material'
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
  const adString = 'Get the "Everything Link" for your music with Dukaflani'
  
  return (
    <Paper>
      <NavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
      <Head>
        <title>Dukaflani — Hub Of All Things Music</title>
        <meta name="title" content="Dukaflani — Hub Of All Things Music"/>
        <meta name="description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="og:title" content="Dukaflani — Hub Of All Things Music"/>
        <meta property="og:description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
        <meta property="og:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_NEXT_URL} />
        <meta property="twitter:title" content="Dukaflani — Hub Of All Things Music"/>
        <meta property="twitter:description" content="A dynamic link-in-bio solution built for the modern African Artist with support for streaming links, merchandise, lyrics, skiza tunes, albums, events and media tours"/>
        <meta property="twitter:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>
      </Head>
        <Box sx={{minHeight: '100vh', paddingTop: 15, paddingBottom: 10}}>
          <HomePageContent value={value} />
           <Box sx={{display: { xs: 'block', md: 'none' }}}>
            <BottomNavDesktop value={value} setValue={setValue}/>
          </Box>
        </Box>
      </NavigationLayout>

      <NavbarAdDesktopModal open={open} setOpen={setOpen} />
    </Paper>
  )
}
