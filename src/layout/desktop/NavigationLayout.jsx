// Components
import HeaderDesktop from '@/components/reusableComponents/HeaderDesktop'


const NavigationLayout = ({ children, setIsDarkMode, isDarkMode, value, setValue }) => {
  

  return (
    <>
      <HeaderDesktop setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} />
        <>{children}</>
    </>
  )
}

export default NavigationLayout