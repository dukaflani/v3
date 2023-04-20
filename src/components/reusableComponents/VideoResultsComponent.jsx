// MUI Imports
import { Box, Typography } from '@mui/material'

// NPM Imports
import { useSelector } from 'react-redux'

// Project Imports
import VideoResultsCard from './VideoResultsCard'

const videoResultsComponent = ({ isLoading, videos }) => {

  const searchTerm = useSelector((state) => state.search.searchTerm)


  return (
    <Box>
        {isLoading && <Typography variant='body2'>Loading videos...</Typography>}
        {videos?.length == 0 && <Typography variant='body2'>{`Oops! Looks like there are no videos available for "${searchTerm}"`}</Typography>}
        {videos?.map((video, i) => (
            <Box key={i} sx={{marginBottom: 3}}>
              <VideoResultsCard video={video} />
            </Box>
        ))}
    </Box>
  )
}

export default videoResultsComponent