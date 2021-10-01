/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import fire from "../../fire";
import Style from "../../style/profile.module.css";
import { useAuth } from "../Authentication/Auth";
import { useHistory } from "react-router-dom";
import Avatar, { genConfig, AvatarConfig } from "react-nice-avatar";

import firebase from "firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Login from "./Login";

const Profile = () => {
  // Hooks
  const { currentUser, loading, name, email, image, logOut } = useAuth();
  const [avatarConfig, setAvatarConfig] = useState(null);
  const [data, setData] = useState({});
  const [phoroUrl, setPhotoUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(45);
  const uploadedImage = useRef("");
  const history = useHistory();
  let config = genConfig();
  const db = firebase.database();

  // const [user, setUser] = useState(null);
  let dataFromDatabase;

  // Storage

  /* Initialization*/
  let storage = firebase.storage();

  let storageRef = storage.ref();

  const signOut = () => {
    logOut();
    history.push("/");
  };

  React.useLayoutEffect(() => {
    let config = randomAvatar(name);
    setAvatarConfig(config);
  }, [name]);

  function randomAvatar(name) {
    console.log(name);
    const random = (items) => items[Math.floor(Math.random() * items.length)];
    const calculatedSex = name === "Bob Smith" ? "man" : "woman";
    const earSize = ["small", "big"];
    const hairStyle = ["normal", "thick", "mohawk", "womanLong", "womanShort"];
    const eyeStyle = ["circle", "oval", "smile"];
    const glassesStyle = ["round", "square", "none"];
    const noseStyle = ["short", "long", "round"];
    const mouthStyle = ["laugh", "smile", "peace"];
    const shirtStyle = ["hoody", "short", "polo"];

    let randomAvatarConfig = {
      sex: calculatedSex,
    };
    return genConfig(randomAvatarConfig);
  }

  const hours = new Date().getHours();
  let greet = null;
  if (hours >= 12 && hours <= 17) {
    greet = "afternoon";
  } else if (hours >= 17) {
    greet = "evening";
  } else {
    greet = "morning";
  }
  if (loading) {
    return (
      <Container>
        <h1>Loading...</h1>
      </Container>
    );
  } else if (currentUser) {
    return (
      <Container>
        {image ? (
          <img
            src={phoroUrl}
            className={Style.profile__image}
            alt={`${data && data.username}'s profile`}
          />
        ) : (
          <Avatar
            onClick={() => {
              config = genConfig();
            }}
            className={Style.profile__image}
            {...avatarConfig}
          />
        )}
        <p className={Style.greetUser}>
          Good {greet && greet}, {name}
        </p>
        <p>Email: {email}</p>
        <p>
          photoUrl:{" "}
          {data && data.photo === "" ? "There's no image" : data.photo}
        </p>
        <button onClick={signOut}>Signout</button>
        <p>{firebase.auth().currentUser && firebase.auth().currentUser.uid}</p>
        {/* onSubmit={handleSubmit} */}
        <form>
          <input
            type="file"
            ref={uploadedImage}
            accept="image/*"
            value={image}
          />
          <input type="submit" value="Upload" />
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path
              class="circle"
              stroke-dasharray={`${uploadProgress}, 100`}
              d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text
              x="50%"
              y="50%"
              text-anchor="middle"
              fill="white"
              font-size="5px"
              font-family="Arial"
              dy=".3em"
            >
              {parseInt(uploadProgress)}%
            </text>
          </svg>
        </form>
      </Container>
    );
  } else {
    return (
      <Container>
        <p>
          Sorry, you have to <a href="/login">login</a> to see your profile.
        </p>
      </Container>
    );
  }
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

// const handleSubmit = (e) => {
//   e.preventDefault();
//   let type = uploadedImage.current.files[0].type;
//   let metadata = {
//     contentType: type,
//   };
//   let uploadTask = storageRef
//     .child('images/' + user.uid + '/profile')
//     .put(uploadedImage.current.files[0], metadata);

//   uploadTask.on(
//     'state_changed',
//     (snapshot) => {
//       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       setUploadProgress(progress);
//       console.log(progress);
//       switch (snapshot.state) {
//         case firebase.storage.TaskState.PAUSED:
//           console.log('Upload is paused');
//           break;
//         case firebase.storage.TaskState.RUNNING:
//           console.log('Upload is running');
//           break;
//       }
//     },
//     (err) => {
//       console.log('error: ', err);
//     },
//     (data) => {
//       uploadTask.snapshot.ref.getDownloadURL().then((url) => {
//         console.log(data);
//         users.child(user.uid).update({
//           photo: url,
//         });
//         setPhotoUrl(url);
//       });
//     },
//   );
// };

// let imageRef = storageRef.child(`images/${user && user.uid}/profile.png`);
// let defaultImageRef = storageRef.child(`images/defaultDark.svg`);
/* Get Image from Storage */
// const ImageGetter = () => {
//   imageRef
//     .getDownloadURL()
//     .then((url) => {
//       setPhotoUrl(url);
//     })
//     .catch((error) => {
//       switch (error.code) {
//         case 'storage/object-not-found':
//           console.log('object-not-found');
//           break;
//         case 'storage/unauthorized':
//           console.log('unauthorized');
//           break;
//         case 'storage/canceled':
//           console.log('object-not-found');
//           break;
//         case 'storage/unknown':
//           console.log('object-not-found');
//           break;
//       }
//     });
// };
// Storage
// const users = db.ref('users');

// Get data from Realtime Database
// const getDataFromDatabase = () => {
//   console.log(users.child(user.uid)[email]);
//   users
//     .child(user.uid)
//     .get()
//     .then(function (snapshot) {
//       if (snapshot.exists()) {
//         setData(snapshot.val());
//         setTimeout(() => {
//           console.log('data', data);
//         }, 3000);
//         setPhotoUrl(snapshot.val().photo);
//       } else {
//         console.log('No data available');
//       }
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// };

// let username = data.username,
//   photo = data.photo,
//   email = data.email;
// const obServer = () => {
//   const authObserver = firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       setUser(user);
//       setStatus('approved');
//     } else {
//       setUser(user);
//       setStatus('rejected');
//     }
//     console.log(`user:`, user);
//   });
//   user && user.uid && getDataFromDatabase();
//   return authObserver;
// };
// useEffect(() => {
//   setTimeout(() => {
//     obServer();
//   }, 1500);
// }, [user]);

// eslint-disable-next-line react-hooks/rules-of-hooks
