/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import fire from '../fire';
import Style from '../style/profile.module.css';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import Login from './Login';

const Profile = () => {
  // Hooks

  const [user, setUser] = useState(null);
  const db = firebase.database();
  const [data, setData] = useState({});
  const [phoroUrl, setPhotoUrl] = useState('');
  const [image, setImage] = useState();
  const uploadedImage = useRef('');
  let dataFromDatabase;

  // Storage

  /* Initialization*/
  let storage = firebase.storage();

  let storageRef = storage.ref();

  let imageRef = storageRef.child(`images/${user && user.uid}/profile.png`);
  let defaultImageRef = storageRef.child(`images/defaultDark.svg`);
  /* Get Image from Storage */
  const ImageGetter = () => {
    imageRef
      .getDownloadURL()
      .then((url) => {
        setPhotoUrl(url);
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            console.log('object-not-found');
            break;
          case 'storage/unauthorized':
            console.log('unauthorized');
            break;
          case 'storage/canceled':
            console.log('object-not-found');
            break;
          case 'storage/unknown':
            console.log('object-not-found');
            break;
        }
      });
  };
  // Storage

  // Get data from Realtime Database

  const getDataFromDatabase = () => {
    users
      .child(user.uid)
      .get()
      .then(function (snapshot) {
        if (snapshot.exists()) {
          setData(snapshot.val());
          setTimeout(() => {
            console.log(data);
          }, 3000);
          setPhotoUrl(snapshot.val().photo);
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
  const obServer = () => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    user && user.uid && getDataFromDatabase();
    return authObserver;
  };
  useEffect(() => {
    obServer();
  }, [user]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let type = uploadedImage.current.files[0].type;
    let metadata = {
      contentType: type,
    };
    let uploadTask = storageRef
      .child('images/' + user.uid + '/profile')
      .put(uploadedImage.current.files[0], metadata)
      .then((data) => {
        data.ref.getDownloadURL().then((url) => {
          // do whatever you want with url
          users.child(user.uid).update({
            photo: url,
          });

          setPhotoUrl(url);
        });
      });
  };

  return (
    <>
      {user ? (
        <Container>
          {phoroUrl ? (
            <img
              src={phoroUrl}
              className={Style.profile__image}
              alt={`${data && data.username}'s profile`}
            />
          ) : (
            <img src={phoroUrl} alt="default profile" width="120" />
          )}
          {users && console.log(users.child(user.uid).get)}
          <p>Hey, {data && data.username}</p>
          <p>Email: {data && data.email}</p>
          <p>
            photoUrl:{' '}
            {data && data.photo === '' ? "There's no image" : data.photo}
          </p>
          <button onClick={signOut}>Signout</button>
          <p>
            {firebase.auth().currentUser && firebase.auth().currentUser.uid}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              ref={uploadedImage}
              accept="image/*"
              value={image}
            />
            <input type="submit" value="Upload" />
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
// ahmad: i'll figure out a way to use the code below.

/*

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('line ~: 143  File available at', downloadURL);

          users.child(user.uid).update({
            photo: downloadURL,
          });
          imageRef
            .getDownloadURL()
            .then((url) => {
              setPhotoUrl(downloadURL);
              console.log('line ~: 151 - File available at', url);
            })
            .catch((error) => {
              switch (error.code) {
                case 'storage/object-not-found':
                  break;
                case 'storage/unauthorized':
                  break;
                case 'storage/canceled':
                  break;
                case 'storage/unknown':
                  break;
              }
            });
        });
        // setUser(null);
        obServer();
      },
    );


    */
