import React, {useState, useEffect, useContext, createContext} from 'react'
import PropTypes from 'prop-types';
import Head from 'next/head';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import {lightTheme, darkTheme } from '../src/theme'
import '../src/globals.css'
import createEmotionCache from '../src/createEmotionCache';
import Navbar from '../src/components/Navbar';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const ThemeContext = createContext({theme: {}});
export const useMyTheme = ()=>useContext(ThemeContext);

export default function MyApp(props) {
  const [myTheme, setMyTheme] = useState(createTheme(lightTheme));
  const [theme, setTheme] = useState(createTheme(lightTheme));
  useEffect(()=> {
      setTheme(createTheme(myTheme));
  },[myTheme])

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  

  return (
    <ThemeContext.Provider value={{theme, setMyTheme}}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          {/* set name to Wordle Clone */}
          <title>Wordle Clone</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
