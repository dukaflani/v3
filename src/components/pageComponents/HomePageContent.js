// Next Imports
import { useRouter } from 'next/router';

// MUI Imports
import { Box, Grid, Stack, Typography, Container, IconButton, Tooltip, Link } from "@mui/material"

// Components
import ProductsComponent from './ProductsComponent'
import EventsComponent from './EventsComponent'
import VideosComponent from './VideosComponent'

// Icons
import { UserOutlined, CloudUploadOutlined, LayoutOutlined, SettingOutlined } from '@ant-design/icons'
import { pageHasChanged } from '@/redux/features/navigation/navigationSlice';
import { useDispatch } from 'react-redux';




const HomePageContent = ({ value }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid item md={1}>
        <Box sx={{display: { xs: 'none', md: 'block' }}}>
          <Stack 
              spacing={2} 
              sx={{ minHeight: '100vh', paddingTop: 2, position: 'fixed', top: 110, left: 30}}>
            <Tooltip title="Profile" placement="right">
              <IconButton onClick={() => {
                dispatch(pageHasChanged(true))
                router.push({ pathname: '/account/profile' }
                )}}>
                <LayoutOutlined style={{ fontSize: 24 }} />
              </IconButton>    
            </Tooltip>
            <Tooltip title="User Settings" placement="right">
              <IconButton onClick={() => {
                dispatch(pageHasChanged(true))
                router.push({ pathname: '/' })
                }} >
                <UserOutlined style={{ fontSize: 24 }} />
              </IconButton>    
            </Tooltip>
            <Tooltip title="Creator's Hub" placement="right">
            <Link href='https://hub.dukaflani.com' underline='none' target="_blank" rel="noopener">
              <IconButton>
                <CloudUploadOutlined style={{ fontSize: 24 }} />
              </IconButton>    
            </Link>
            </Tooltip>
            <Tooltip title="Profle Settings" placement="right">
              <IconButton onClick={() => {
                dispatch(pageHasChanged(true))
                router.push({ pathname: '/account/profile/settings' }
                )}}>
                <SettingOutlined style={{ fontSize: 24 }} />
              </IconButton>    
            </Tooltip>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} md={11}>
        <Container maxWidth='xl'>
          <Box sx={{ paddingTop: { xs: 0, md: 2 }, minHeight: '100vh', paddingX: { xs: 0, sm: 2 }}}>
            {
              {
                  0 : <VideosComponent/>,
                  1 : <ProductsComponent/>,
                  2 : <EventsComponent/>,
              }[value]
            }
          </Box>
        </Container>
      </Grid>
    </Grid>
  </Box>
  )
}

export default HomePageContent