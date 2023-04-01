// React Imports
import React, { useState } from 'react';

// Next Imports
import Image from "next/legacy/image";
import { useRouter } from "next/router";

// MUI Imports
import { Box, colors, Grid, IconButton, Link, Stack, Tooltip, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles';

// Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

// NPM Imports
import numeral from 'numeral'
import { formatDistanceStrict } from 'date-fns'




const MoreVideosCard = React.forwardRef(({ video, isLoading }, ref) => {
    const theme = useTheme()
    const router = useRouter()

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

    const cardBody = (
        <>
            <Grid container columnSpacing={2}>
                <Grid item xs={4}>
                    <Box onClick={() => router.push({pathname: '/watch', query: {v: video.youtube_id}})} sx={{backgroundColor: colors.grey[200], width: '100%', height: '56.25%', position: 'relative', borderRadius: 2, cursor:'pointer'}}>
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
                                        router.push({pathname: '/watch', query: {v: video.youtube_id}})
                                      }}
                                      title={video.title}
                                      className="line-clamp-2 line-clamp"
                                      variant='subtitle2'
                                      underline="none"
                                      sx={{color: theme.myColors.textDark, cursor: 'pointer' }}
                                     >
                                        {video.title}
                                </Link>
                                <Stack direction='row' spacing={0.5}>
                                <Tooltip title={video.stage_name} placement="top" ><Typography sx={{cursor: 'pointer'}} className="line-clamp-1 line-clamp" variant='body2'>{video.stage_name}</Typography></Tooltip>
                                {video.verified && <Tooltip title='Verified' placement="top" ><CheckCircleIcon sx={{ fontSize: 15, color: theme.myColors.textDark }} /></Tooltip>}
                                </Stack>
                                <Typography variant='body2'>{formatedViewCount} {formatedViewCount == 1 ? 'view' : 'views'} &bull; {videoUploadTime}</Typography>
                            </Stack>
                        </Box>
                        <Box>
                            <IconButton>
                                <MoreVertOutlinedIcon fontSize='small' />
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )

    const content = ref ? <Box ref={ref}>{ cardBody }</Box> : <Box>{ cardBody }</Box>

  return content
})

export default MoreVideosCard