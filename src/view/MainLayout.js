import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import UserSchedule from './UserSchedule';
import UserInbox from './UserInbox';
import UserFriends from './UserFriends';
import UserProfile from './UserProfile';
import Main from './Main';
import './MainLayout.css'

class NavBar extends Component{

    /* set prop to state, must check all props, and give it a default value if prop not passed in */
    constructor(props){
        super(props);

        this.state = {
            tab: props.tab || "profile" /* must be one from ["schedule","friends","inbox","profile"] */
        }
    }

    goto_schedule(){
        ReactDOM.render(<UserSchedule />, document.getElementById('root'));
    }

    goto_friends(){
        ReactDOM.render(<UserFriends />, document.getElementById('root'));
    }

    goto_inbox(){
        ReactDOM.render(<UserInbox />, document.getElementById('root'));
    }

    goto_profile(){
        ReactDOM.render(<UserProfile />, document.getElementById('root'));
    }

    logout(){
        firebase.auth().signOut()
            .then(function() {
                ReactDOM.render(<Main />, document.getElementById('root'));
            })
            .catch(function(error){
                alert(error.message);
            });
    }

    render(){

        return(
            <div className="body-main-layout">

                <div className="nav-bar">

                </div>

                <div className="middle-panel    ">
                </div>

            </div>
        )

        // /* decide whether each tab button is either orange, or clickable */
        // var schedule_element = (<th onClick={this.goto_schedule.bind(this)}>Schedule</th>);
        // if (this.state.tab === "schedule")
        //     schedule_element = (<th bgcolor={"orange"}>Schedule</th>);
        //
        // var friends_element = (<th onClick={this.goto_friends.bind(this)}>Friends</th>);
        // if (this.state.tab === "friends")
        //     friends_element = (<th bgcolor={"orange"}>Friends</th>);
        //
        // var inbox_element = (<th onClick={this.goto_inbox.bind(this)}>Inbox</th>);
        // if (this.state.tab === "inbox")
        //     inbox_element = (<th bgcolor={"orange"}>Inbox</th>);
        //
        // var profile_element = (<th onClick={this.goto_profile.bind(this)}>Profile</th>);
        // if (this.state.tab === "profile")
        //     profile_element = (<th bgcolor={"orange"}>Profile</th>);
        //
        // return(
        //     <div>
        //
        //         <table>
        //
        //             <tr>
        //                 {schedule_element}
        //                 {friends_element}
        //                 {inbox_element}
        //                 {profile_element}
        //
        //                 <form>
        //                     <button onClick={this.logout.bind(this)}>Logout</button>
        //                 </form>
        //             </tr>
        //
        //             <tr id={"temptr"}>
        //
        //             </tr>
        //
        //         </table>
        //     </div>
        // )
    }
}

export default NavBar;