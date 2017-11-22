import React, {Component} from 'react';
import {get_chat_participant_by_id, get_chat_pic_by_id} from "./ChatSessionManager";
import {get_friend_profiles} from "../api/StaticData";
import {lookup_profile_by_user_id} from "../dao/ProfileManager";

import './ChatDetailView.css'

class ChatDetailView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            session_id: props.session_id,
            session_pic: null,
            participant_ids: [],
            participant_profile_obj: {}
        }
    }

    componentWillMount() {

        get_chat_pic_by_id(this.state.session_id, (err, pic_url) => {
            if (!err)
                this.setState({session_pic: pic_url});
        })

        get_chat_participant_by_id(this.state.session_id, (err, session_participants) => {
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

    render() {
        return (
            <div className='chat-detail-container'>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        )
    }

}

export default ChatDetailView;