// React Imports
import { useState } from 'react'

// MUI Imports
import { useMediaQuery, Paper, Box, Typography, Stack, Tabs, Tab, Divider } from '@mui/material'

// NPM Imports
import { useSelector } from "react-redux"

// Project Imports
import ProfileUserContacts from './ProfileUserContacts'
import ProfileUserAbout from './ProfileUserAbout'
import Copyright from './Copyright'


const ProfileUserTabs = ({ profile }) => {
    const is_darkMode = useSelector((state) => state.theme.isDarkMode)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [value, setValue] = useState("business")

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };


  return (
    <>
        {/* <Paper elevation={2} variant={is_darkMode === "dark" || prefersDarkMode === true ? "outlined" : is_darkMode === "light" && prefersDarkMode === true ? "elevation" : "elevation"} sx={{padding: 2}}> */}
        <Paper  variant="outlined" sx={{padding: 2}}>
            <Box>
                <Stack>
                    <Typography variant="subtitle2">Info:</Typography>
                    <Box sx={{ width: '100%' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="secondary tabs example"
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                        >
                            <Tab value="business" label="For Business" />
                            <Tab value="about" label="About" />
                        </Tabs>
                    </Box>
                    <Divider/>
                </Stack>
                {
                    {
                        "business": <ProfileUserContacts profile={profile} />,
                        "about": <ProfileUserAbout profile={profile} />,
                    }[value]
                }
            </Box>
        </Paper>
        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
            <Copyright/>
        </Box>
    </>
  )
}

export default ProfileUserTabs