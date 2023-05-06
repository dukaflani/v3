// Next Imports
import { useRouter } from 'next/router';
import Head from "next/head"

// MUI Imports
import { Box, Card, CardContent, Container, Link, Stack, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// Project imports
import Copyright from '@/components/reusableComponents/Copyright';
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'



const CookiePolicy = ({ setIsDarkMode, isDarkMode, value, setValue }) => {
    const router = useRouter()
    const theme = useTheme()


  return (
    <>
    <MobileNavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
    <Head>
        <title>Cookie Policy — Dukaflani</title>
        <meta name="title" content="Cookie Policy — Dukaflani"/>
        <meta name="description" content="Read Our Cookie Policy"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/legal/cookie_policy`} />
        <meta property="og:title" content="Cookie Policy — Dukaflani"/>
        <meta property="og:description" content="Read Our Cookie Policy"/>
        <meta property="og:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/legal/cookie_policy`} />
        <meta property="twitter:title" content="Cookie Policy — Dukaflani"/>
        <meta property="twitter:description" content="Read Our Cookie Policy"/>
        <meta property="twitter:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>
      </Head>
    <Box sx={{minHeight: '100vh', backgroundColor: theme.myColors.myBackground}}>
        <Container maxWidth="md">
        <Stack sx={{minHeight: '100vh', paddingTop: 10 }} spacing={3}>
                <Box >
                    <Card square>
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography variant='h6'>Cookie policy</Typography>
                                <Typography variant='h1'>
                                    404
                                </Typography>
                                <Typography variant='body1'>
                                    Page not found!
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
                <Box>
                    <Copyright/>
                </Box>
        </Stack>
        </Container>
    </Box>
    </MobileNavigationLayout>
</>
  )
}

export default CookiePolicy