import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import UserSchedule from './schedule/UserSchedule';
import UserInbox from './social/UserInbox';
import UserFriends from './social/UserFriends';
import UserProfile from './profile/UserProfile';
import Main from './credentials/Welcome';
import './MainLayout.css'
import ChatView from "../chat/ChatPortalView";


class MainLayout extends Component{

    /* set prop to state, must check all props, and give it a default value if prop not passed in */
    constructor(props){
        super(props);

        this.state = {
            tab: props.tab || "profile" /* must be one from ["schedule","friends","inbox","profile"] */
        }
        this.initialized = false;
    }

    goto_schedule(){
        ReactDOM.render(<UserSchedule />, document.getElementById('main-layout'));
    }

    goto_friends(){
        ReactDOM.render(<UserFriends />, document.getElementById('main-layout'));
    }

    goto_inbox(){
        ReactDOM.render(<UserInbox />, document.getElementById('main-layout'));
    }

    goto_profile(){
        ReactDOM.render(<UserProfile />, document.getElementById('main-layout'));
    }

    goto_chat(){
        ReactDOM.render(<ChatView />, document.getElementById('main-layout'));
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

                    <div className="logo-main">FriendZone</div>

                    <button className="button-nav-bar"
                            onClick={this.goto_schedule.bind(this)}>
                        Schedule
                    </button>
                    <button className="button-nav-bar"
                            onClick={this.goto_friends.bind(this)}>
                        Friends
                    </button>
                    <button className="button-nav-bar"
                            onClick={this.goto_inbox.bind(this)}>
                        Inbox
                    </button>
                    <button className="button-nav-bar"
                            onClick={this.goto_profile.bind(this)}>
                        Profile
                    </button>
                    <button className="button-nav-bar"
                            onClick={this.goto_chat.bind(this)}>
                        Chat
                    </button>

                    <button className="logout-button"
                            onClick={this.logout.bind(this)}>
                        Log out
                    </button>

                </div>


                {/* EVERYTHING SHOULD BE RENDERED WITHIN THIS ID, use
                    ReactDOM.render(<SomeComponent />, document.getElementById('main-layout'));
                    this default renders the profile page */}
                <div className="below-nav-bar">
                    <div id="main-layout" className="middle-panel">

                    </div>
                </div>

            </div>
        )
    }

    componentDidMount(){
        ReactDOM.render(<ChatView />, document.getElementById('main-layout'));
    }
}

export default MainLayout;