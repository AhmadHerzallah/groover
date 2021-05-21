import { lightTheme, darkTheme } from '../style/theme';
import { Sun, Moon, Menu, X } from 'react-feather';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

import React, { useState, useEffect } from 'react';

const NavBar = ({ theme, handleClick, click, toggleTheme }) => {
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
    <div>
      <Navbar expand='lg'>
        <Navbar.Brand>
          <Link to='/'>GROOVER</Link>
        </Navbar.Brand>
        <Navbar.Toggle onClick={handleClick} aria-controls='basic-navbar-nav'>
          <span>
            {click ? (
              <Menu
                size={32}
                color={theme === 'light' ? lightTheme.burger : darkTheme.burger}
              />
            ) : (
              <X
                size={32}
                color={theme === 'light' ? lightTheme.burger : darkTheme.burger}
              />
            )}
          </span>
        </Navbar.Toggle>

        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Link to='/' className='nav-link'>
              Home
            </Link>
            <Link to='/search' className='nav-link'>
              Search
            </Link>
            <Link to='/grinder' className='nav-link'>
              Grinder
            </Link>
          </Nav>
          {isSignedIn ? (
            <Link to='/profile' className='nav-link login__btn'>
              Profile
            </Link>
          ) : (
            <>
              <Link to='/signup' className='nav-link login__btn'>
                Signup
              </Link>

              <Link to='/login' className='nav-link login__btn'>
                Login
              </Link>
            </>
          )}
          {/*               background: `${
                theme === 'light' ? lightTheme.switchbtn : darkTheme.switchbtn
              }`,
 */}
          <button
            style={{
              background: 'transparent',
              border: 'none',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
            }}
            className='themeSwitcher'
            onClick={toggleTheme}
            aria-label='theme'
          >
            {theme !== 'light' ? (
              <>
                <Sun color='white' size={24} />
              </>
            ) : (
              <>
                <Moon color='white' size={24} />{' '}
              </>
            )}
          </button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
