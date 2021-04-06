import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../style/theme';
import { GlobalStyles } from '../style/global';
import { Sun, Moon, Menu, X } from 'react-feather';
// import video from '../assets/videos/theweeknd.mp4';
import '../style/App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Search from './Search';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Grinder from './Grinder';

import firebase from 'firebase';

function App({ initialTheme = 'light' }) {
  const [theme, setTheme] = useState(() => {
    let localValue = window.localStorage.getItem('theme');
    if (localValue) {
      return JSON.parse(localValue);
    }
    return initialTheme;
  });
  const [click, setClick] = useState(true);
  const [mute, setMute] = useState('mute');
  const handleMuteChange = () => {
    if (mute === 'mute') {
      setMute('not muted');
    } else {
      setMute('mute');
    }
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    window.localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const handleClick = (e) => {
    setClick(!click);
  };
  const listId = 'PL_TWHDjv1CGTCa8RsFHgpcSKfHGO_w6Zl';
  const type = 'list';

  const nowPlaying = `https://www.youtube.com/embed/videoseries?${type}=${listId}&autoplay=1&mute=0&controls=0&fs=1`;

  // firebase //
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return authObserver;
  });

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {/* bool ? true : false */}
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
                  <Link to="/search" className="nav-link">
                    mute: {mute}
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
                <Home mute={mute} handleMuteChange={handleMuteChange} />
              </Route>
              <Route path="/search" exact component={Search} />
              <Route path="/login" exact component={Login} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/grinder" exact component={Grinder} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

/*
38 - 54
  // const database = firebase.database();

  // const getDataFromRealtimeDatabase = () => {
  //   database
  //     .child('users')
  //     .get()
  //     .then(function (snapshot) {
  //       if (snapshot.exists()) {
  //         console.log(snapshot.val());
  //       } else {
  //         console.log('No data available');
  //       }
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };

  */
