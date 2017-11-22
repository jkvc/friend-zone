import React, {Component} from 'react';
import {get_chat_participant_by_id, get_chat_pic_by_id, update_session_pic} from "./ChatSessionManager";
import {get_friend_profiles} from "../api/StaticData";
import {lookup_profile_by_user_id} from "../dao/ProfileManager";
import default_group_chat_pic from '../image/DefaultGroupChatPic.jpg'
import firebase from 'firebase';

import './ChatDetailView.css'

class ChatDetailView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            session_id: props.session_id,
            session_pic: default_group_chat_pic,
            show_pic_name_change_button: false,
            new_name: "",
            participant_ids: [],
            participant_profile_obj: {}
        }
    }

    componentWillMount() {

        get_chat_pic_by_id(this.state.session_id, (err, pic_url) => {
            if (!err)
                this.setState({session_pic: pic_url});
        });

        get_chat_participant_by_id(this.state.session_id, (err, session_participants) => {

            if (Object.keys(session_participants).length !== 2)
                this.setState({show_pic_name_change_button: true});

            this.setState({participant_ids: Object.keys(session_participants)}, () => {

                var friend_profiles = get_friend_profiles();
                var aggregated_participant_profiles = {};

                this.state.participant_ids.forEach((participant_id) => {

                    /*if participants profile is in friend profiles i.e. already friends*/
                    if (friend_profiles[participant_id] !== undefined) {
                        aggregated_participant_profiles[participant_id] = friend_profiles[participant_id];
                        this.setState({participant_profile_obj: aggregated_participant_profiles});
                    }
                    /*else lookup this user*/
                    else {
                        lookup_profile_by_user_id(participant_id, (err, profile) => {
                            if (!err) {
                                aggregated_participant_profiles[participant_id] = profile;
                                this.setState({participant_profile_obj: aggregated_participant_profiles});
                            }
                        })
                    }

                })
                /*end of for each participant id lookup profile*/
            });
        })
    }

    update_chat_pic(e) {
        e.preventDefault();
        var file = e.target.files[0];

        var storage_ref = firebase.storage().ref('chat_session_pic/' + this.state.session_id);
        var upload_task = storage_ref.put(file);

        /*only pass in a complete() function*/
        upload_task.on('state_changed', null, null, () => {
            var image_url = upload_task.snapshot.downloadURL;
            this.setState({session_pic: image_url});

            update_session_pic(this.state.session_id, image_url);
        })

    }


    render() {

        var update_pic_button = (<div></div>);
        if (this.state.show_pic_name_change_button) {
            update_pic_button = (
                <div>
                    <label htmlFor="chat-pic-upload" className='chat-pic-upload-button'>
                        Update chat image &nbsp;
                        <svg viewBox="0 0 32 32" width="20" height="20"
                             fill="none" stroke="#2f5597"
                             strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                            <path d="M20 24 L12 16 2 26 2 2 30 2 30 24 M16 20 L22 14 30 22 30 30 2 30 2 24"/>
                            <circle cx="10" cy="9" r="3"/>
                        </svg>
                    </label>
                    <input id='chat-pic-upload' type='file' name='New Chat Picture' accept='image/*'
                           onChange={e => this.update_chat_pic(e)}/>
                </div>
            )
        }

        return (
            <div className='chat-detail-container' align='center'>
                <br/><br/>

                <div className='chat-pic-container'>
                    <img className='chat-pic' src={this.state.session_pic} alt=""/>
                </div>

                {update_pic_button}

                <div>
                    {}
                </div>



                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        )
    }

}

export default ChatDetailView;