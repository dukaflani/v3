// Next Imports
import { useRouter } from 'next/router';
import Head from "next/head"

// MUI Imports
import { Box, Card, CardContent, Container, Link, Paper, Stack } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// Project imports
import Copyright from '@/components/reusableComponents/Copyright';
import RegisterForm from '@/components/reusableComponents/RegisterForm';

const Register = () => {
    const router = useRouter()
    const theme = useTheme()


  return (
    <>
    <Head>
        <title>Register Account | Dukaflani</title>
        <meta name="description" content="Sign up for an account on Dukaflani" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Paper sx={{minHeight: '100vh'}}>
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
                    <Card variant='outlined'>
                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <RegisterForm/>
                        </CardContent>
                    </Card>
                </Box>
                <Box>
                    <Copyright/>
                </Box>
        </Stack>
        </Container>
    </Paper>
</>
  )
}

export default Register