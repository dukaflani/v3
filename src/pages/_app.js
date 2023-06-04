// Google Tag Manager Module
import TagManager from 'react-gtm-module'

// Font imports
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Global CSS Styles
import '@/styles/globalStyles.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// React Imports
import { useEffect, useState } from 'react';


// MUI Imports
import {  CssBaseline } from '@mui/material'

// TanStack/React-Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// NPM Imports
import { Provider } from 'react-redux';



// Project Imports
import store from '@/redux/app/store';
import MyThemeProvider from '@/components/reusableComponents/MyThemeProvider';




const queryClient = new QueryClient();


export default function App({ Component, pageProps }) {

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || " ";
  const tagManagerArgs = {
    gtmId,
  };

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, [])


  const [value, setValue] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)



  return (
      <>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <MyThemeProvider>
                <Component {...pageProps} setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} />
              </MyThemeProvider>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
      </>
    )
}
