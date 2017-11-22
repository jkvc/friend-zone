import React, {Component} from 'react';
import {accept_friend_request, decline_friend_request, lookup_profile_by_user_id} from "../../dao/ProfileManager";
import firebase from 'firebase';
import {get_self_profile} from "../../api/StaticData";
import PageTitle from "../components/PageTitle";
import ReactDOM from 'react-dom';


import './UserInbox.css'
import empty_inbox_img from "../../image/EmptyInboxImg.png"
import RecommendedFriends from "./RecommendedFriends";

class UserInbox extends Component {

    constructor(props) {
        super(props);
        this.title = "UserInbox.js";

        this.state = {
            incoming_request: Object.keys((get_self_profile().incoming_request) || {}),
            incoming_profiles: []
        }
    }

    componentWillMount() {
        var incoming_request = this.state.incoming_request;

        var profile_list = [];
        incoming_request.forEach((id) => {
            lookup_profile_by_user_id(id, (err, other_profile) => {
                profile_list.push(other_profile);
                this.setState({incoming_profiles: profile_list})
            })
        })
    }


    /*kill an entry after accept or decline*/
    remove_request(user_id) {
        var index = this.state.incoming_request.indexOf(user_id);
        var new_incoming_request = this.state.incoming_request;
        var new_incoming_profile = this.state.incoming_profiles;


        new_incoming_request.splice(index, 1);
        new_incoming_profile.splice(index, 1);

        this.setState({
            incoming_request: new_incoming_request,
            incoming_profiles: new_incoming_profile
        })
    }

    goto_recommended_friend(){
        ReactDOM.render(<RecommendedFriends/>, document.getElementById('main-layout'));
    }

    render() {

        var content = (<div align={"center"} className="empty_inbox_container">
            <br/><br/><br/><br/>
            <img src={empty_inbox_img} alt=""
                 width="300px"/>
            <br/>
            You have no incoming friend requests. <br/>
            Find some friends
            <button className="goto_rec_friend_button" onClick={this.goto_recommended_friend}>here.</button>
        </div>);

        if (this.state.incoming_request.length !== 0) {
            content = (<div className="inbox_entry_container">
                {

                    this.state.incoming_profiles.map((incoming_profile) => {

                        return (
                            <div className="inbox_entry"
                                 key={"incoming-friend-request-" + incoming_profile.user_id}>

                                <div className="inbox_entry_text">
                                    {incoming_profile.first_name} {incoming_profile.last_name}

                                </div>

                                <button className="inbox_entry_button"
                                        onClick={() => {
                                            decline_friend_request(incoming_profile.user_id, firebase.auth().currentUser.uid);
                                            this.remove_request(incoming_profile.user_id)
                                        }}> Decline
                                </button>

                                <button className="inbox_entry_button"
                                        onClick={() => {
                                            accept_friend_request(incoming_profile.user_id, firebase.auth().currentUser.uid);
                                            this.remove_request(incoming_profile.user_id)
                                        }}> Accept
                                </button>

                                <button className="inbox_entry_button">
                                    View profile
                                </button>


                            </div>
                        )
                    })
                }
            </div>)
        }

        return (

            <div className="user_inbox">

                <PageTitle title="Inbox"/>

                {content}


                {/*<pre>{JSON.stringify(this.state,null,2)}</pre>*/}

            </div>

        )
    }
}

export default UserInbox;