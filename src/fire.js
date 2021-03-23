import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDpPaaZcp4CYwRvORu_FdAAN0gKktT2G8c',
  authDomain: 'groover-cfp.firebaseapp.com',
  projectId: 'groover-cfp',
  storageBucket: 'groover-cfp.appspot.com',
  messagingSenderId: '23784461277',
  appId: '1:23784461277:web:d1ef647add091dfd749c34',
  measurementId: 'G-9NKEP4KD5B',
};
// Initialize Firebase
const init = firebase.initializeApp(firebaseConfig);

export default init;
