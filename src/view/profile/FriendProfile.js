import React, {Component} from 'react';
import {get_friend_profiles, get_self_profile} from "../../api/StaticData";
import {lookup_profile_by_user_id} from "../../dao/ProfileManager";
import PageTitle from "../components/PageTitle";
import default_profile_pic from '../../image/DefaultProfilePic.jpg'
import './FriendProfile.css'
import ReactDOM from 'react-dom';
import ChatView from "../../chat/ChatView";
import {create_chat_session} from "../../chat/ChatSessionManager";
import ChatSessionView from "../../chat/ChatSessionView";

class FriendProfile extends Component {

    constructor(props) {
        super(props);
        this.title = "FriendProfile.js"
        this.state = {
            user_id: props.user_id,
            profile_obj: get_friend_profiles()[props.user_id]
        }
    }

    componentWillMount() {
        if (this.state.profile_obj === null || this.state.profile_obj === undefined) {
            lookup_profile_by_user_id(this.state.user_id, (err, data) => {
                if (!err) {
                    this.setState({profile_obj: data})
                }
            })
        }
    }

    send_message() {
        ReactDOM.render(<ChatView/>, document.getElementById('main-layout'));

        var my_name = get_self_profile().first_name + " " + get_self_profile().last_name;
        var participant_ids = [get_self_profile().user_id, this.state.profile_obj.user_id];

        create_chat_session(my_name, participant_ids, "", (session_id) => {
            ReactDOM.render(<ChatSessionView session_id={session_id}/>, document.getElementById('session-container'));
        })

    }

    render() {
        var profile_pic = this.state.profile_obj.profile_pic || default_profile_pic;
        if (profile_pic === "") profile_pic = default_profile_pic;

        return (
            <div align='center'>
                <PageTitle title="Friend's profile"/>

                <br/>
                <div className='friend-profile-pic-container'>
                    <img src={profile_pic} alt="" className='friend-profile-pic'/>
                </div>

                <br/>
                <table id='friend-detail-table'>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{this.state.profile_obj.first_name + " " + this.state.profile_obj.last_name}</td>
                    </tr>
                    <tr>
                        <td>Major</td>
                        <td>{this.state.profile_obj.major}</td>
                    </tr>
                    <tr>
                        <td>Current year</td>
                        <td>{this.state.profile_obj.current_year}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{this.state.profile_obj.description}</td>
                    </tr>
                    </tbody>
                </table>
                <br/>

                <div>
                    <button className='friend-profile-button' onClick={this.send_message.bind(this)}>
                        Send message &nbsp;
                        <svg id="i-settings" viewBox="0 0 32 32" width="20" height="20" fill="none"
                             stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"
                             strokeWidth="2">
                            <path d="M2 4 L30 4 30 22 16 22 8 29 8 22 2 22 Z" />
                        </svg>
                    </button>
                    &nbsp;
                    <button className='friend-profile-button'>Block</button>
                </div>

                <br/>
            </div>
        )
    }
}


export default FriendProfile;