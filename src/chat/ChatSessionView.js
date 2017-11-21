import React, {Component} from 'react';
import firebase from 'firebase';
import {add_message} from "./ChatSessionManager";
import {lookup_profile_by_user_id} from "../dao/ProfileManager";
import ReactDOM from 'react-dom';

import './ChatSessionView.css'
import {read_portal} from "./ChatPortalManager";
import {get_friend_profiles} from "../api/StaticData";

import default_profile_pic from "../image/DefaultProfilePic.jpg"
import OtherProfile from "../view/profile/FriendProfile";

class ChatSessionView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            session_id: props.session_id,
            messages: [],
            title: "",
            input: "",
            my_name: ""
        }
    }

    componentWillMount() {
        var ref = firebase.database().ref('ChatSession/' + this.state.session_id);

        ref.once('value').then((snapshot) => {
            var msg_list = [];
            var msg_keys = Object.keys(snapshot.val().message);
            for (var i = 0; i < msg_keys.length; i++) {
                msg_list.push(snapshot.val().message[msg_keys[i]])
            }
            this.setState({messages: msg_list}, () => {
                this.scroll_message_container_to_bottom();
            })
        });

        ref.child('message').on('child_added', (snapshot) => {
            var msg_list = this.state.messages;
            msg_list.push(snapshot.val());
            this.setState({messages: msg_list}, () => {
                this.scroll_message_container_to_bottom();
            });
        });

        lookup_profile_by_user_id(firebase.auth().currentUser.uid, (err, profile_obj) => {
            this.setState({my_name: profile_obj.first_name + " " + profile_obj.last_name})
        })
    }


    scroll_message_container_to_bottom() {
        var message_container = document.getElementById("message-container");
        if (message_container) message_container.scrollTop = message_container.scrollHeight;
    }

    goto_other_profile(user_id) {
        ReactDOM.render(<OtherProfile user_id={user_id}/>, document.getElementById('main-layout'));
    }

    handle_input_key_press(e) {
        if (e.key === 'Enter') e.preventDefault();
        if (e.key === 'Enter' && this.state.input.length > 0) {
            this.send_message();
            read_portal(firebase.auth().currentUser.uid, this.state.session_id);
        }
    }

    send_message() {
        add_message(this.state.session_id, this.state.my_name, this.state.input);
        this.setState({input: ""})
    }

    render() {
        var friend_profiles = get_friend_profiles();
        var prev_sender = "";
        /*keep track of who sent the previous message, and not show icon and name on the next one */

        return (
            <div>


                <div className="message_container" id="message-container">
                    {
                        this.state.messages.map((message, index) => {


                            /* self message */
                            if (message.sender_id === firebase.auth().currentUser.uid) {
                                prev_sender = message.sender_id;
                                return (
                                    <div key={'message-' + index}
                                         className="message_row">
                                        <div className="bubble_right">{message.msg}</div>
                                    </div>
                                )
                            }

                            /*message from others*/
                            else {

                                /*get the profile pic*/
                                var sender_profile = friend_profiles[message.sender_id] || {};
                                var profile_pic = sender_profile.profile_pic;
                                if (profile_pic === null || profile_pic === "" || profile_pic === undefined)
                                    profile_pic = default_profile_pic;
                                var chat_icon_div = (
                                    <div className="sender_icon_container" onClick={()=>{this.goto_other_profile(message.sender_id)}}>
                                        <img className="sender_icon" src={profile_pic} alt="Sender"/>
                                    </div>);

                                var sender_name_div = (<div className="sender"> {message.sender}</div>);

                                /*hide profile pic and sender name if equal to last messages sender*/
                                if (message.sender_id === prev_sender) {
                                    chat_icon_div = (<div className="sender_icon_container_invisible"> </div>);
                                    sender_name_div = (<div> </div>);
                                }

                                prev_sender = message.sender_id;

                                return (
                                    <div key={'message-' + index}
                                         className="message_row">

                                        {chat_icon_div}

                                        <div className="sender_message_container">
                                            {sender_name_div}
                                            <div className="bubble_left">{message.msg}</div>
                                        </div>

                                    </div>
                                )
                            }

                        })
                    }

                    <div className="message_container_bottom_padding"> </div>

                </div>


                <div className="input_holder">


                    <textarea type="text" className="message_input"
                              value={this.state.input}
                              placeholder="Your message here, return to send"
                              onChange={(e) => {
                                  this.setState({input: e.target.value})
                              }}
                              onKeyPress={this.handle_input_key_press.bind(this)}
                    />
                </div>

            </div>
        )
    }


}

export default ChatSessionView;