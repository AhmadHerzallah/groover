/* eslint-disable default-case */
import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../fire';
import app from '../../fire';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState();
  const db = app.database();
  const storage = app.storage();
  const users = db.ref('users');
  const storageRef = storage.ref();
  function signUp(data, password) {
    return auth
      .createUserWithEmailAndPassword(data.email, password)
      .then((res) => {
        console.log(res);
        app
          .database()
          .ref('users/' + res.user.uid)
          .set(data);
      })
      .catch((err) => {
        console.log(err);
        switch (err.code) {
          case 'auth/email-already-in-use':
            alert('bruh, this email is already in use.');
            break;
          case 'auth/invaild-email':
            alert('Provide a valid email');
            break;
          case 'auth/weak-password':
            alert('bruh, write a better password');
            break;
        }
      });
  }

  // function signUpWithGoogle(email, password) {
  //   return auth
  //     .signInWithPopup(googleProvider)
  //     .then((res) => {
  //       console.log(res.user);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }
  // function signUpWithGithub(email, password) {
  //   return auth
  //     .signInWithPopup(gitHubProvider)
  //     .then((res) => {
  //       console.log(res.user);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logOut() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  if (currentUser) {
    // Get data from db
    users
      .child(currentUser.uid)
      .get()
      .then(function (snapshot) {
        if (snapshot.exists()) {
          setName(snapshot.val().name);
          setEmail(snapshot.val().email);
        } else {
          console.log(`user:`, currentUser);
          console.log(`user id: ${currentUser.uid}`);
          console.log(snapshot.val());
          console.log('No data available');
        }
      })
      .catch(function (error) {
        console.error(error);
      });

    /* Get Image */
    const imageRef = storageRef.child(`images/${currentUser.uid}/profile.png`);
    imageRef
      .getDownloadURL()
      .then((url) => {
        setImage(url);
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            console.log('object-not-found');
            console.log(`uid: ${currentUser.uid}`);
            break;
          case 'storage/unauthorized':
            console.log('unauthorized');
            console.log(`uid: ${currentUser.uid}`);

            break;
          case 'storage/canceled':
            console.log('object-not-found');
            console.log(`uid: ${currentUser.uid}`);

            break;
          case 'storage/unknown':
            console.log('object-not-found');
            console.log(`uid: ${currentUser.uid}`);

            break;
        }
      });
  }

  const value = {
    currentUser,
    login,
    signUp,
    logOut,
    name,
    email,
    bio,
    image,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
