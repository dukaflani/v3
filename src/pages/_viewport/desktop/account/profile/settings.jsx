// Next Imports
import { useRouter } from 'next/router';
import Head from "next/head"

// MUI Imports
import { Box, Card, CardContent, Container, Paper, Stack } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// Project imports
import Copyright from '@/components/reusableComponents/Copyright';
import ProfileSettingsForm from '@/components/reusableComponents/ProfileSettingsForm';
import NavigationLayout2 from '@/layout/desktop/NavigationLayout2'

const Settings = ({ setIsDarkMode, isDarkMode, value, setValue }) => {
    const router = useRouter()
    const theme = useTheme()


  return (
    <>
    <NavigationLayout2 setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
    <Head>
        <title>Profile Settings | Dukaflani</title>
        <meta name="description" content="Edit your profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Paper sx={{minHeight: '100vh'}}>
        <Container maxWidth="sm">
        <Stack sx={{minHeight: '100vh', paddingTop: 10 }} spacing={3}>
                <Box >
                    <Card variant='outlined'>
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
    </Paper>
    </NavigationLayout2>
</>
  )
}

export default Settings