// React Imports
import React, { useRef, useCallback } from 'react';

// Nextjs Imports
import { useRouter } from "next/router";

// MUI Imports
import { Box, CircularProgress, Typography } from "@mui/material"

// TanStack/React-Query
import { useInfiniteQuery } from '@tanstack/react-query';

// Project Imports
import { getVideosPage } from '@/axios/axios';
import MoreVideosCard from "./MoreVideosCard";




const MoreVideos = ({ setShowMoreVideos }) => {
    const router = useRouter()
    const { v } = router.query


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

    
    if (isLoading) {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress /></Box>
      )
    }

    const filteredVideoArr = data?.pages[0]?.filter( filteredVideo =>  {
    return filteredVideo?.youtube_id != v
    })


    const content2 = filteredVideoArr?.map((filteredVideo, i) => {
        if (filteredVideoArr?.length === i + 1) {
            return  <Box sx={{paddingTop: 2}} key={i} ref={lastVideoRef} ><MoreVideosCard setShowMoreVideos={setShowMoreVideos} isLoading={isLoading} video={filteredVideo} /></Box>
        } else {
            return  <Box sx={{paddingTop: 2}} key={i}><MoreVideosCard setShowMoreVideos={setShowMoreVideos} isLoading={isLoading} video={filteredVideo} /></Box>
        }
    })

    // const content = data?.pages?.map(pg => {
    //     return pg?.map((video, i) => {
    //       if (pg.length === i + 1) {
    //           return  <Box sx={{paddingTop: 2}} key={i} ref={lastVideoRef} ><MoreVideosCard isLoading={isLoading} video={video} /></Box>
    //       } 
    //       return  <Box sx={{paddingTop: 2}} key={i}><MoreVideosCard isLoading={isLoading} video={video} /></Box>
    //     })
    // })



  return (
        <>
        <Box>
            {content2}
        </Box>
        <Box sx={{paddingTop: 2}}>
        { error?.response?.status === 404 ? <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Typography variant='body2'>No More Links...</Typography></Box> : <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress /></Box> }
        </Box>
        </>
    )
}

export default MoreVideos