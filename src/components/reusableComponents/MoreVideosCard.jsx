// React Imports
import React, { useState, useEffect } from 'react';

// Next Imports
import Image from "next/legacy/image";
import { useRouter } from "next/router";

// Tanstack/React Query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// MUI Imports
import { Box, colors, Grid, IconButton, Link, Stack, Tooltip, Typography,
   Menu, MenuItem, List, ListItem, ListItemText, ListItemAvatar, Avatar, useMediaQuery, } from "@mui/material"
import { useTheme } from '@mui/material/styles';

// Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

// NPM Imports
import numeral from 'numeral'
import { formatDistanceStrict } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux';

// Project Imports
import { addProductView, addView } from '@/axios/axios';
import { pageHasChanged, setRegularPageView } from '@/redux/features/navigation/navigationSlice';




const MoreVideosCard = React.forwardRef(({ video, isLoading, setShowMoreVideos }, ref) => {
    const theme = useTheme()
    const currentLoggedInUser = useSelector((state) => state.auth.userInfo)
    const userCountry = useSelector((state) => state.auth.country)
    const userIpAddress = useSelector((state) => state.auth.ip_address)
    const is_darkMode = useSelector((state) => state.theme.isDarkMode)
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [user_country, setUser_country] = useState(null)
    const [user_ip, setUser_ip] = useState(null)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
      setUser_country(userCountry)
      setUser_ip(userIpAddress)
    }, [userCountry, userIpAddress])
    

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
        video_profile: video?.customuserprofile,
        ip_address: user_ip,
        country: user_country,
        referral_url: "https://dukaflani.com",
      }
  
      const queryClient = useQueryClient()
      const { mutate } = useMutation(addView, { 
        onSuccess: () => {
          queryClient.invalidateQueries(["videos-list"])
          queryClient.invalidateQueries(["current-video", video.youtube_id])
        }
       })


       const newProductView = {
        product: video?.product,
        product_profile: video?.customuserprofile,
        ip_address: user_ip,
        country: user_country,
        referral_url: "https://dukaflani.com",
    }

    const { mutate: addNewProductView } = useMutation(addProductView, {
        onSuccess: (data, _variables, _context) => {
        //   console.log("product view success:", data)
        },
        onError: (error, _variables, _context) => {
        //   console.log("product view error:", error)
        },
      })
      

       
      const handleVideoClick = () => {
        dispatch(pageHasChanged(true))
        dispatch(setRegularPageView())
        router.push({pathname: '/watch', query: {v: video.youtube_id}})
        mutate(newView)
      }


    const cardBody = (
        <>
            <Grid container columnSpacing={2} sx={video?.id == 1 ? {display: "none"} : {display: "flex"}}>
                <Grid item xs={4}>
                    <Box onClick={handleVideoClick} sx={{backgroundColor: colors.grey[800], width: '100%', position: 'relative', borderRadius: 2, cursor:'pointer'}}>
                        <Image 
                            src={video.thumbnail} 
                            layout='responsive'
                            width='100%'
                            height='56.25%'
                            alt={video.title}
                            style={{borderRadius: 6}}
                        />
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box sx={{width: '100%', display: 'flex', alignItems: 'start', justifyContent: 'space-between'}}>
                        <Box>
                            <Stack>
                                <Link
                                     onClick={(e) => {
                                        e.preventDefault()
                                        dispatch(pageHasChanged(true))
                                        dispatch(setRegularPageView())
                                        router.push({pathname: '/watch', query: {v: video.youtube_id}})
                                        mutate(newView)
                                      }}
                                      href={`/watch?v=${video.youtube_id}`}
                                      title={video.title}
                                      className="line-clamp-2 line-clamp"
                                      variant='subtitle2'
                                      underline="none"
                                      sx={{color: colors.grey[100], cursor: 'pointer' }}
                                     >
                                        {video.title}
                                </Link>
                                <Stack onClick={() => {
                                      router.push({ pathname: `/${video?.username}` })
                                      dispatch(pageHasChanged(true))
                                      }} direction='row' spacing={0.5}>
                                  <Tooltip title={video.stage_name} placement="top" ><Typography sx={{cursor: 'pointer'}} className="line-clamp-1 line-clamp" variant='body2'>{video.stage_name}</Typography></Tooltip>
                                  {video.verified && <Tooltip title='Verified' placement="top" ><CheckCircleIcon sx={{ fontSize: 15, color: colors.grey[100] }} /></Tooltip>}
                                </Stack>
                                <Stack direction="row" spacing={0.5} sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                                  {video.product_featured == "True" && <Typography sx={{padding: 0, backgroundColor: "#f50057"}} variant='caption'>SHOP</Typography> }
                                  <Typography variant='caption'>{formatedViewCount} {formatedViewCount == 1 ? 'view' : 'views'} &bull; {videoUploadTime}</Typography>
                                </Stack>
                            </Stack>
                        </Box>
                        <Box>
                            {video.product_featured == "True" && <IconButton
                              id="basic-button"
                              aria-controls={open ? 'basic-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                              onClick={handleClick} 
                              size='small'
                            >
                                <MoreVertOutlinedIcon fontSize='small' />
                            </IconButton>}
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
                        dispatch(setRegularPageView())
                        router.push({ pathname: `/shop/${video?.product}` })
                        addNewProductView(newProductView)
                    }} disableGutters>
                        <ListItemAvatar>
                          <Avatar>
                            <LocalOfferOutlinedIcon /> 
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="View details" secondary={`${video?.product_title?.substring(0, 20)}...`} />
                      </ListItem>
                    </List>
                  </MenuItem>
                </Menu>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )

    const content = ref ? <Box ref={ref}>{ cardBody }</Box> : <Box>{ cardBody }</Box>

  return content
})

MoreVideosCard.displayName = 'MoreVideosCard';

export default MoreVideosCard