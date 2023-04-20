// React Imports
import { useState } from 'react'

// Next Image
import Image from "next/legacy/image";
import { useRouter } from 'next/router';

// MUI Imports
import { Box, Button, Paper, Stack, Typography } from "@mui/material"

// Icons
import { HourglassOutlined, RightOutlined } from '@ant-design/icons'

// Project Imports
import ad1 from '../../../public/assets/pictures/dukaflani-banner-1.png'
import ad2 from '../../../public/assets/pictures/dukaflani-banner-2.png'
import ad3 from '../../../public/assets/pictures/dukaflani-banner-3.png'


const Leaderboard3Ads = () => {
    const router = useRouter()
    const [pic1Hovered, setPic1Hovered] = useState(false)
    const [pic2Hovered, setPic2Hovered] = useState(false)
    const [pic3Hovered, setPic3Hovered] = useState(false)
  
    const handleMouseInPic1 = () => {
      setPic1Hovered(true)
    }
  
    const handleMouseOutPic1 = () => {
      setPic1Hovered(false)
    }
    const handleMouseInPic2 = () => {
      setPic2Hovered(true)
    }
  
    const handleMouseOutPic2 = () => {
      setPic2Hovered(false)
    }
    const handleMouseInPic3 = () => {
      setPic3Hovered(true)
    }
  
    const handleMouseOutPic3 = () => {
      setPic3Hovered(false)
    }
  
  
    return (
      <Box sx={{marginTop: 5}}>
        <Stack>
          <Stack direction='row' sx={{paddingX: 3, paddingY: 1.5, borderTopRightRadius: 5, borderTopLeftRadius: 5, display: 'flex', alignItems: 'center', justifyContent:'space-between', backgroundImage: "linear-gradient(to right, #2900be, #1976d2)"}}>
            <Stack direction='row' spacing={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
              <Box >
                <HourglassOutlined style={{fontSize: 25, color: '#ffffff'}}/>
              </Box>
              <Typography sx={{color: 'white'}} variant='subtitle1'>Limited Slots Available</Typography>
            </Stack>
            <Button onClick={() => router.push({ pathname: '/links/contact_us' })} size='small' variant='text' style={{color: 'white'}} endIcon={<RightOutlined style={{color: 'white', fontSize: 15}} />}>Details</Button>
          </Stack>
          <Paper square>
            <Stack direction="row" sx={{padding: 1}} >
              <Stack onClick={() => router.push({ pathname: '/links/contact_us' })} onMouseEnter={handleMouseInPic1} onMouseLeave={handleMouseOutPic1} xs={4} sx={{width: '100%', height: '56.25%'}}>
                <Paper elevation={pic1Hovered ? 10 : 0} sx={{ width: '100%', height: '100%', position: "relative", cursor:'pointer'}}>
                  <Image 
                      src={ad1} 
                      layout='responsive'
                      alt='Banner Ad'
                      />
                </Paper>
              </Stack>
              <Stack onClick={() => router.push({ pathname: '/links/contact_us' })} onMouseEnter={handleMouseInPic2} onMouseLeave={handleMouseOutPic2} xs={4} sx={{width: '100%', height: '56.25%'}}>
                <Paper elevation={pic2Hovered ? 10 : 0} sx={{ width: '100%', height: '100%', position: "relative", cursor:'pointer'}}>
                  <Image 
                      src={ad2} 
                      layout='responsive'
                      alt='Banner Ad'
                      />
                </Paper>
              </Stack>
              <Stack onClick={() => router.push({ pathname: '/links/contact_us' })} onMouseEnter={handleMouseInPic3} onMouseLeave={handleMouseOutPic3} xs={4} sx={{width: '100%', height: '56.25%'}}>
                <Paper elevation={pic3Hovered ? 10 : 0} sx={{ width: '100%', height: '100%', position: "relative", cursor:'pointer'}}>
                  <Image 
                      src={ad3} 
                      layout='responsive'
                      alt='Banner Ad'
                      />
                </Paper>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    )
  }

  export default Leaderboard3Ads;