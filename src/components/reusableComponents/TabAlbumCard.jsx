// React Imports
import { useState } from 'react'

// NextJS Imports
import { useRouter } from 'next/router';

// MUI Imports
import { Box, Card, CardActionArea, CardContent, CardMedia, Divider, Link, Paper, Stack, Typography, colors } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Icons
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

export const TabAlbumTrackCard = ({ albumTrackHovered, i, albumTrack }) => {
  const theme = useTheme()
  const router = useRouter()
 
  return (
    <Card square sx={{marginTop: 1}} elevation={albumTrackHovered == i ? 1 : albumTrackHovered == null ? 0 : 0}>
      <CardActionArea>
        <CardContent>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Stack sx={{width: '100%'}}>
              <Typography className="line-clamp-1 line-clamp" variant='subtitle2'>{albumTrack?.title}</Typography>
              <Divider/>
              <Typography className="line-clamp-1 line-clamp" variant='caption'>{albumTrack?.featuring ? `ft. ${albumTrack?.featuring}` : "Solo Project"}</Typography>
            </Stack>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 1}} >
              {albumTrack?.video ? <PlayCircleIcon onClick={() => router.push({pathname: '/watch', query: {v: albumTrack.youtube_id}})} sx={{color: theme.myColors.textDark}} /> : <PlayCircleIcon sx={{color: colors.grey[100]}} />}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}


const TabAlbumCard = ({ album, data, albumTracks }) => {
  const theme = useTheme()
  const [albumHovered, setAlbumHovered] = useState(false)

  const handleMouseIn = () => {
    setAlbumHovered(true)
  }

  const handleMouseOut = () => {
    setAlbumHovered(false)
  }


  const [albumTrackHovered, setAlbumTrackHovered] = useState(null)

  const handleMouseIn2 = (idx) => {
    setAlbumTrackHovered(idx)
  }

  const handleMouseOut2 = () => {
    setAlbumTrackHovered(null)
  }


  return (
    <Box>
        <Stack spacing={2}>
            <Box>
                <Stack>
                    <Typography variant="subtitle2">MUSIC COLLECTION</Typography>
                    <Typography variant="caption">{`Explore more from ${album?.title} the ${album?.album_type} by ${data?.stage_name}`}</Typography>
                </Stack>
            </Box>
            <Card square>
              <CardContent>
            <Stack spacing={3}>
              <Link href={album?.link} underline="none" target="_blank" rel="noopener">
                <Card square elevation={albumHovered ? 5 : 1} onMouseEnter={handleMouseIn} onMouseLeave={handleMouseOut}>
                <CardActionArea>
                    <CardMedia
                      sx={{ height: 300 }}
                      image={album?.cover}
                      title={album?.title}
                    />
                  <CardContent>
                    <Stack>
                      <Stack spacing={0.5} direction='row'>
                          <Typography variant='subtitle2'>{data?.stage_name}</Typography>
                          {data?.verified && <CheckCircleIcon sx={{ fontSize: 15, color: theme.myColors.textDark }} />}                   
                      </Stack>
                      <Typography variant='body2'>{album?.title}</Typography>
                      <Typography variant='body2'>{albumTracks?.length} {albumTracks?.length == 1 ? "Track" : "Tracks"}</Typography>
                      <Stack sx={{cursor: 'pointer'}} direction='row' spacing={1}>
                        <Typography sx={{color: albumHovered && '#1976d2'}} variant='body2'>{`${album?.option_type} ${album?.link_title}`}</Typography>
                        <OpenInNewOutlinedIcon fontSize='small' sx={{color: albumHovered && '#1976d2'}} />
                      </Stack>
                    </Stack>
                  </CardContent>
                  </CardActionArea>
                </Card>
                </Link>
                <Box>
                    {albumTracks?.map((albumTrack, i) => (
                        <Box onMouseEnter={() => handleMouseIn2(i)} onMouseLeave={handleMouseOut2} key={i}>
                            <TabAlbumTrackCard albumTrack={albumTrack} albumTrackHovered={albumTrackHovered} i={i} />
                        </Box>
                    ))}
                </Box>
            </Stack>
              </CardContent>
            </Card>
        </Stack>
    </Box>
  )
}

export default TabAlbumCard