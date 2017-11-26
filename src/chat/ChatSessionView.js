import React, {Component} from 'react';
import firebase from 'firebase';
import {add_image_message, add_message} from "./ChatSessionManager";
import {lookup_profile_by_user_id} from "../dao/ProfileManager";
import ReactDOM from 'react-dom';

import './ChatSessionView.css'
import {read_portal} from "./ChatPortalManager";
import {get_friend_profiles, get_self_profile} from "../api/StaticData";

import default_profile_pic from "../image/DefaultProfilePic.jpg"
import OtherProfile from "../view/profile/FriendProfile";

class ChatSessionView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            session_id: props.session_id,
            messages: {},
            title: "",
            input: "",
            my_name: "",
            show_load_full_button: true
        }
    }

    componentWillMount() {
        var ref = firebase.database().ref('ChatSession/' + this.state.session_id);

        ref.child('message').limitToLast(30).on('child_added', (snapshot) => {
            var messages = this.state.messages;
            messages[snapshot.val().time] = snapshot.val();
            this.setState({messages: messages}, () => {
                this.scroll_message_container_to_bottom();
            });

        });

        lookup_profile_by_user_id(firebase.auth().currentUser.uid, (err, profile_obj) => {
            this.setState({my_name: profile_obj.first_name + " " + profile_obj.last_name})
        })
    }

    load_full_history() {
        var ref = firebase.database().ref('ChatSession/' + this.state.session_id);
        ref.child('message').once('value').then((snapshot) => {
            this.setState({
                messages: snapshot.val(),
                show_load_full_button: false
            });
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

    send_image(e) {
        e.preventDefault();
        var file = e.target.files[0];

        var storage_ref = firebase.storage().ref('message_pic/' + this.state.session_id + '-' + Date.now());
        var upload_task = storage_ref.put(file);

        /*only pass in a complete() function*/
        upload_task.on('state_changed', null, null, () => {
            var image_url = upload_task.snapshot.downloadURL;
            add_image_message(this.state.session_id, this.state.my_name, image_url);
        })
    }


    render() {
        var friend_profiles = get_friend_profiles();
        var prev_sender = "";
        /*keep track of who sent the previous message, and not show icon and name on the next one */

        var load_full_button = "";
        if (this.state.show_load_full_button)
            load_full_button = (
                <div align='center'>
                    <button className='load-full-history-button'
                            onClick={this.load_full_history.bind(this)}>
                        Load full chat history
                    </button>
                </div>
            );

        return (
            <div>


                <div className="message_container" id="message-container">

                    {load_full_button}


                    {
                        Object.keys(this.state.messages).map((message_id, index) => {

                            var message = this.state.messages[message_id];

                            var message_body = <div>{message.msg}</div>;
                            if (message.is_image === true) {
                                message_body = <img src={message.msg} alt=""
                                                    className='message_img'
                                                    onLoad={this.scroll_message_container_to_bottom.bind(this)}
                                />
                            }

                            /* self message */
                            if (message.sender_id === firebase.auth().currentUser.uid) {
                                prev_sender = message.sender_id;
                                return (
                                    <div key={'message-' + index}
                                         className="message_row">
                                        <div className="bubble_right">{message_body}</div>
                                    </div>
                                )
                            }

                            /*message from others*/
                            else {

                                /*filter out blocked sender*/
                                if (get_self_profile().friend_list[message.sender_id] === false)
                                    return (<div></div>)


                                /*get the profile pic*/
                                var sender_profile = friend_profiles[message.sender_id] || {};
                                var profile_pic = sender_profile.profile_pic;

                                if (profile_pic === null || profile_pic === "" || profile_pic === undefined)
                                    profile_pic = default_profile_pic;


                                var chat_icon_div = (
                                    <div className="sender_icon_container" onClick={() => {
                                        this.goto_other_profile(message.sender_id)
                                    }}>
                                        <img className="sender_icon" src={profile_pic} alt="Sender"/>
                                    </div>);


                                var sender_name_div = (<div className="sender"> {message.sender}</div>);

                                /*hide profile pic and sender name if equal to last messages sender*/
                                if (message.sender_id === prev_sender) {
                                    chat_icon_div = (<div className="sender_icon_container_invisible"></div>);
                                    sender_name_div = (<div></div>);
                                }

                                prev_sender = message.sender_id;

                                return (
                                    <div key={'message-' + index}
                                         className="message_row">

                                        {chat_icon_div}

                                        <div className="sender_message_container">
                                            {sender_name_div}
                                            <div className="bubble_left">{message_body}</div>
                                        </div>

                                    </div>
                                )
                            }

                        })
                    }

                    <div className="message_container_bottom_padding"></div>

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

                    <label htmlFor="send-image" className='send-img-button'>
                        <svg viewBox="0 0 32 32" width="20" height="20"
                             fill="none" stroke="#2f5597"
                             strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                            <path d="M20 24 L12 16 2 26 2 2 30 2 30 24 M16 20 L22 14 30 22 30 30 2 30 2 24"/>
                            <circle cx="10" cy="9" r="3"/>
                        </svg>
                    </label>
                    <input id='send-image' type='file' name='Send Image' accept='image/*'
                           onChange={e => this.send_image(e)}/>

                </div>

            </div>
        )
    }



}

export default ChatSessionView;