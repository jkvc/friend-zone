import React, {Component} from 'react';
import firebase from 'firebase';
import {add_message} from "./ChatSessionManager";
import {lookup_profile_by_user_id} from "../dao/ProfileManager";

import './ChatSessionView.css'
import {read_portal} from "./ChatPortalManager";

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
        message_container.scrollTop = message_container.scrollHeight;
    }

    handle_input_key_press(e) {
        if (e.key === 'Enter' && this.state.input.length > 0) {
            this.send_message();
            read_portal(firebase.auth().currentUser.uid, this.state.session_id);
        }
    }

    send_message(){
        add_message(this.state.session_id, this.state.my_name, this.state.input);
        this.setState({input: ""})
    }

    render() {
        return (
            <div>

                <div className="message_container" id="message-container">
                    {
                        this.state.messages.map((message, index) => {

                            return (

                                <div key={'message-' + index}
                                     className="message_entry">
                                    time: {message.time} <br/>
                                    sender: {message.sender} <br/>
                                    message: {message.msg} <br/>
                                    <br/>
                                </div>

                            )

                        })
                    }
                </div>


                <input type="text" className="message_input"
                       value={this.state.input}
                       onChange={(e) => {
                           this.setState({input: e.target.value})
                       }}
                       onKeyPress={this.handle_input_key_press.bind(this)}
                />


            </div>
        )
    }


}

export default ChatSessionView;