/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import StyleFirebaseUI from 'react-firebaseui/StyledFirebaseAuth';
import fire from '../../fire';
import firebase from 'firebase';
import { Redirect, useHistory } from 'react-router-dom';

const db = firebase.database();

const rootRef = db.ref('users');

const configUi = {
  signInFlow: 'popup',
  signInSuccessUrl: '/profile',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],

  callbacks: {
    signInSuccessWithAuthResults: () => {
      return false;
    },
  },
};
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
let flag = false;
function writeUserData(userId, name, email, imageUrl) {
  if (flag === true) {
    console.log("Don't update data");
  } else {
    firebase
      .database()
      .ref('users/' + userId)
      .set({
        username: name,
        email: email,
        photo: imageUrl,
      });
  }
}
const users = db.ref('users');

const Login = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    //#region trash

    // const authObserver = firebase.auth().onAuthStateChanged((user) => {
    //   setUser(user);
    //   let data;

    //   user &&
    //     users
    //       .child(user.uid)
    //       .get()
    //       .then(function (snapshot) {
    //         if (snapshot.exists()) {
    //           data = snapshot.val();
    //           if (user !== null) {
    //             console.log(user);
    //             writeUserData(
    //               snapshot.val().uid === ''
    //                 ? user && user.uid
    //                 : snapshot.val().uid,

    //               snapshot.val().displayName === ''
    //                 ? user.displayName
    //                 : snapshot.val().displayName,
    //               snapshot.val().email === ''
    //                 ? user.email
    //                 : snapshot.val().email,
    //               snapshot.val().photoURL === ''
    //                 ? user.photoURL
    //                 : snapshot.val().photoURL,
    //             );
    //           }

    //           console.log(data);
    //         } else {
    //           console.log('No data available');
    //           console.log(snapshot.val());
    //           console.log(user);
    //           // writeUserData(
    //           //   user.uid,
    //           //   user.displayName,
    //           //   user.email,
    //           //   user.photoURL,
    //           // );
    //         }
    //       })
    //       .catch(function (error) {
    //         console.error(error);
    //       });
    // });
    // return authObserver;

    //#endregion

    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    if (isSignedIn) {
      firebase
        .database()
        .ref('users/' + firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
          firebase
            .database()
            .ref('users/' + firebase.auth().currentUser.uid)
            .set({
              username: firebase.auth().currentUser.displayName,
              email: firebase.auth().currentUser.email,
              photo: firebase.auth().currentUser.photoURL,
            });
        });

      // isSignedIn &&
      //   users
      //     .child(firebase.auth().currentUser.uid)
      //     .get()
      //     .then(function (snapshot) {
      //       if (snapshot.exists()) {
      //         if (user !== null) {
      //           console.log(user);
      //           writeUserData(
      //             firebase.auth().currentUser.uid,
      //             firebase.auth().currentUser.displayName,
      //             firebase.auth().currentUser.email,
      //             firebase.auth().currentUser.photoURL,
      //           );
      //         }
      //       } else {
      //         console.log('No data available');
      //       }
      //     })
      //     .catch(function (error) {
      //       console.error(error);
      //     });
    }
    return () => unregisterAuthObserver();
  });
  const [user, setUser] = useState(null);
  return (
    <Container>
      <h1>Login / Register</h1>
      <StyleFirebaseUI uiConfig={configUi} firebaseAuth={firebase.auth()} />
    </Container>
  );
};

export default Login;
// ahmad: i'll figure out a way to use the code below.
{
  /*
  // const [user, setUser] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  // const [hasAccount, setHasAccount] = useState(false);

  // const clearInputs = () => {
  //   setEmail('');
  //   setPassword('');
  // };

  // const clearErrors = () => {
  //   setEmailError('');
  //   setPasswordError('');
  // };

  // const handleLogin = () => {
  //   clearErrors();
  //   fire
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .catch((err) => {
  //       console.log(err);
  //       // eslint-disable-next-line default-case
  //       switch (err.code) {
  //         case 'auth/invalid-email':
  //         case 'auth/user-disabled':
  //         case 'auth/user-not-found':
  //           setEmailError(err.message);
  //           break;
  //         case 'auth/wrong-password':
  //           setPasswordError(err.message);
  //           break;
  //       }
  //     });
  // };

  // const handleSignUp = () => {
  //   clearErrors();
  //   fire
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .catch((err) => {
  //       console.log(err);
  //       // eslint-disable-next-line default-case
  //       switch (err.code) {
  //         case 'auth/email-already-in-use':
  //         case 'auth/invaild-email':
  //           setEmailError(err.message);
  //           break;
  //         case 'auth/weak-password':
  //           setPasswordError(err.message);
  //           break;
  //       }
  //     });
  // };

  // const handleLogOut = () => {
  //   fire.auth().signOut();
  // };

  // const authListener = () => {
  //   fire.auth().onAuthStateChanged((user) => {
  //     console.log(`something changed`);
  //     if (user) {
  //       clearInputs();
  //       setUser(user);
  //     } else {
  //       setUser('');
  //     }
  //   });
  // };

  // useEffect(() => {
  //   authListener();
  // }, []);

     <LoginPage
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        /> 


*/
}
