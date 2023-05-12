// NextJs Imports
import { useRouter } from 'next/router'

// MUI Imports
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

// Project imports
import { months } from '@/data/months';


export const TabEventCard = ({ event, videoUserID }) => {
  const theme = useTheme()
  const router = useRouter()

  const date = event?.date
  const time = event?.time
  const dateArray = date?.split("-").map(Number);
  const timeArray = time?.split(":").map(Number);
  const year = event?.date ? dateArray[0] : null
  const month = event?.date ? dateArray[1] : null
  const monthWithoutLeadingZero = parseInt(month,10)
  const monthFormatted =  months[monthWithoutLeadingZero - 1]
  const day = event?.date ? dateArray[2] : null
  const hours = event?.time ? timeArray[0] : null
  const minutes = event?.time ? timeArray[1] : null


  return (
    <Box sx={{paddingTop: 2}}>
      <Stack>
        <Box>
          <Typography sx={{color: 'whitesmoke', backgroundColor: theme.myColors.textDark}} variant='caption'>{event?.event_type?.toUpperCase()}</Typography>
        </Box>
        <Card onClick={() => router.push({ pathname: `/events/${event?.id}`, query: {a: videoUserID} }) } square>
              <CardContent>
                <Stack spacing={1}>
                  <Stack spacing={0.4}>
                    <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                      <LocationOnOutlinedIcon fontSize='small' />
                      <Typography className="line-clamp-1 line-clamp" variant='caption'>{event?.venue}</Typography>
                    </Stack>
                    <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                      <FlagOutlinedIcon fontSize='small' />
                      <Typography className="line-clamp-1 line-clamp" variant='caption'>{event?.location}</Typography>
                    </Stack>
                    <Stack sx={{display: 'flex', alignItems: 'center'}} direction='row' spacing={1}>
                      <PublicOutlinedIcon fontSize='small' />
                      <Typography className="line-clamp-1 line-clamp" variant='caption'>{`${event?.city}, ${event?.country}`}</Typography>
                    </Stack>
                  </Stack>
                  <Typography className="line-clamp-2 line-clamp" variant='subtitle2'>{event?.title}</Typography>
                  <Box sx={{border: '1px solid lightgrey', paddingTop: 1}}>
                    <Stack sx={{textAlign: 'center'}}>
                      <Typography variant='subtitle2'>{`${day} ${monthFormatted?.toUpperCase()} ${year}`}</Typography>
                      <Typography variant='caption'>{`${hours}:${minutes?.toString().padStart(2, '0')}hrs`}</Typography>
                    </Stack>
                  </Box>
                  <Box sx={{width: '100%', paddingTop: 1}}>
                      <Button startIcon={<LocalActivityOutlinedIcon/>} fullWidth variant='contained' size="small" >Event Details</Button>
                  </Box>
                </Stack>
              </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}


const TabEventsCards = ({ data, events, videoUserID, loadingEvents }) => {
  return (
    <Box>
        <Stack spacing={2}>
            <Box>
                <Stack>
                    <Typography variant="subtitle2">EVENTS & TOUR DATES</Typography>
                    {loadingEvents ? (<Typography variant="caption">Loading music collection...</Typography>) : (<Typography variant="caption">{`Discover events featuring both performance or appearances by ${data?.stage_name}`}</Typography>)}
                </Stack>
            </Box>
            {events?.length == 0 && <Card>
              <CardContent>
                <Typography variant='body2'>{`${data?.stage_name} has not added any events yet.`}</Typography>
              </CardContent>
            </Card>}
            {events?.length > 0 && <Box>
                {events?.map((event, i) => (
                    <Box key={i}>
                        <TabEventCard event={event} videoUserID={videoUserID} />
                    </Box>
                ))}
            </Box>}
        </Stack>
    </Box>
  )
}

export default TabEventsCards
