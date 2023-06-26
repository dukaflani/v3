// React Imports
import { useState } from 'react';

// NextJS Imports
import { useRouter } from 'next/router';

// MUI Imports
import { Box, Typography, Grid, Card, CardHeader, Avatar, Stack, Tooltip, useMediaQuery, 
  colors, CardContent, Divider, Paper, IconButton, Menu, MenuItem, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

// NPM Imports
import { useDispatch, useSelector } from 'react-redux'
import numeral from 'numeral';

// Project Imports
import VideoResultsCard from './VideoResultsCard'

// Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

// Project Imports
import { pageHasChanged } from '@/redux/features/navigation/navigationSlice';






const VideoResultsComponent = ({ isLoading, videos, profile }) => {
  const is_darkMode = useSelector((state) => state.theme.isDarkMode)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const searchTerm = useSelector((state) => state.search.searchTerm)
  const router = useRouter() 
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box>
        {isLoading && <Typography variant='body2'>Loading links...</Typography>}
        {videos?.length == 0 && <Typography variant='body2'>{`Oops! Looks like there are no links available for "${searchTerm}"`}</Typography>}
        <Grid container>
          {profile && <Grid item xs={12} sx={{display: {xs: 'block', sm: 'none'}, paddingY: 2}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Stack onClick={() => {
                        dispatch(pageHasChanged(true))
                        router.push({ pathname: `/${profile?.username}` })
                    }} direction="row" spacing={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Avatar sx={{height: 60, width: 60}} src={profile?.profile_avatar} />
                <Stack>
                  <Stack direction="row" spacing={1} sx={{cursor: 'pointer'}}>
                    <Typography variant="subtitle2">{profile?.stage_name}</Typography>
                    {profile?.is_verified == "True" && <CheckCircleIcon sx={is_darkMode === "dark" || prefersDarkMode === true ? { fontSize: 15, color: colors.grey[100] } : is_darkMode === "light" && prefersDarkMode === true ?  { fontSize: 15, color: colors.grey[800] } : { fontSize: 15, color: colors.grey[800] }} />}
                  </Stack>
                  <Typography variant="caption">{profile?.role}</Typography>
                </Stack>
              </Stack>
              <Box>
                <IconButton 
                      size='small' 
                      aria-label="go to profile" 
                      sx={{cursor: 'pointer'}}
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick} 
                      >
                    <MoreVertIcon fontSize='small' />
                  </IconButton>
                  {/* Video Options Menu */}
                  <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleClose}>
                    <List>
                      <ListItem onClick={() => {
                        dispatch(pageHasChanged(true))
                        router.push({ pathname: `/${profile?.username}` })
                    }} disableGutters>
                        <ListItemAvatar>
                          <Avatar>
                            <AccountBoxIcon /> 
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Go to profile" secondary={profile?.stage_name?.length > 19 ? `${profile?.stage_name?.substring(0, 20)}...` : `${profile?.stage_name}`} />
                      </ListItem>
                    </List>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          <Divider sx={{paddingY: 2}}/>
          </Grid>}
          <Grid item xs={12} sm={8} sx={{paddingRight: {xs: 0, sm: 3}}}>
          {videos?.map((video, i) => (
              <Box key={i} sx={{marginBottom: 3}}>
                <VideoResultsCard video={video} />
              </Box>
          ))}
          </Grid>
          <Grid item sm={4} sx={{display: {xs: 'none', sm: 'block'}}} >
           {profile && <Card variant="outlined">
              <CardHeader
                  avatar={
                    <Box onClick={() => {
                      dispatch(pageHasChanged(true))
                      router.push({ pathname: `/${profile?.username}` })
                  }}>
                      <Avatar src={profile?.profile_avatar} />
                    </Box>
                  }
                  action={
                    <>
                        <IconButton 
                            size='small' 
                            aria-label="go to profile" 
                            sx={{cursor: 'pointer'}}
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick} 
                            >
                          <MoreVertIcon fontSize='small' />
                        </IconButton>
                        {/* Video Options Menu */}
                        <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem onClick={handleClose}>
                          <List>
                            <ListItem onClick={() => {
                              dispatch(pageHasChanged(true))
                              router.push({ pathname: `/${profile?.username}` })
                          }} disableGutters>
                              <ListItemAvatar>
                                <Avatar>
                                  <AccountBoxIcon /> 
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="Go to profile" secondary={profile?.stage_name?.length > 19 ? `${profile?.stage_name?.substring(0, 20)}...` : `${profile?.stage_name}`} />
                            </ListItem>
                          </List>
                        </MenuItem>
                      </Menu>
                    </>
                  }
                  title={
                    <Stack onClick={() => {
                      dispatch(pageHasChanged(true))
                      router.push({ pathname: `/${profile?.username}` })
                  }} direction="row" spacing={1} sx={{cursor: 'pointer'}}>
                      <Tooltip title={profile?.stage_name} placement="top" >
                        <Typography variant="body2">{profile?.stage_name}</Typography>
                      </Tooltip>
                      {profile?.is_verified == "True" && <Tooltip title='Verified' placement="top" >
                          <CheckCircleIcon sx={is_darkMode === "dark" || prefersDarkMode === true ? { fontSize: 15, color: colors.grey[100] } : is_darkMode === "light" && prefersDarkMode === true ?  { fontSize: 15, color: colors.grey[800] } : { fontSize: 15, color: colors.grey[800] }} />
                        </Tooltip>}
                    </Stack>
                  }
                  subheader={profile?.role}
                />
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant='subtitle2'>About:</Typography>
                    <Divider/>
                    <Typography sx={{whiteSpace: 'pre-line'}} className='line-clamp line-clamp-5' variant='body2'>{profile?.about}</Typography>
                    <Box sx={{paddingTop: 2}}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Paper sx={{padding: 1}} variant='outlined'>
                            <Stack>
                              <Typography variant='subtitle2'>Links:</Typography>
                              <Typography variant='subtitle2'>{numeral(profile?.video_count ).format('0,0')}</Typography>
                            </Stack>
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper sx={{padding: 1}} variant='outlined'>
                            <Stack>
                              <Typography variant='subtitle2'>Products:</Typography>
                              <Typography variant='subtitle2'>{numeral(profile?.product_count).format('0,0')}</Typography>
                            </Stack>
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper sx={{padding: 1}} variant='outlined'>
                            <Stack>
                              <Typography variant='subtitle2'>Events:</Typography>
                              <Typography variant='subtitle2'>{numeral(profile?.events_count).format('0,0')}</Typography>
                            </Stack>
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper sx={{padding: 1}} variant='outlined'>
                            <Stack>
                              <Typography variant='subtitle2'>Media Tours:</Typography>
                              <Typography variant='subtitle2'>{numeral(profile?.media_tours_count).format('0,0')}</Typography>
                            </Stack>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </Stack>
                </CardContent>
            </Card>}
          </Grid>
        </Grid>
    </Box>
  )
}

export default VideoResultsComponent