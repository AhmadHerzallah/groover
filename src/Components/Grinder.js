/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import fire from '../fire';
import firebase from 'firebase';
import { Container } from 'react-bootstrap';

const Grinder = () => {
  const [user, setUser] = useState(null);
  const obServer = () => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return authObserver;
  };
  useEffect(() => {
    obServer();
  }, [user]);

  if (!user) {
    return (
      <Container>
        <p>
          Sorry, you have to <a href="/login">login</a> to see your profile.
        </p>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <h1>Grinder!</h1>
      </Container>
    </>
  );
};

export default Grinder;

/*
        <Container>
          <p>
            Sorry, you have to <a href="/login">login</a> to see your profile.
          </p>
        </Container>

        */
