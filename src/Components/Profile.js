/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import fire from '../fire';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import Login from './Login';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return authObserver;
  });

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('out');
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  return (
    <>
      {user ? (
        <Container>
          <p>Hey, {user.displayName}</p>
          <button onClick={signOut}>Signout</button>
          <p>
            {user.providerData &&
              user.providerData.map((data) => {
                console.log(data);
              })}
          </p>
        </Container>
      ) : (
        <Container>
          <p>
            Sorry, you have to <a href="/login">login</a> to see your profile.
          </p>
        </Container>
      )}
    </>
  );
};

export default Profile;
