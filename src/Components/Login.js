import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import StyleFirebaseUI from 'react-firebaseui/StyledFirebaseAuth';
import fire from '../fire';
import firebase from 'firebase';
import LoginPage from './LoginPage';
import { Redirect } from 'react-router-dom';
const configUi = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/profile',
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

const Login = () => {
  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return authObserver;
  });
  const [user, setUser] = useState(null);
  if (user) {
    return <Redirect to="/profile" />;
  } else {
    return (
      <Container>
        <h1>Login / Register</h1>
        <StyleFirebaseUI uiConfig={configUi} firebaseAuth={firebase.auth()} />
      </Container>
    );
  }
};

export default Login;
// eslint-disable-next-line no-lone-blocks
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
