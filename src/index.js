import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './view/Main';
import firebase from 'firebase';
import UserProfile from './view/UserProfile';
import registerServiceWorker from './registerServiceWorker';

var config = {
    apiKey: "AIzaSyABmBOMLTEGtBLrjkwcDu9ab0ExE208R-4",
    authDomain: "friend-zone-9219b.firebaseapp.com",
    databaseURL: "https://friend-zone-9219b.firebaseio.com",
    projectId: "friend-zone-9219b",
    storageBucket: "",
    messagingSenderId: "1002501074461"
};
firebase.initializeApp(config);
registerServiceWorker();

/*todo
this is not working, when refresh, auth().currentUser still resets to null*/
var user = firebase.auth().currentUser;
if (user)
    ReactDOM.render(<UserProfile />, document.getElementById('root'));
else
    ReactDOM.render(<Main />, document.getElementById('root'));

