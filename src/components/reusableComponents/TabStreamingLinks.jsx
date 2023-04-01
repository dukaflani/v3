// React Imports
import { useState } from "react"

// MUI Imports
import { Box, Typography, Stack, Paper, CardContent, CardMedia, Card, CardActionArea } from "@mui/material"

// Project Imports
// import logo from '../../public/assets/pictures/Apple-Music.png'

// Icons
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';



export const StreamingLinksCard = ({ cardHovered, i, streamingLink }) => {


  return (
    <Card sx={{width: '100%', marginTop: 1, cursor: 'pointer'}} elevation={cardHovered == i ? 5 : cardHovered == null ? 0 : 0}>
      <CardActionArea>
      <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
        <CardMedia
           component="img"
           sx={{ width: 136 }}
           image={streamingLink?.logo}
           title="Live from space album cover"
           alt="Live from space album cover"
        />
        <CardContent sx={{width: '100%'}}>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
            <Box>
              <Stack>
                <Typography className="line-clamp-1 line-clamp" variant="subtitle2">{streamingLink?.streaming_service.replace('_', ' ')}</Typography>
                <Typography className="line-clamp-1 line-clamp" variant="caption">{streamingLink?.link ? streamingLink?.link : 'no link found'}</Typography>
              </Stack>
            </Box>
            <Box>
              <OpenInNewOutlinedIcon fontSize='small' />
            </Box>
          </Box>
        </CardContent>
      </Box>
      </CardActionArea>
    </Card>
  )
}



const TabStreamingLinks = ({ streamingLinks, data }) => {
  const [cardHovered, setCardHovered] = useState(null)

  const handleMouseIn = (idx) => {
    setCardHovered(idx)
  }

  const handleMouseOut = () => {
    setCardHovered(null)
  }


  return (
    <Box>
        <Stack spacing={2}>
            <Box>
                <Stack>
                    <Typography variant="subtitle2">STREAMING LINKS</Typography>
                    <Typography variant="caption">{`Click on the links below to stream or download ${data?.song_title} by ${data?.stage_name}`}</Typography>
                </Stack>
            </Box>
            <Box>
                {streamingLinks?.map((streamingLink, i) => (
                    <Box 
                        key={i}
                        onMouseEnter={() => handleMouseIn(i)}
                        onMouseLeave={handleMouseOut}
                        >
                        <StreamingLinksCard streamingLink={streamingLink} cardHovered={cardHovered} i={i} />
                    </Box>
                ))}
            </Box>
        </Stack>
    </Box>
  )
}

export default TabStreamingLinks