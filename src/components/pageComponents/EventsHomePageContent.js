// MUI Imports
import { Box, Grid, Container } from "@mui/material"

// Components
import EventsComponent from './EventsComponent'

// Icons
import HomePageSideIcons from '../reusableComponents/HomePageSideIcons';




const HomePageContent = ({ value }) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid item md={1}>
        <HomePageSideIcons/>
      </Grid>
      <Grid item xs={12} md={11}>
        <Container maxWidth='xl'>
          <Box sx={{ paddingTop: { xs: 0, md: 2 }, minHeight: '100vh', paddingX: { xs: 0, sm: 2 }}}>
            <EventsComponent/>
          </Box>
        </Container>
      </Grid>
    </Grid>
  </Box>
  )
}

export default HomePageContent