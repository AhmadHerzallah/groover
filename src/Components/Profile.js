/* eslint-disable react-hooks/exhaustive-deps */
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
  const db = firebase.database();
  const [data, setData] = useState({});
  let dataFromDatabase;

  const getDataFromDatabase = () => {
    users
      .child(user.uid)
      .get()
      .then(function (snapshot) {
        if (snapshot.exists()) {
          // console.log('got that data');
          // dataFromDatabase = snapshot.val();
          setData(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  let username = data.username,
    photo = data.photo,
    email = data.email;
  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      // user && getDataFromDatabase();
    });
    user && user.uid && getDataFromDatabase();
    return authObserver;
  }, [user]);

  // useEffect(() => {
  //   getDataFromRealtimeDatabase();
  // });

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
  const users = db.ref('users');
  // user && user.uid && getDataFromDatabase();
  // if

  return (
    <>
      {user ? (
        <Container>
          {/* {getDataFromDatabase()} */}
          {user.photoURL ? <img src={user.photoURL} alt="" /> : null}
          <p>
            Hey, {data && data.username}
            {/* {data && console.log(data.username)} */}
          </p>
          <p>Email: {data && data.email}</p>
          <p>
            photoUrl:{' '}
            {data && data.photo === '' ? "There's no image" : data.photo}
          </p>
          <button onClick={signOut}>Signout</button>
          <p>
            {firebase.auth().currentUser && firebase.auth().currentUser.uid}
            {/* {console.log(db)} */}
          </p>
          <form>
            <input type="file" />
          </form>
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
