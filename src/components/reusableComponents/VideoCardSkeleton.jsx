// MUI Imports
import { Box, Grid, IconButton, Stack, Skeleton } from "@mui/material"


// Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';



const VideoCardSkeleton = () => {


    const cardBody = (
      <>
        <Box sx={{ minHeight: 260}}>
        <Box sx={{ width: '100%', height: '100%', maxWidth: 350, margin: 'auto'}}>
          <Skeleton animation="wave"  variant="rectangular" sx={{ borderRadius: 2, paddingTop: '56.25%'}} />
          <Box>
            <Grid container sx={{paddingTop: 1}}>
              <Grid  xs={2} item>
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
              </Grid>
                <Grid sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start', paddingLeft:1}} xs={9} item>
                  <Stack spacing={1} sx={{width: '100%'}}>
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Stack>
                </Grid>
              <Grid sx={{ display: 'flex', alignItems: 'start', justifyContent: 'center'}} xs={1} item>
                <IconButton size='small'>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

        </>
    )

    const content = <Box>{ cardBody }</Box>
    
  
  
    return content
  }


  export default VideoCardSkeleton;