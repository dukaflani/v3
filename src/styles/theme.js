import { createTheme, colors } from '@mui/material'

      

export const myLightTheme = createTheme({
    myColors: {
      myBackground: '#fcfcfc',
      textDark: colors.grey[800],
      pageBackground: colors.grey[50]
    },
    palette: {
        mode: "light",
        secondary: {
          main: colors.blue[600],
        },
    },
})

export const myDarkTheme = createTheme({
  myColors: {
    myBackground: '#fcfcfc',
    textDark: colors.grey[100],
    pageBackground: colors.grey[900]
  },
    palette: {
        mode: "dark",
        primary: {
          main: "#fff"
        }
    },
})