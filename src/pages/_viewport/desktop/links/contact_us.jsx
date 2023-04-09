// Next Imports
import { useRouter } from 'next/router';
import Head from "next/head"

// MUI Imports
import { Box, Card, CardContent, Container, Link, Stack, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// Icons
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';

// Project imports
import Copyright from '@/components/reusableComponents/Copyright';



const contact_us = () => {
    const router = useRouter()
    const theme = useTheme()

  return (
    <>
        <Head>
          <title>Contuct Us | Dukaflani</title>
          <meta name="description" content="Contuct us" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box sx={{minHeight: '100vh', backgroundColor: theme.myColors.myBackground}}>
            <Container maxWidth="md">
            <Stack sx={{minHeight: '100vh', paddingTop: 2 }} spacing={3}>
                    <Link 
                    onClick={(e) => {
                        e.preventDefault()
                        router.push({ pathname: '/' })
                    }}
                    title='Dukaflani Home'>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'start', cursor: 'pointer'}}>
                        <img style={{height: 30}} src='/branding/dukaflani-logo-blue-medium.png' alt='logo'/>
                    </Box>
                    </Link>
                    <Box >
                        <Card square>
                            <CardContent>
                                <Stack spacing={2}>
                                    <Typography variant='h6'>Contact us</Typography>
                                    <Typography variant='body1'>
                                        Dukaflani is still under active development so some of our features may not be
                                        fully implemented and some of our pages may still not be published to the internet.
                                    </Typography>
                                    <Typography variant='body1'>
                                        Incase you have any questions on how to use the platform, general enquieries or would like to join the early adopters
                                        and test out new features before everyone else, contact us on the channels provided below.
                                    </Typography>
                                    <Stack sx={{paddingTop: 2}} spacing={2}>
                                        <Stack direction='row' spacing={3}>
                                            <WhatsAppIcon fontSize="small"  />
                                            <Typography variant="caption">254 723 353630</Typography>
                                        </Stack>
                                        <Stack direction='row' spacing={3}>
                                            <EmailOutlinedIcon fontSize="small"  />
                                            <Typography variant="caption">jidraff@dukaflani.co.ke</Typography>
                                        </Stack>
                                        <Stack direction='row' spacing={1}>
                                            <FacebookOutlinedIcon fontSize="small"  />
                                            <TwitterIcon fontSize="small"  />
                                            <InstagramIcon fontSize="small"  />
                                            <Typography variant="caption">@dukaflani</Typography>
                                        </Stack>
                                    </Stack>
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
    </>
  )
}

export default contact_us