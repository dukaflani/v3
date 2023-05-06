// React Imports
import React, { useState } from 'react';

// Next Imports
import { useRouter } from 'next/router';
import Image from "next/legacy/image";

// NPM Imports
import numeral from 'numeral'
import { formatDistanceStrict } from 'date-fns'

// Tanstack/React Query
import { useMutation, useQueryClient } from '@tanstack/react-query';


// MUI Imports
import { Box, Grid, Typography, Avatar, IconButton, Stack, Tooltip, Link, 
  Skeleton, Menu, MenuItem, List, ListItem, ListItemText, ListItemAvatar, colors } from "@mui/material"
import { useTheme } from '@mui/material/styles';
  
  
  // Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

// Project Imports
import { addView } from '@/axios/axios';



const VideoCard = React.forwardRef(({ video, isLoading }, ref) => {
    const router = useRouter()
    const theme = useTheme()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const videoUploadTime = formatDistanceStrict(
        new Date(video?.date),
        new Date(),
        {
          addSuffix: true,
        },
      );

    const rawViewCount = video?.views_count
    let formatedViewCount = ''
    rawViewCount < 1000 || rawViewCount % 10 === 0 ? formatedViewCount = numeral(rawViewCount).format('0a') :  formatedViewCount = numeral(rawViewCount).format('0.0a')


    const newView = {
      video: video?.id,
      user: 1,
      time: new Date()
    }

    const queryClient = useQueryClient()
    const { mutate } = useMutation(addView, { 
      onSuccess: () => {
        queryClient.invalidateQueries(["videos-list"])
        queryClient.invalidateQueries(["current-video", video.youtube_id])
      }
     })
     
    const handleVideoClick = () => {
      router.push({pathname: '/watch', query: {v: video.youtube_id}})
      mutate(newView)
    }

    const cardBody = (
      <>
        <Box sx={{ minHeight: 260}}>
        <Box sx={{ width: '100%', height: '100%', maxWidth: 350, margin: 'auto'}}>
          {video.thumbnail ? (
            <Box 
              onClick={handleVideoClick}
              sx={{ backgroundColor: colors.grey[200], width: '100%', height: '56.25%', borderRadius: 2, position: "relative", cursor:'pointer'}}
              >
              <Image 
                  src={video.thumbnail} 
                  layout='responsive'
                  alt={video.title}
                  width='100%'
                  height='56.25%'
                  style={{borderRadius: 6}}
                  />
            </Box>
          ) : (<Skeleton animation="wave"  variant="rectangular" sx={{ borderRadius: 2, paddingTop: '56.25%'}} />)}
          
          <Box>
            <Grid container sx={{paddingTop: 1}}>
              <Grid  xs={2} item>
                {video.profile_avatar ? (<Avatar  src={video.profile_avatar} />) : (<Skeleton animation="wave" variant="circular" width={40} height={40} />)}
              </Grid>
              {video.title ? (
                <Grid sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start', paddingLeft: 1, cursor:'pointer'}} xs={9} item>
                <Stack spacing={1}>
                <Link 
                  onClick={(e) => {
                    e.preventDefault()
                    router.push({pathname: '/watch', query: {v: video.youtube_id}})
                    mutate(newView)
                  }}
                  title={video.title}
                  className="line-clamp-2 line-clamp"
                  variant='subtitle2'
                  underline="none"
                  sx={{color: theme.myColors.textDark }}
                  >
                    {video.title}
                  </Link>
                  <Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Tooltip title={video.stage_name} placement="top" >
                        <Typography sx={{letterSpacing: 0}} className="line-clamp-1 line-clamp" variant='body2'>{video.stage_name}</Typography>
                      </Tooltip>
                      {video.verified && <Tooltip title='Verified' placement="top" >
                        <CheckCircleIcon sx={{ fontSize: 15, color: theme.myColors.textDark }} />
                      </Tooltip>}
                    </Stack>
                    <Typography sx={{lineHeight: 1, letterSpacing: 0}} variant='body2'>{formatedViewCount} {formatedViewCount == 1 ? 'view' : 'views'} &bull; {videoUploadTime}</Typography>
                  </Stack>
                </Stack>
              </Grid>
              ) : (
                <Grid sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start', paddingLeft:1}} xs={9} item>
                  <Stack spacing={1} sx={{width: '100%'}}>
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Stack>
                </Grid>
              )}
              
              <Grid sx={{ display: 'flex', alignItems: 'start', justifyContent: 'center'}} xs={1} item>
                <IconButton
                   id="basic-button"
                   aria-controls={open ? 'basic-menu' : undefined}
                   aria-haspopup="true"
                   aria-expanded={open ? 'true' : undefined}
                   onClick={handleClick} 
                   size='small'
                   >
                  <MoreVertIcon fontSize="small" />
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
                      <ListItem onClick={() => router.push({ pathname: `/shop/${video?.product}` })} disableGutters>
                        <ListItemAvatar>
                          <Avatar>
                            <LocalOfferOutlinedIcon /> 
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Go to product details" secondary={`${video?.product_title.substring(0, 20)}...`} />
                      </ListItem>
                    </List>
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

        </>
    )

    const content = ref ? <Box ref={ref}>{ cardBody }</Box> : <Box>{ cardBody }</Box>
    
  
  
    return content
  })


  export default VideoCard;