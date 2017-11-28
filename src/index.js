import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Welcome from './view/credentials/Welcome';
import Loading from './view/credentials/Loading';
import firebase from 'firebase';
import MainLayout from './view/MainLayout';
import registerServiceWorker from './registerServiceWorker';
import InitProfile from './view/profile/InitProfile';
import {lookup_profile_by_user_id} from "./dao/ProfileManager";
import RedirectNoEmailVerification from "./view/credentials/RedirectNoEmailVerification"
// eslint-disable-next-line
import {test_most_popular_in_list} from './test/TestMostPopularInList';

// eslint-disable-next-line
import CalendarHelper from './api/CalendarHelper';

// eslint-disable-next-line
import {test_time_helper} from "./test/TestTimeHelper";
import {clear_profiles, init_data} from "./api/StaticData";

ReactDOM.render(<Loading/>, document.getElementById('root'));

document.title = "FriendZone";

/* firebase config and setup */
let config = {
    apiKey: "AIzaSyABmBOMLTEGtBLrjkwcDu9ab0ExE208R-4",
    authDomain: "friend-zone-9219b.firebaseapp.com",
    databaseURL: "https://friend-zone-9219b.firebaseio.com",
    projectId: "friend-zone-9219b",
    storageBucket: "gs://friend-zone-9219b.appspot.com",
    messagingSenderId: "1002501074461"
};
firebase.initializeApp(config);
registerServiceWorker();


// Using a callback method (observer) avoids the issue that, when web are in
// process of getting the user, user is null even though user has signed in.

firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        init_data((profile)=>{


            /*force user to create a profile before doing anything*/
            if (!profile){
                ReactDOM.render(<InitProfile/>, document.getElementById('root'));

             /*user already has a profile in our db, go to schedule*/
            }else{
                //check if the user has verified their email

                lookup_profile_by_user_id(user.uid, function (err,profile) {
                    if (profile.verified_email === false) {
                        window.alert("Email not verified");
                        ReactDOM.render(<RedirectNoEmailVerification />, document.getElementById('root'));

                    }
                    else{
                        ReactDOM.render(<MainLayout/>, document.getElementById('root'));
                    }
                })


                //done checking
                    //ReactDOM.render(<MainLayout/>, document.getElementById('root'));

            }
        });
    } else {
        clear_profiles();
        ReactDOM.render(<Welcome/>, document.getElementById('root'));
    }
});

/*
* TODO: Yiming: comment out line 15-35, uncomment line 36, npm start, press F12 in chrome and look at console to see Unit test result
* */
//test_most_popular_in_list();

/* TODO: Run this function to check for the correctness of the TimeHelper functions */
//test_time_helper();

/*
* TODO: To test the calendar, comment out Line 15-35, uncomment out the following lines of code
 */
// var events = [
//     {"days":"MWF", "hours":["11:30", "12:30"], "title":"CSE11" },
//     {"days":"TuTh", "hours":["10:20", "11:20"], "title":"CSE100"},
//     {"days":"MWTu", "hours":["00:10", "11:00"], "title":"Chilling"}
// ];
// ReactDOM.render(<ClassScheduleHelper events={events}/>, document.getElementById('root'));
