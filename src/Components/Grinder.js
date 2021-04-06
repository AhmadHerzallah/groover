/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import fire from '../fire';
import firebase from 'firebase';
import { Container } from 'react-bootstrap';
import Style from '../style/grinder.module.css';
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

  const handleDragStart = (e) => {
    e.target.style.transform = 'rotate(10deg)';
    console.log(e.pageX, e.pageY);
  };

  const handleDragEnd = (e) => {
    e.target.style.transform = 'rotate(0deg)';
    console.log(e.pageX, e.pageY);
  };
  const handleDrag = (e) => {
    // Grinder.js:31 673 314
    // default X: 673, 314
    if (e.pageX > 750 && e.pageX > 0) {
      e.target.style.transform = 'rotate(10deg)';
    } else if (e.pageX < 680 && e.pageX > 0) {
      e.target.style.transform = 'rotate(-10deg)';
    } else {
      e.target.style.transform = 'rotate(0deg)';
    }
  };

  return (
    <>
      <Container>
        <div className={Style.grinder_main}>
          <h1 className={`text-center`}>Grinder!</h1>
          <div className={`${Style.grinder__container}`}>
            <div
              className={`${Style.box}`}
              draggable
              onDrag={handleDrag}
              // onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            ></div>
          </div>
        </div>
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
