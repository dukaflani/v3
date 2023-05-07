// React Imports
import React, { useRef, useCallback } from 'react';

// MUI Imports
import { Box, Grid, Typography, CircularProgress } from "@mui/material"

// TanStack/React-Query
import { useInfiniteQuery } from '@tanstack/react-query';

// Project Imports
import { getVideosPage } from '@/axios/axios';
import VideoCard from '../reusableComponents/VideoCard'
import VideoCardSkeleton from '../reusableComponents/VideoCardSkeleton'



const VideosComponent = () => {

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
    isLoading,
    isFetching
  } = useInfiniteQuery(["videos-list"], ({ pageParam = 1 }) => getVideosPage(pageParam), {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined
    }
  })

  const intObserver = useRef()
  const lastVideoRef = useCallback(video => {
    if (isFetchingNextPage) return

    if (intObserver.current) intObserver.current.disconnect()

    intObserver.current = new IntersectionObserver(videos => {
      if (videos[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })

    if (video) intObserver.current.observe(video)
  }, [isFetchingNextPage, fetchNextPage, hasNextPage])

  // if (status === 'error') return <p>Error: {error.message}</p>

  if (isLoading) {
    return (
      <Box>
        <Grid container rowSpacing={1} columnSpacing={2}>
          {[...Array(10).keys()].map((card, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <VideoCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

const content = data?.pages?.map(pg => {
    return pg?.map((video, i) => {
      if (pg.length === i + 1) {
          return  <Grid item xs={12} sm={6} md={4} lg={3} key={i} ref={lastVideoRef} ><VideoCard isLoading={isLoading} video={video} /></Grid>
      } 
      return  <Grid item xs={12} sm={6} md={4} lg={3} key={i}><VideoCard isLoading={isLoading} video={video} /></Grid>
    })
})
  
  

  return (
      <Box>
        <Grid container rowSpacing={5} columnSpacing={2}>
          { content }
        </Grid>
        { error?.response?.status === 404 ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Typography variant='body2'>No More Videos...</Typography></Box> : <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress /></Box> }
      </Box>
  )
}

export default VideosComponent