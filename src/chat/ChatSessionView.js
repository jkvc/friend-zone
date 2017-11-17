import React, {Component} from 'react';
import firebase from 'firebase';
import {add_message} from "./ChatSessionManager";
import {lookup_profile_by_user_id} from "../dao/ProfileManager";

import './ChatSessionView.css'

class ChatSessionView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            session_id: props.session_id,
            messages: {},
            title: "",
            input: "",
            my_name: ""
        }
    }

    componentWillMount() {
        var ref = firebase.database().ref('ChatSession/' + this.state.session_id);
        ref.once('value').then((snapshot) => {
            this.setState({messages: snapshot.val().message})
        });

        ref.child('message').on('child_added', (snapshot) => {
            var new_msg = snapshot.val();
            var new_message_obj = this.state.messages;
            new_message_obj[new_msg.time] = new_msg;
            this.setState({messages: new_message_obj})
        });

        lookup_profile_by_user_id(firebase.auth().currentUser.uid, (err,profile_obj)=>{
            this.setState({my_name: profile_obj.first_name+" "+profile_obj.last_name})
        })
    }

    handle_input_key_press(e){
        if (e.key === 'Enter'){
            add_message(this.state.session_id, this.state.my_name, this.state.input);
            this.setState({input:""})
        }
    }

    render() {
        return (
            <div>

                <input type="text" value={this.state.input}
                       onChange={(e)=>{
                           this.setState({input:e.target.value})
                       }}
                       onKeyPress={this.handle_input_key_press.bind(this)}
                />

                <div className="message_container">
                    {
                        Object.keys(this.state.messages).reverse().map((message_key, index)=>{

                            let message = this.state.messages[message_key];

                            return(
                                <div key={'message-'+index} >
                                    time: {message.time} <br/>
                                    sender: {message.sender} <br/>
                                    message: {message.msg} <br/>
                                    <br/>
                                </div>
                            )

                        })
                    }
                </div>




                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        )
    }

}

export default ChatSessionView;