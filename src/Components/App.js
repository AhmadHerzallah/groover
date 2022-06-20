/* eslint-disable no-unused-vars */
// #region import

import "bootstrap/dist/css/bootstrap.min.css";
import "../style/App.css";

import React, { useState, useEffect } from "react";

import { BrowserRouter as Router } from "react-router-dom";

// Import ThemeProvider from Styled-components
import { ThemeProvider } from "styled-components";

// Import Light and Dark theme from ../style/theme
import { lightTheme, darkTheme } from "../style/theme";

// Import Global Style
import { GlobalStyles } from "../style/global";

import { AuthProvider } from "./Authentication/Auth";

// Import Nav & Navbar from react-bootstrap

// Import Components
import Cursor from "./Cursor";
import NavBar from "./Nav";
import firebase from "firebase";
import VideoBackground from "./VideoBackground";
import Routes from "./Routes";

//#endregion

// we'll write comments to be: Documentation and Clarification comments

function App({ initialTheme = "dark" }) {
  // Initialize a new state for managing theme
  const [theme, setTheme] = useState(() => {
    /* 
    
    define a new variable to localStorage which
    get key 'theme' from localStorage

    */
    let localValue = window.localStorage.getItem("theme");
    // check if key 'theme' is aleady
    // declared in localStorage
    if (localValue) {
      // return parse localValue
      // JSON.parse: adds " " to the value.
      return JSON.parse(localValue);
    }
    // else, return the initialTheme
    // which is dark (Ln: 34)
    return initialTheme;
  });
  // Initialize state to handle burger menu
  const [click, setClick] = useState(true);
  // function to control the theme value
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // * change key 'theme' in localStorage based on
  // * theme value.
  // * so everytime the theme value change
  // * it will change the theme value in localStorage
  useEffect(() => {
    window.localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  // function to handle burger menu click
  const handleClick = (e) => {
    setClick(!click);
  };
  // declare video background data
  const listId = "PL_TWHDjv1CGTCa8RsFHgpcSKfHGO_w6Zl";
  const type = "list";
  const nowPlaying = `https://www.youtube.com/embed/videoseries?${type}=${listId}&autoplay=1&mute=1&controls=0&fs=1`;

  /* firebase */
  // Initialize state for user.
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <AuthProvider>
          <Router>
            <VideoBackground video={nowPlaying} />
            <NavBar
              theme={theme}
              handleClick={handleClick}
              click={click}
              toggleTheme={toggleTheme}
            />
            <Routes />
          </Router>
        </AuthProvider>
        <Cursor />
      </ThemeProvider>
    </>
  );
}

export default App;
