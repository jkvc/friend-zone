import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './view/Main';
import firebase from 'firebase';
import UserProfile from './view/UserProfile';
import registerServiceWorker from './registerServiceWorker';
import {test_most_popular_in_list} from './test/TestMostPopularInList'

/* firebase config and setup */
let config = {
    apiKey: "AIzaSyABmBOMLTEGtBLrjkwcDu9ab0ExE208R-4",
    authDomain: "friend-zone-9219b.firebaseapp.com",
    databaseURL: "https://friend-zone-9219b.firebaseio.com",
    projectId: "friend-zone-9219b",
    storageBucket: "",
    messagingSenderId: "1002501074461"
};
firebase.initializeApp(config);
registerServiceWorker();

// Using a callback method (observer) avoids the issue that when web are in
// process of getting the user, user is null even though user has signed in.

firebase.auth().onAuthStateChanged((user) => {
    if (user)
        ReactDOM.render(<UserProfile/>, document.getElementById('root'));
    else
        ReactDOM.render(<Main/>, document.getElementById('root'));
});

/*
* TODO: Yiming: comment out line 25-30, uncomment line 36, npm start, press F12 in chrome and look at console to see Unit test result
* */
// test_most_popular_in_list();