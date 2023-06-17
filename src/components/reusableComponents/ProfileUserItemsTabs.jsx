// React Imports
import { useMemo, useState } from 'react'

// MUI Imports
import {  Box, Stack, Tabs, Tab, Divider } from '@mui/material'

// Tanstack Query
import { useQuery } from "@tanstack/react-query"

// Project Imports
import ProfilePageVideos from './ProfilePageVideos'
import ProfilePageProducts from './ProfilePageProducts'
import { profileEvents, profileMediaTours, profileProducts, profileVideos } from '@/axios/axios'
import ProfilePageEvents from './ProfilePageEvents'
import ProfilePageMediaTours from './ProfilePageMediaTours'
import { isAdminOrArtistProfile, isPromoterProfile, isVendorProfile } from '@/utils/checkRole'


const ProfileUserItemsTabs = ({ profile }) => {
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

    const tabButtons = useMemo(
        () => [
            ...isAdminOrArtistProfile(profile) ? [
                {
                    value: "videos",
                    label: "Videos",
                },
                {
                    value: "products",
                    label: "Products",
                },
                {
                    value: "events",
                    label: "Events",
                },
                {
                    value: "media",
                    label: "Media Tours",
                },
            ] : [],
            ...isVendorProfile(profile) ? [
                {
                    value: "products",
                    label: "Products",
                },
                {
                    value: "media",
                    label: "Media Tours",
                },
            ] : [],
            ...isPromoterProfile(profile) ? [
                {
                    value: "events",
                    label: "Events",
                },
                {
                    value: "media",
                    label: "Media Tours",
                },
            ] : []
        ], [profile])



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
                            {tabButtons?.map((tabButton, i) => (
                                <Tab key={i} value={tabButton.value} label={tabButton.label} />
                            ))}
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