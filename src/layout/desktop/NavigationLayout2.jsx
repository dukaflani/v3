// Components
import HeaderDesktop2 from '@/components/reusableComponents/HeaderDesktop2'


const NavigationLayout2 = ({ children, setIsDarkMode, isDarkMode, value, setValue }) => {
  

  return (
    <>
      <HeaderDesktop2 setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} />
        <>{children}</>
    </>
  )
}

export default NavigationLayout2