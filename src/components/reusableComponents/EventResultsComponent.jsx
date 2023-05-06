// MUI Imports
import { Box, Grid, Typography } from '@mui/material'

// NPM Imports
import { useSelector } from 'react-redux'

// Project Imports
import EventResultsCard from './EventResultsCard'

const EventResultsComponent = ({ isLoading, events }) => {

  const searchTerm = useSelector((state) => state.search.searchTerm)



  return (
    <Box>
        {isLoading && <Typography variant='body2'>Loading events...</Typography>}
        {events?.length == 0 && <Typography variant='body2'>{`Oops! Looks like there are no events available for "${searchTerm}"`}</Typography>}
        <Grid container spacing={3}>
          {events?.map((event, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <EventResultsCard event={event} />
              </Grid>
          ))}
        </Grid>
    </Box>
  )
}

export default EventResultsComponent