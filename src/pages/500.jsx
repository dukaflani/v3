// Next Imports
import { useRouter } from 'next/router';
import Head from "next/head"

// MUI Imports
import { Box, Card, CardContent, Container, Link, Stack, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// Project imports
import Copyright from '@/components/reusableComponents/Copyright';

const ServerError = () => {
  const router = useRouter()
  const theme = useTheme()


  return (
    <>
    <Head>
      <title>Server Error! | Dukaflani</title>
      <meta name="description" content="Sorry, something went wrong" />
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
                                <Typography variant='h6'>Server Error!</Typography>
                                <Typography variant='h1'>
                                    500
                                </Typography>
                                <Typography variant='body1'>
                                    Please refresh your page. If the problem persists, please contact us <span  onClick={() => router.push({ pathname: '/links/contact_us' })} style={{color: 'blue', cursor: 'pointer'}}>here</span>
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
</>
  )
}

export default ServerError