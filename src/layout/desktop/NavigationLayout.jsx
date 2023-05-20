// NPM Imports
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

// Project Imports
import HeaderDesktop from '@/components/reusableComponents/HeaderDesktop'
import { getCurrentUser, getRefreshToken, getUserProfile, renewAccessToken } from '@/axios/axios'
import { updateProfileInfo, updateToken, updateUserInfo } from '@/redux/features/auth/authSlice'


const NavigationLayout = ({ children, setIsDarkMode, isDarkMode, value, setValue }) => {
  const dispatch = useDispatch()
  const newToken = useSelector((state) => state.auth.token) 
  const { data: currentUser } = useQuery(['current-user', newToken], (newToken) => getCurrentUser(newToken), {
    onSuccess: (data, _variables, _context) => {
      dispatch(updateUserInfo(data))
    },
  })


  const userID = currentUser?.id ? currentUser?.id : 0
  const { data: userProfile, isLoading: loadingProfile } = useQuery(["user-profile", userID], (userID) => getUserProfile(userID), {
    onSuccess: (data, _variables, _context) => {
      dispatch(updateProfileInfo(data[0]))
    }
  })

  // Get refresh token
  const { data: refreshToken } = useQuery(['refresh-token'], getRefreshToken)

  // Renew access token
  const currentRefreshToken = {
    refresh: refreshToken ? refreshToken : '',
  }
  const { data: newAccessToken } = useQuery(['new-access-token', currentRefreshToken],  (currentRefreshToken) => renewAccessToken (currentRefreshToken), {
    onSuccess: (data, _variables, _context) => {
      // dispatch to store
      dispatch(updateToken(data?.access))
    },
    refetchInterval: 270000,
  })

  return (
    <>
      <HeaderDesktop setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} />
        <>{children}</>
    </>
  )
}

export default NavigationLayout