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
function App({ initialTheme = 'light' }) {
  const [theme, setTheme] = useState(() => {
    let localValue = window.localStorage.getItem('theme');
    if (localValue) {
      return JSON.parse(localValue);
    }
    return initialTheme;
  });

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

  const [click, setClick] = useState(true);

  const handleClick = (e) => {
    setClick(!click);
  };
  const listId = 'PL_TWHDjv1CGTCa8RsFHgpcSKfHGO_w6Zl';
  const type = 'list';

  const nowPlaying = `https://www.youtube.com/embed/videoseries?${type}=${listId}&autoplay=1&mute=1&controls=0&fs=1`;

  // firebase //

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
                  <Link to="/">
                    <a href="!#" className="nav-link" role="button">
                      Home
                    </a>
                  </Link>
                  <Link to="/search">
                    <a href="!#" className="nav-link" role="button">
                      Search
                    </a>
                  </Link>
                </Nav>
                <Link to="/login">
                  <a href="!#" className="nav-link login__btn" role="button">
                    Login
                  </a>
                </Link>

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
              <Route path="/" exact component={Home} />
              <Route path="/search" exact component={Search} />
              <Route path="/login" exact component={Login} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
