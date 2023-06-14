// MUI Imports
import { Box, Stack, Typography, Divider } from '@mui/material'

// NPM Imports
import numeral from 'numeral';



const ProfileUserAbout = ({ profile }) => {
  return (
    <Box sx={{paddingTop: 2}}>
        <Stack spacing={2}>
            <Stack>
                <Typography variant="body2">{`Fanbase: ${numeral(profile?.fanbase_count).format('0,0')}`}</Typography>
                <Typography variant="body2">{`Account: "${profile?.role}"`}</Typography>
            </Stack>
            <Divider/>
            <Box>
                <Typography sx={{whiteSpace: 'pre-line'}} variant="body2">{profile?.about}</Typography>
            </Box>
        </Stack>
    </Box>
  )
}

export default ProfileUserAbout