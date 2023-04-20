// Font imports
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Global CSS Styles
import { myLightTheme, myDarkTheme } from '@/styles/theme';
import '@/styles/globalStyles.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// React Imports
import { useState } from 'react';

// Nextjs Imports
import { useRouter } from 'next/router';

// MUI Imports
import { ThemeProvider, CssBaseline } from '@mui/material'

// TanStack/React-Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// NPM Imports
import { Provider } from 'react-redux';

// Project Imports
import store from '@/redux/app/store';




const queryClient = new QueryClient();


export default function App({ Component, pageProps }) {
  const router = useRouter()
  const { page } = router.query
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [value, setValue] = useState(0)



  return (
      <ThemeProvider theme={isDarkMode ? myDarkTheme : myLightTheme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <Component {...pageProps} setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} />
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
      </ThemeProvider>
    )
}
