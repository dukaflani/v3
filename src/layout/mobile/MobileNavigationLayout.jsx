// Components
import HeaderMobile from '@/components/reusableComponents/HeaderMobile'


const MobileNavigationLayout = ({ children, setIsDarkMode, isDarkMode, value, setValue }) => {
  

  return (
    <>
      <HeaderMobile setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} />
        <>{children}</>
    </>
  )
}

export default MobileNavigationLayout