// React Imports
import { useState } from 'react'

// MUI Imports
import { useMediaQuery, Paper, Box, Stack, Tabs, Tab, Divider } from '@mui/material'

// NPM Imports
import { useSelector } from "react-redux"

// Tanstack Query
import { useQuery } from "@tanstack/react-query"

// Project Imports
import ProfileUserAbout from './ProfileUserAbout'
import ProfilePageVideos from './ProfilePageVideos'
import ProfilePageProducts from './ProfilePageProducts'
import { profileEvents, profileMediaTours, profileProducts, profileVideos } from '@/axios/axios'
import ProfilePageEvents from './ProfilePageEvents'
import ProfilePageMediaTours from './ProfilePageMediaTours'


const ProfileUserItemsTabs = ({ profile }) => {
    const is_darkMode = useSelector((state) => state.theme.isDarkMode)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [value, setValue] = useState("videos")

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    // Profile Username
    const profileUsername = profile?.user

    //   Videos
    const { data: videos, isLoading: loadingVideos } = useQuery(["profile-page-videos", profileUsername], (profileUsername) => profileVideos(profileUsername), {
        enabled: !! profileUsername,
        onSuccess : (_data, _variables, _context) => {
            // setLoadingProfileDialog(false)
            // setShowProfile(true)
        }
    })

    //   Products
    const { data: products, isLoading: loadingProducts } = useQuery(["profile-page-products", profileUsername], (profileUsername) => profileProducts(profileUsername), {
        enabled: !! profileUsername,
        onSuccess : (_data, _variables, _context) => {
            // setLoadingProfileDialog(false)
            // setShowProfile(true)
        }
    })

    //   Events
    const { data: events, isLoading: loadingEvents } = useQuery(["profile-page-events", profileUsername], (profileUsername) => profileEvents(profileUsername), {
        enabled: !! profileUsername,
        onSuccess : (_data, _variables, _context) => {
            // setLoadingProfileDialog(false)
            // setShowProfile(true)
        }
    })

    //   Media Tours
    const { data: mediaTours, isLoading: loadingMediaTours } = useQuery(["profile-page-media-tours", profileUsername], (profileUsername) => profileMediaTours(profileUsername), {
        enabled: !! profileUsername,
        onSuccess : (_data, _variables, _context) => {
            // setLoadingProfileDialog(false)
            // setShowProfile(true)
        }
    })



  return (
    <>
        <Box >
            <Box sx={{paddingBottom: 2}}>
                <Stack sx={{paddingBottom: 2}}>
                    <Box sx={{ width: '100%' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="secondary tabs example"
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                        >
                            <Tab value="videos" label="Videos" />
                            <Tab value="products" label="Products" />
                            <Tab value="events" label="Events" />
                            <Tab value="media" label="Media Tours" />
                        </Tabs>
                    </Box>
                    <Divider/>
                </Stack>
                {
                    {
                        "videos": <ProfilePageVideos videos={videos} loadingVideos={loadingVideos} />,
                        "products": <ProfilePageProducts products={products} loadingProducts={loadingProducts} />,
                        "events": <ProfilePageEvents events={events} loadingEvents={loadingEvents} />,
                        "media": <ProfilePageMediaTours mediaTours={mediaTours} loadingMediaTours={loadingMediaTours} />,
                    }[value]
                }
            </Box>
        </Box>
    </>
  )
}

export default ProfileUserItemsTabs