// Next Imports
import { useRouter } from 'next/router';
import Head from "next/head"

// MUI Imports
import { Box, Card, CardContent, Container, Stack } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// Project imports
import Copyright from '@/components/reusableComponents/Copyright';
import ProfileSettingsForm from '@/components/reusableComponents/ProfileSettingsForm';
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'

const Settings = ({ setIsDarkMode, isDarkMode, value, setValue }) => {
    const router = useRouter()
    const theme = useTheme()


  return (
    <>
    <MobileNavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
    <Head>
        <title>Profile Settings | Dukaflani</title>
        <meta name="description" content="Edit your profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box sx={{minHeight: '100vh', backgroundColor: theme.myColors.myBackground}}>
        <Container maxWidth="sm">
        <Stack sx={{minHeight: '100vh', paddingTop: 10 }} spacing={3}>
                <Box >
                    <Card sx={{backgroundColor: theme.myColors.myBackground}} variant='outlined'>
                        <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <ProfileSettingsForm/>
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

export default Settings