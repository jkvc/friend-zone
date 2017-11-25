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
            filtered_friend_profiles: {},
            selected_friend_id: [],
            selected_friend_name: [],
            chat_title: "",
            show_chat_title_box: false,
            show_start_button: false,
            search_key: ""
        };
        this.callback = props.callback;
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
                        friend_profiles: aggregated_friend_profiles,
                        filtered_friend_profiles: aggregated_friend_profiles
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

        if (new_name_list.length > 1) this.setState({show_chat_title_box: true});
        else this.setState({show_chat_title_box: false});
        if (new_name_list.length > 0) this.setState({show_start_button: true});
        else this.setState({show_start_button: false});
    }

    /*remove from selected friends*/
    remove_select(index) {
        var friend_id_list = this.state.selected_friend_id;
        var friend_name_list = this.state.selected_friend_name;

        friend_id_list.splice(index, 1);
        friend_name_list.splice(index, 1);

        this.setState({
            selected_friend_id: friend_id_list,
            selected_friend_name: friend_name_list
        })

        if (friend_name_list.length > 1) this.setState({show_chat_title_box: true});
        else this.setState({show_chat_title_box: false});
        if (friend_name_list.length > 0) this.setState({show_start_button: true});
        else this.setState({show_start_button: false});
    }

    /*the start chat button*/
    start_chat() {
        var my_name = this.state.profile_obj.first_name + " " + this.state.profile_obj.last_name;

        var participant_ids = this.state.selected_friend_id;
        participant_ids.push(firebase.auth().currentUser.uid);

        create_chat_session(my_name, participant_ids, this.state.chat_title, (session_id) => {
            ReactDOM.render(<ChatSessionView session_id={session_id}/>, document.getElementById('session-container'));

            /*if passed in a callback function, callback a session id once starting is done*/
            if (this.callback) this.callback(session_id)
        })

    }

    /*handle putting something in the friend name search box*/
    handle_friend_filter(search_key) {
        this.setState({search_key: search_key});
        var filtered_profile = {};

        Object.keys(this.state.friend_profiles).forEach((key) => {
            var friend_profile = this.state.friend_profiles[key];
            var friend_name = friend_profile.first_name + " " + friend_profile.last_name;

            if (friend_name.toLowerCase().startsWith(search_key.toLowerCase())) {
                filtered_profile[friend_profile.user_id] = friend_profile;
            }
            this.setState({filtered_friend_profiles: filtered_profile})

        })
    }


    render() {

        var chat_title_box = (<div></div>);
        if (this.state.show_chat_title_box)
            chat_title_box = (
                <input type="text" className="chat_title_box"
                       placeholder={"Name your group chat"}
                       value={this.state.chat_title}
                       disabled={this.state.selected_friend_id.length <= 1}
                       onChange={e => this.setState({chat_title: e.target.value})}/>
            );

        var start_button = (<div></div>);
        if (this.state.show_start_button)
            start_button = (
                <button className="start_chat_button"
                        onClick={this.start_chat.bind(this)}
                        disabled={this.state.selected_friend_id.length === 0 ||
                        (this.state.chat_title.length === 0 && this.state.selected_friend_id.length > 1)}>
                    Start chat
                </button>
            );


        return (
            <div className="start_new_friend_container" align='center'>

                <div className='start-new-chat-title'>Start new chat</div>
                <div className='start-new-chat-subtitle'>Select a friend to start chatting, or select multiple friends
                    to start a group chat
                </div>

                <div className="chat_title_bar">

                    {chat_title_box}
                    {start_button}

                </div>


                <table className="selected_friend_bar">
                    <tbody>
                    {
                        this.state.selected_friend_name.map((friend_name, index) => {
                            return (
                                <tr className="selected_friend_entry"
                                    key={"friend-selected-" + index}>

                                    <td>{friend_name}</td>
                                    <td>
                                        <button className='start_chat_button'
                                                onClick={() => {
                                                    this.remove_select(index)
                                                }}>
                                            remove
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <br/>

                <div className="chat_title_bar">
                    <input type="text" className="chat_title_box"
                           placeholder="Search friends"
                           value={this.state.search_key}
                           onChange={e => {
                               this.handle_friend_filter(e.target.value)
                           }}
                    />
                </div>


                <table className="potential_friend_container">
                    <tbody>
                    {
                        Object.keys(this.state.filtered_friend_profiles).map((friend_profile_key, index) => {
                            var friend_profile = this.state.friend_profiles[friend_profile_key]
                            return (
                                <tr className="potential_friend_entry"
                                    key={"friend-profile-" + index}>
                                    <td>
                                        <div className='potential-friend-icon-container'>
                                            <img className='potential-friend-icon' src={friend_profile.profile_pic}
                                                 alt=""/>
                                        </div>
                                    </td>

                                    <td>
                                        {friend_profile.first_name} {friend_profile.last_name}
                                    </td>

                                    <td>
                                        <button className='start_chat_button'
                                                disabled={this.state.selected_friend_id.indexOf(friend_profile.user_id) !== -1}
                                                onClick={() => {
                                                    this.add_select(friend_profile.user_id, friend_profile.first_name + " " + friend_profile.last_name)
                                                }}> select
                                        </button>
                                    </td>

                                </tr>

                            )
                        })
                    }
                    </tbody>
                </table>


                {/*<pre>{JSON.stringify(this.state, null, 2)}</pre>*/}
            </div>

        )
    }


}

export default StartNewChatView;