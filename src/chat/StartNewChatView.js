import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {create_chat_session} from "./ChatSessionManager";
import {lookup_profile_by_user_id} from "../dao/ProfileManager";
import './StartNewChatView.css'
import ChatSessionView from "./ChatSessionView";

class StartNewChatView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile_obj: null,
            friend_profiles: {},
            selected_friend_id: [],
            selected_friend_name: [],
            chat_title: ""
        };
    }

    componentWillMount() {
        lookup_profile_by_user_id(firebase.auth().currentUser.uid, (err, profile_obj) => {
            this.setState({
                profile_obj: profile_obj
            }, this.get_friend_profiles.bind(this));
        })
    }

    /*called after getting this users profile*/
    get_friend_profiles() {
        var friend_id_list = Object.keys(this.state.profile_obj.friend_list);
        var aggregated_friend_profiles = {};
        friend_id_list.forEach((friend_id) => {
            lookup_profile_by_user_id(friend_id, (err, data) => {
                if (!err) {
                    aggregated_friend_profiles[friend_id] = data;
                    this.setState({
                        friend_profiles: aggregated_friend_profiles
                    })
                }
            })
        })
    }

    /*add to selected_friends*/
    add_select(friend_id, friend_name) {
        let new_id_list = this.state.selected_friend_id;
        new_id_list.push(friend_id);
        this.setState({selected_friend_id: new_id_list})

        let new_name_list = this.state.selected_friend_name;
        new_name_list.push(friend_name);
        this.setState({selected_friend_name: new_name_list})
    }

    /*remove from selected friends*/
    remove_select(index){
        var friend_id_list = this.state.selected_friend_id;
        var friend_name_list = this.state.selected_friend_name;

        friend_id_list.splice(index,1);
        friend_name_list.splice(index,1);

        this.setState({
            selected_friend_id: friend_id_list,
            selected_friend_name: friend_name_list
        })
    }

    start_chat() {
        var my_name = this.state.profile_obj.first_name + " " + this.state.profile_obj.last_name;

        var participant_ids = this.state.selected_friend_id;
        participant_ids.push(firebase.auth().currentUser.uid);

        create_chat_session(my_name, participant_ids, this.state.chat_title, (session_id) => {
            ReactDOM.render(<ChatSessionView session_id={session_id}/>, document.getElementById('session-container'));
        })
    }


    render() {
        return (
            <div className="start_new_friend_container">


                <div className="chat_title_bar">
                    <input type="text" className="chat_title_box"
                           placeholder={"Name your new chat"}
                           value={this.state.chat_title}
                           onChange={e => this.setState({chat_title: e.target.value})}/>

                    <button className="start_chat_button"
                            onClick={this.start_chat.bind(this)}
                            disabled={this.state.selected_friend_id.length===0 || this.state.chat_title.length === 0}>
                        start chat
                    </button>
                </div>


                <div className="selected_friend_bar">
                    Selected: <br/>
                    {
                        this.state.selected_friend_name.map((friend_name, index) => {
                            return (
                                <div className="selected_friend_entry"
                                     key={"friend-selected-" + index}>
                                    {friend_name}

                                    <button onClick={()=>{this.remove_select(index)}}>
                                        remove</button>
                                </div>
                            )
                        })
                    }
                </div>


                <div className="potential_friend_container">
                    {
                        Object.keys(this.state.friend_profiles).map((friend_profile_key, index) => {
                            var friend_profile = this.state.friend_profiles[friend_profile_key]
                            return (
                                <div className="potential_friend_entry"
                                     key={"friend-profile-" + index}>
                                    Friend: {friend_profile.first_name} {friend_profile.last_name}

                                    <button disabled={this.state.selected_friend_id.indexOf(friend_profile.user_id)!==-1}
                                        onClick={() => {
                                        this.add_select(friend_profile.user_id, friend_profile.first_name + " " + friend_profile.last_name)
                                    }}> select
                                    </button>
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

export default StartNewChatView;