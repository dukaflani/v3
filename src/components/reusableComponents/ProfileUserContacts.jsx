// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, Stack, Typography } from '@mui/material'

// Project Imports
import { countriesChoices } from "@/data/countries"



const ProfileUserContacts = ({ profile }) => {
    const [profile_nationality, setProfile_nationality] = useState(null)
    const [profileCountry, setProfileCountry] = useState(null)

    useEffect(() => {
        setProfile_nationality(countriesChoices.filter((country) => country.code === profile?.nationality))
    }, [])

    useEffect(() => {
        setProfileCountry(profile_nationality && profile_nationality[0]?.label)
    }, [profile_nationality])
    
    

  return (
    <Box sx={{paddingTop: 2}}>
        <Stack spacing={2}>
            <Stack>
                <Typography variant="subtitle2">&bull; Country</Typography>
                <Typography variant="caption">{profileCountry}</Typography>
            </Stack>
            <Stack>
                <Typography variant="subtitle2">&bull; Management</Typography>
                <Typography variant="caption">{profile?.management}</Typography>
            </Stack>
            <Stack>
                <Typography variant="subtitle2">&bull; Booking Email</Typography>
                <Typography variant="caption">{profile?.booking_email}</Typography>
            </Stack>
            <Stack>
                <Typography variant="subtitle2">&bull; Booking Contact</Typography>
                <Typography variant="caption">{profile?.booking_contact}</Typography>
            </Stack>
        </Stack>
    </Box>
  )
}

export default ProfileUserContacts