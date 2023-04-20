import axios from 'axios'


export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
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


export const getCurrentEvent = async ( event_id ) => {
    const eventID = event_id?.queryKey[1]
    const response = await api.get(`/store/events/${eventID}/`)
    return response.data
}


export const addView = async (newView) => {
    const response = await api.post(`/store/views/`, newView)
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
    const response = await api.get(`/store/products/?user=&product_category=${productCategory}`)
    return response.data
}


export const getFeaturedEvents = async () => {
    const response = await api.get(`/store/events/?is_featured=true`)
    return response.data
}


export const getEventByCategory = async (category) => {
    const eventCategory = category?.queryKey[1]
    const response = await api.get(`/store/events/?event_category=${eventCategory}`)
    return response.data
}


export const registerAccount = async ( newAccount ) => {
    const response = await api.post(`/auth/users/`, newAccount)
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