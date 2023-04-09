// React Imports
import { useState } from "react"

// MUI Imports
import { Box, Typography, Stack, Paper, CardContent, CardMedia, Card, CardActionArea, Grid, Link } from "@mui/material"

// Project Imports
// import logo from '../../public/assets/pictures/Apple-Music.png'

// Icons
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';



export const StreamingLinksCard = ({ cardHovered, i, streamingLink }) => {


  return (
    <Link href={streamingLink?.link} underline="none" target="_blank" rel="noopener">
      <Card sx={{width: '100%', marginTop: 1, cursor: 'pointer'}} elevation={cardHovered == i ? 5 : cardHovered == null ? 0 : 0}>
        <CardActionArea>
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
          <CardMedia
            component="img"
            sx={{ width: 136 }}
            image={streamingLink?.logo}
            title={streamingLink?.streaming_service.replace('_', ' ')}
            alt={streamingLink?.streaming_service.replace('_', ' ')}
          />
          <CardContent sx={{width: '100%'}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
              <Box>
                <Stack>
                  <Typography className="line-clamp-1 line-clamp" variant="subtitle2">{streamingLink?.streaming_service.replace('_', ' ')}</Typography>
                  <Typography sx={{width: {xs:140, sm:200, md:70, lg:110}, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} variant="caption">{streamingLink?.link ? streamingLink?.link : 'no link found'}</Typography>
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
    </Link>
  )
}

export const StreamingLinksDefaultCard = ({ defaultCardHovered, youtubeID }) => {


  return (
    <Link href={`https://www.youtube.com/watch?v=${youtubeID}`} underline="none" target="_blank" rel="noopener">
      <Card sx={{width: '100%', marginTop: 1, cursor: 'pointer'}} elevation={defaultCardHovered == "a" ? 5 : defaultCardHovered == null ? 0 : 0}>
        <CardActionArea>
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
          <CardMedia
            component="img"
            sx={{ width: 136 }}
            image= "https://dukaflani-user-uploads.s3.amazonaws.com/default/YouTube.png"
            title="YouTube"
            alt="YouTube"
          />
          <CardContent sx={{width: '100%',}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
              <Box>
                <Stack>
                  <Typography className="line-clamp-1 line-clamp" variant="subtitle2">YouTube</Typography>
                  <Typography sx={{width: {xs:140, sm:200, md:70, lg:110}, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} variant="caption">{`https://www.youtube.com/watch?v=${youtubeID}`}</Typography>
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
    </Link>
  )
}



const TabStreamingLinks = ({ streamingLinks, data, youtubeID }) => {
  const [cardHovered, setCardHovered] = useState(null)
  const [defaultCardHovered, setDefaultCardHovered] = useState(null)

  const handleMouseIn = (idx) => {
    setCardHovered(idx)
  }

  const handleMouseOut = () => {
    setCardHovered(null)
  }

  const handleMouseInDefaultCard = () => {
    setDefaultCardHovered("a")
  }

  const handleMouseOutDefaultCard = () => {
    setDefaultCardHovered(null)
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
              {data && <Box
                onMouseEnter={handleMouseInDefaultCard}
                onMouseLeave={handleMouseOutDefaultCard}
              >
                <StreamingLinksDefaultCard defaultCardHovered={defaultCardHovered} youtubeID={youtubeID} i={"a"} />
              </Box>}
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