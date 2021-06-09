/* eslint-disable default-case */
import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../fire';
import app from '../../fire';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const db = app.database();
  const users = db.ref('users');
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState();

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

    // app
    //   .firestore()
    //   .collection('users')
    //   .doc(currentUser.uid)
    //   .get()
    //   .then((doc) => {
    //     setEmail(currentUser.email);
    //     setBio(doc.data().bio);
    //     setName(doc.data().firstName + ' ' + doc.data().lastName);
    //     setImage(doc.data().image);
    //   });
  }

  /*
    signUpWithGoogle,
    signUpWithGithub,


*/

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
