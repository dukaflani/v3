// Next Imports
import { useRouter } from 'next/router';

// MUI Imports
import { Box, Stack, IconButton, Tooltip, Link } from "@mui/material"

// NPM Imports
import { useDispatch, useSelector } from 'react-redux';

// Icons
import { UserOutlined, LayoutOutlined, SettingOutlined } from '@ant-design/icons'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

// Product Imports
import { pageHasChanged } from '@/redux/features/navigation/navigationSlice';

const HomePageSideIcons = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.auth.userInfo)


  return (
    <Box sx={{display: { xs: 'none', md: 'block' }}}>
          <Stack 
              spacing={2} 
              sx={{ minHeight: '100vh', paddingTop: 2, position: 'fixed', top: 110, left: 30}}>
            <Tooltip title="My Profile" placement="right">
              <IconButton onClick={() => {
                dispatch(pageHasChanged(true))
                router.push({ pathname: `/${currentUser?.username}` })
                }}>
                <LayoutOutlined style={{ fontSize: 24 }} />
              </IconButton>    
            </Tooltip>
            {/* <Tooltip title="User Settings" placement="right">
              <IconButton onClick={() => {
                dispatch(pageHasChanged(true))
                router.push({ pathname: '/' })
                }}>
                <UserOutlined style={{ fontSize: 24 }} />
              </IconButton>    
            </Tooltip> */}
            <Tooltip title="Creator's Hub" placement="right">
            <Link href='https://hub.dukaflani.com' underline='none' target="_blank" rel="noopener">
              <IconButton>
                <DashboardOutlinedIcon style={{ fontSize: 24 }} />
              </IconButton>    
              </Link>
            </Tooltip>
            <Tooltip title="Profile Settings" placement="right">
              <IconButton onClick={() => {
                dispatch(pageHasChanged(true))
                router.push({ pathname: '/account/profile/settings' })
                }}>
                <SettingOutlined style={{ fontSize: 24 }} />
              </IconButton>    
            </Tooltip>
          </Stack>
        </Box>
  )
}

export default HomePageSideIcons