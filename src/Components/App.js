// #region import

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/App.css';

import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Import ThemeProvider from Styled-components
import { ThemeProvider } from 'styled-components';

// Import Light and Dark theme from ../style/theme
import { lightTheme, darkTheme } from '../style/theme';

// Import Global Style
import { GlobalStyles } from '../style/global';

// Import icons
import { Sun, Moon, Menu, X } from 'react-feather';

// Import Nav & Navbar from react-bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// Import Components
import Search from './Search';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Grinder from './Grinder';
import Cursor from './Cursor';

import firebase from 'firebase';

//#endregion

// we'll write comments to be: Documentation and Clarification comments

function App({ initialTheme = 'dark' }) {
  // Initialize a new state for managing theme
  const [theme, setTheme] = useState(() => {
    /* 
    
    define a new variable to localStorage which
    get key 'theme' from localStorage

    */
    let localValue = window.localStorage.getItem('theme');
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
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  // * change key 'theme' in localStorage based on
  // * theme value.
  // * so everytime the theme value change
  // * it will change the theme value in localStorage
  useEffect(() => {
    window.localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  // function to handle burger menu click
  const handleClick = (e) => {
    setClick(!click);
  };
  // declare video background data
  const listId = 'PL_TWHDjv1CGTCa8RsFHgpcSKfHGO_w6Zl';
  const type = 'list';
  const nowPlaying = `https://www.youtube.com/embed/videoseries?${type}=${listId}&autoplay=1&mute=0&controls=0&fs=1`;

  /* firebase */
  // Initialize state for user.
  const [user, setUser] = useState(null);

  // get user data from firebase.auth()
  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return authObserver;
  });

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Router>
          <div className="fullscreen-bg">
            <iframe
              src={nowPlaying}
              frameBorder="0"
              className="fullscreen-bg__video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="bg"
            ></iframe>
          </div>

          <div className="conten">
            <Navbar expand="lg">
              <Navbar.Brand>
                <Link to="/">GROOVER</Link>
              </Navbar.Brand>
              <Navbar.Toggle
                onClick={handleClick}
                aria-controls="basic-navbar-nav"
              >
                <span>
                  {click ? (
                    <Menu
                      size={32}
                      color={
                        theme === 'light' ? lightTheme.burger : darkTheme.burger
                      }
                    />
                  ) : (
                    <X
                      size={32}
                      color={
                        theme === 'light' ? lightTheme.burger : darkTheme.burger
                      }
                    />
                  )}
                </span>
              </Navbar.Toggle>

              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/search" className="nav-link">
                    Search
                  </Link>
                  <Link to="/grinder" className="nav-link">
                    Grinder
                  </Link>
                </Nav>
                {user ? (
                  <Link to="/profile" className="nav-link login__btn">
                    Profile
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link login__btn">
                    Login
                  </Link>
                )}
                <button
                  style={{
                    background: `${
                      theme === 'light'
                        ? lightTheme.switchbtn
                        : darkTheme.switchbtn
                    }`,
                    border: 'none',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  className="themeSwitcher"
                  onClick={toggleTheme}
                >
                  {theme !== 'light' ? (
                    <>
                      <Sun size={24} />
                    </>
                  ) : (
                    <>
                      <Moon color="white" size={24} />{' '}
                    </>
                  )}
                </button>
              </Navbar.Collapse>
            </Navbar>

            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/search" exact component={Search} />
              <Route path="/login" exact component={Login} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/grinder" exact component={Grinder} />
            </Switch>
          </div>
        </Router>
        <Cursor />
      </ThemeProvider>
    </>
  );
}

export default App;
