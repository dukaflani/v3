// React Imports
import { useState } from 'react';

// Next Imports
import { useRouter } from 'next/router';
import Head from "next/head"

// MUI Imports
import { Avatar, Box, Card, CardContent, Container, Link, Stack, Tab, Tabs, Typography, colors } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// Icons
import WhatshotTwoToneIcon from '@mui/icons-material/WhatshotTwoTone';

// Project Imports
import NavigationLayout2 from '@/layout/desktop/NavigationLayout2';

const searchPage = ({ setIsDarkMode, isDarkMode, value, setValue }) => {
    const [tabValue, setTabValue] = useState(0);
    const router = useRouter()
    const theme = useTheme()

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };


  return (
    <>
    <NavigationLayout2 setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
        <Head>
            <title>Search Results | Dukaflani</title>
            <meta name="description" content="Search results page" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box sx={{minHeight: '100vh', backgroundColor: theme.myColors.myBackground, paddingTop: 5, paddingBottom: 10}}>
            <Container maxWidth='lg'>
                <Container sx={{paddingTop: 3}} maxWidth='md'>
                    <Stack direction='row' spacing={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                        <Avatar sx={{ bgcolor: colors.pink[500], width: 56, height: 56 }}>
                            <WhatshotTwoToneIcon fontSize="large" />
                        </Avatar>
                        <Typography variant='h5'>Search Results</Typography>
                    </Stack>
                </Container>
                    <Box sx={{ width: '100%', backgroundColor: theme.myColors.myBackground, borderBottom: '1px solid lightGray' }}>
                        <Container maxWidth='md'>
                            <Tabs value={tabValue} onChange={handleChange} >
                                <Tab label="Videos" />
                                <Tab label="Products" />
                                <Tab label="Events" />
                            </Tabs>
                        </Container>
                    </Box>
                    <Container maxWidth="md">
                        <Box>
                            {
                                {
                                    0: <Typography variant='h5'>Video Results</Typography>,
                                    1: <Typography variant='h5'>Products Results</Typography>,
                                    2: <Typography variant='h5'>Events Results</Typography>,
                                }[tabValue]
                            }
                        </Box>
                    </Container>
            </Container>
        </Box>
    </NavigationLayout2>
    </>
  )
}

export default searchPage