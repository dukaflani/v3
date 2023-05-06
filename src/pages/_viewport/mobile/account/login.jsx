// Next Imports
import { useRouter } from 'next/router';
import Head from "next/head"

// MUI Imports
import { Box, Card, CardContent, Container, Link, Stack } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// Project imports
import Copyright from '@/components/reusableComponents/Copyright';
import LoginForm from '@/components/reusableComponents/LoginForm';

const Login = () => {
  const router = useRouter()
  const theme = useTheme()


  return (
    <>
    <Head>
        <title>Login | Dukaflani</title>
        <meta name="description" content="Login to your account on Dukaflani" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box sx={{minHeight: '100vh', backgroundColor: theme.myColors.myBackground}}>
        <Container maxWidth="sm">
        <Stack sx={{minHeight: '100vh', paddingTop: 2 }} spacing={3}>
                <Link 
                onClick={(e) => {
                    e.preventDefault()
                    router.push({ pathname: '/' })
                }}
                title='Dukaflani Home'>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                    <img style={{height: 30}} src='/branding/dukaflani-logo-blue-medium.png' alt='logo'/>
                </Box>
                </Link>
                <Box >
                    <Card sx={{backgroundColor: theme.myColors.myBackground}} variant='outlined'>
                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <LoginForm/>
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

export default Login