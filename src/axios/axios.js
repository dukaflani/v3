// Axios Import
import axios from 'axios'


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

export const api2 = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NEXT_URL
})



export const getVideosPage = async ( pageParam = 1, options = {} ) => {
    const response = await api.get(`/store/videos/?page=${pageParam}`, options)
    return response.data.results
}


export const getCurrentVideo = async ( youtube_id ) => {
    const youtubeID = youtube_id?.queryKey[1]
    const response = await api.get(`/store/videos/?user=&genre=&youtube_id=${youtubeID}`)
    return response.data.results[0]
}


export const getCurrentVideoUserProfile = async (user_id) => {
    const currentVideoUserID = user_id?.queryKey[1]
    const response = await api.get(`/store/user-profile/?user=${currentVideoUserID}`)
    return response.data[0]
}


export const getCurrentVideoStreamingLinks = async (links_id) => {
    const currentVideoStreamingLinks = links_id?.queryKey[1]
    const response = await api.get(`/store/streaming-link/?streaming_links=${currentVideoStreamingLinks}`)
    return response.data
}


export const getCurrentVideoProduct = async (product_id) => {
    const currentVideoProduct = product_id?.queryKey[1]
    const response = await api.get(`/store/products/${currentVideoProduct}/`)
    return response.data
}


export const getCurrentVideoLyrics = async (lyrics_id) => {
    const currentVideoLyrics = lyrics_id?.queryKey[1]
    const response = await api.get(`/store/lyrics/${currentVideoLyrics}/`)
    return response.data
}


export const getCurrentVideoLyricsVerses = async (lyrics_id) => {
    const currentVideoLyricsID = lyrics_id?.queryKey[1]
    const response = await api.get(`/store/lyrics-verse/?lyrics=${currentVideoLyricsID}`)
    return response.data
}


export const getCurrentVideoSkizaTuneList = async (skiza_id) => {
    const currentVideoSkizaID = skiza_id?.queryKey[1]
    const response = await api.get(`/store/skiza-tune/?skiza_tune=${currentVideoSkizaID}`)
    return response.data
}


export const getCurrentVideoAlbum = async (album_id) => {
    const currentVideoAlbumID = album_id?.queryKey[1]
    const response = await api.get(`/store/album/${currentVideoAlbumID}/`)
    return response.data
}


export const getCurrentVideoAlbumTracks = async (album_id) => {
    const currentVideoAlbumID = album_id?.queryKey[1]
    const response = await api.get(`/store/album-track/?album=${currentVideoAlbumID}`)
    return response.data
}


export const getCurrentVideoEvents = async (user_id) => {
    const currentVideoUserID = user_id?.queryKey[1]
    const response = await api.get(`/store/events/?user=${currentVideoUserID}`)
    return response.data
}


export const getCurrentVideoMediaTours = async (user_id) => {
    const currentVideoUserID = user_id?.queryKey[1]
    const response = await api.get(`/store/media-tour/?user=${currentVideoUserID}`)
    return response.data
}


export const getCurrentEvent = async ( event_id ) => {
    const eventID = event_id?.queryKey[1]
    const response = await api.get(`/store/events/${eventID}/`)
    return response.data
}


export const addView = async ({ip_address, country, ...newView}) => {
    const response = await api.post(`/store/views/?country=${country}&IP=${ip_address}`, newView)
    return response.data
}

export const addStreamingLinkView = async ({ip_address, country, ...newStreamingLinkView}) => {
    const response = await api.post(`/store/streaming-views/?country=${country}&IP=${ip_address}`, newStreamingLinkView)
    return response.data
}

export const addDefaultStreamingLinkView = async ({ip_address, country, ...newStreamingLinkView}) => {
    const response = await api.post(`/store/default-streaming-views/?country=${country}&IP=${ip_address}`, newStreamingLinkView)
    return response.data
}

export const addProductView = async ({ip_address, country, ...newProductView}) => {
    const response = await api.post(`/store/product-views/?country=${country}&IP=${ip_address}`, newProductView)
    return response.data
}

export const addEventView = async ({ip_address, country, ...newEventView}) => {
    const response = await api.post(`/store/event-views/?country=${country}&IP=${ip_address}`, newEventView)
    return response.data
}


export const getUpsellProducts = async (user_id) => {
    const userID = user_id?.queryKey[1]
    const response = await api.get(`/store/products/?user=${userID}`)
    return response.data
}


export const getUpsellEvents = async (user_id) => {
    const userID = user_id?.queryKey[1]
    const response = await api.get(`/store/events/?user=${userID}`)
    return response.data
}


export const getProductByCategory = async (category) => {
    const productCategory = category?.queryKey[1]
    const response = await api.get(`/store/products/?product_category=${productCategory}&is_featured=true`)
    return response.data
}

export const getSponsoredEvents = async (countryCode) => {
    const country_code = countryCode?.queryKey[1]
    const response = await api.get(`/store/events/?is_sponsored=true&country=${country_code}`)
    return response.data
}


export const getEventByCategory = async (filterObject) => {
    const eventCategory = filterObject?.queryKey[1]?.category
    const eventCountry = filterObject?.queryKey[1]?.country
    const response = await api.get(`/store/events/?event_category=${eventCategory}&is_featured=true&country=${eventCountry}`)
    return response.data
}


export const registerAccount = async ( newAccount ) => {
    await api.post(`/auth/users/`, newAccount)
}


export const loginUser = async (loginInfo) => {
    const response = await api.post(`/auth/jwt/create`, loginInfo)
    return response.data
}

export const getRefreshToken = async () => {
    const response = await api2.get(`/api/hello`)
    return response.data.token
}

export const renewAccessToken = async (currentRefreshToken) => {
    const refreshToken = currentRefreshToken?.queryKey[1]
    const response = await api.post(`/auth/jwt/refresh/`, refreshToken)
    return response.data
}


export const getCurrentUser = async ( token ) => {
    const accessToken = token?.queryKey[1]
    const response = await api.get(`/auth/users/me/`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken 
        }
    })
    return response.data
}


export const getUserProfile = async ( userID ) => {
    const currentUserId = userID?.queryKey[1]
    const response = await api.get(`/store/user-profile/?user=${currentUserId}`)
    return response.data
}


export const updateProfile = async ({ id, accessToken, ...profileInfo }) => {
    const user_id = id
    const acccess_token = accessToken
    const profile_info = profileInfo
    const response = await api.patch(`/store/user-profile/${user_id}/` , profile_info, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: acccess_token
        }
    })
    return response.data
}

export const searchPageProfileLink = async (searchParams) => {
    const searchTerm = searchParams?.queryKey[1]
    const response = await api.get(`/store/user-profile/?search=${searchTerm}`)
    return response.data[0]
}

export const searchVideos = async ( searchParams ) => {
    const searchTerm = searchParams?.queryKey[1]
    const response = await api.get(`/store/video-results-no-pagination/?search=${searchTerm}&limit=20`)
    return response.data.results
}


export const searchProducts = async ( searchParams ) => {
    const searchTerm = searchParams?.queryKey[1]
    const response = await api.get(`/store/products-results-offset/?search=${searchTerm}&limit=20`)
    return response.data.results
}


export const searchEvents = async ( searchParams ) => {
    const searchTerm = searchParams?.queryKey[1]
    const response = await api.get(`/store/events-results-offset/?search=${searchTerm}&limit=20`)
    return response.data.results
}

export const profilePage = async (profileUsername) => {
    const profile_username = profileUsername?.queryKey[1]
    const response = await api.get(`/store/user-profile/?username=${profile_username}`)
    return response.data[0]
}

export const profileVideos = async ( userID ) => {
    const user_id = userID?.queryKey[1]
    const response = await api.get(`/store/video-results-no-pagination/?user=${user_id}&limit=20`)
    return response.data.results
}

export const profileProducts = async ( userID ) => {
    const user_id = userID?.queryKey[1]
    const response = await api.get(`/store/products-results-offset/?user=${user_id}&limit=20`)
    return response.data.results
}

export const profileEvents = async ( userID ) => {
    const user_id = userID?.queryKey[1]
    const response = await api.get(`/store/events-results-offset/?user=${user_id}&limit=20`)
    return response.data.results
}

export const profileMediaTours = async (userID) => {
    const user_id = userID?.queryKey[1]
    const response = await api.get(`/store/media-tour-offset/?user=${user_id}&limit=20`)
    return response.data.results
}

export const checkFanbase = async (profileID) => {
    const profile_id = profileID?.queryKey[1]?.profileId
    const user_id = profileID?.queryKey[1]?.userId
    const response = await api.get(`/store/fanbase/?user=${user_id}&customuserprofile=${profile_id}`)
    return response.data[0]
}

export const joinFanbase = async ( { accessToken, ...customuserprofile } ) => {
    const access_token = accessToken

    const response = await api.post(`/store/fanbase/`, customuserprofile, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}

export const leaveFanbase = async ( { id, accessToken } ) => {
    const access_token = accessToken
    const fanbase_id = id

    const response = await api.delete(`/store/fanbase/${fanbase_id}/`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}

export const likeVideo = async ( { accessToken, ...video } ) => {
    const access_token = accessToken

    const response = await api.post(`/store/likes/`, video, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}

export const removeLike = async ( { id, accessToken } ) => {
    const access_token = accessToken
    const likes_id = id

    const response = await api.delete(`/store/likes/${likes_id}/`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}

export const checkForVideoLike = async (videoLikeDetails) => {
    const video_id = videoLikeDetails?.queryKey[1]?.videoId
    const user_id = videoLikeDetails?.queryKey[1]?.userId
    const response = await api.get(`/store/likes/?user=${user_id}&video=${video_id}`)
    return response.data[0]
}

export const dislikeVideo = async ( { accessToken, ...video } ) => {
    const access_token = accessToken

    const response = await api.post(`/store/unlikes/`, video, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}

export const checkForVideoDislike = async (videoDislikeDetails) => {
    const video_id = videoDislikeDetails?.queryKey[1]?.videoId
    const user_id = videoDislikeDetails?.queryKey[1]?.userId
    const response = await api.get(`/store/unlikes/?user=${user_id}&video=${video_id}`)
    return response.data[0]
}

export const removeDislike = async ( { id, accessToken } ) => {
    const access_token = accessToken
    const unlikes_id = id

    const response = await api.delete(`/store/unlikes/${unlikes_id}/`, {
        headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: access_token 
        },
    })
    return response.data
}
