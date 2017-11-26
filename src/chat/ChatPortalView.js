import React, {Component} from 'react';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import StartNewChatView from "./StartNewChatView";
import ChatSessionView from "./ChatSessionView";
import "./ChatPortalView.css"
import {read_portal, sort_portal_by_time} from "./ChatPortalManager";
import default_profile_pic from "../image/DefaultProfilePic.jpg"
import default_group_chat_pic from "../image/DefaultGroupChatPic.jpg"
import {get_friend_profiles, get_self_profile} from "../api/StaticData";
import ChatDetail from "./ChatDetailView";

class ChatPortalView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            portals: [],
            search_key: "",
            active_chat: props.active,
            friend_profiles: get_friend_profiles(),
            initialized: true
        };
    }

    /*happens before render*/
    componentWillMount() {

        /*prepare the portals list, and listen to any change*/

        let uid = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref('ChatPortal/' + uid);

        ref.on('child_changed', (snapshot) => {
            var updated_portal = snapshot.val();
            var portal_list = this.state.portals;

            /*update this portal in its original position then sort again*/
            for (var i = 0; i < portal_list.length; i += 1) {
                if (portal_list[i].session_id === updated_portal.session_id) {
                    portal_list[i] = updated_portal;
                    break
                }
            }
            portal_list.sort(sort_portal_by_time);
            this.setState({portals: portal_list});
        });

        ref.on('child_added', (snapshot) => {
            var new_portal = snapshot.val();
            var portal_list = this.state.portals;
            /*put this new portal at the BEGINNING of list*/
            portal_list.unshift(new_portal);
            portal_list.sort(sort_portal_by_time);
            this.setState({portals: portal_list})
        });

    }

    update_active(session_id) {
        this.setState({active_chat: session_id});
    }

    goto_start_chat() {
        this.setState({active_chat: ""});
        ReactDOM.render(<StartNewChatView
            callback={this.update_active.bind(this)}/>, document.getElementById('session-container'));
    }

    goto_chat_session(session_id) {

        this.setState({
            active_chat: session_id,
            search_key: ""
        });
        read_portal(firebase.auth().currentUser.uid, session_id);
        ReactDOM.render(<ChatSessionView session_id={session_id}
                                         key={"chat_session-" + session_id}/>, document.getElementById('session-container'));
    }

    goto_session_detail(session_id) {
        ReactDOM.render(<ChatDetail session_id={session_id}
                                    key={"chat_detail" + session_id}/>, document.getElementById('session-container'));
    }

    get_timestring(millis) {
        let time = new Date();
        time.setTime(millis);

        var week_array = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        var day = week_array[time.getDay()];

        var hr = time.getHours()
        var min = time.getMinutes()
        var sec = time.getSeconds()

        if (hr < 10) hr = "0" + hr;
        if (min < 10) min = "0" + min;
        if (sec < 10) sec = "0" + sec;

        return day + " " + hr + ":" + min + ":" + sec;
    }


    render() {

        if (!this.state.initialized) return (<div>loading</div>);


        return (

            <div className="chat_portal_inner">

                <div className="search_box_bar">

                    <input type="text" className="portal-search-box"
                           placeholder="Search chat" value={this.state.search_key}
                           onChange={(e) => {
                               this.setState({search_key: e.target.value});
                           }}
                    />

                    <svg className="portal-new-chat-button" id="i-compose" viewBox="0 0 32 32" width="20" height="20"
                         fill="none" stroke="currentcolor"
                         strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                         onClick={this.goto_start_chat.bind(this)}>
                        <path
                            d="M27 15 L27 30 2 30 2 5 17 5 M30 6 L26 2 9 19 7 25 13 23 Z M22 6 L26 10 Z M9 19 L13 23 Z"/>
                    </svg>

                </div>


                <div className="below_search_chat_bar">
                    {
                        this.state.portals.map((portal, index) => {


                            var portal_class = "portal_entry";
                            var chat_icon_class = "chat_icon_container";
                            if (portal.unread) portal_class = "portal_entry_unread";
                            if (portal.session_id === this.state.active_chat) {
                                portal_class = "portal_entry_active";
                                chat_icon_class = "chat_icon_container_active"
                            }

                            var title = portal.title;
                            var profile_pic = portal.portal_pic || default_group_chat_pic;

                            /*handle if is a single chat and replace the name and profile pic*/
                            var participant_ids = Object.keys(portal.participant_ids || {});
                            if (participant_ids.length === 2) {
                                var self_id = firebase.auth().currentUser.uid;
                                var other_id = participant_ids[0] === self_id ? participant_ids[1] : participant_ids[0];

                                /*if the other friend is blocked, do not show this portal*/
                                if (get_self_profile().friend_list[other_id] === false) return(<div> </div>);

                                var friend_profile = this.state.friend_profiles[other_id];
                                /*if the other friend got deleted, do not show this portal */
                                if(friend_profile === undefined) return(<div> </div>);
                                
                                title = friend_profile.first_name + " " + friend_profile.last_name;
                                profile_pic = friend_profile.profile_pic === "" ? default_profile_pic : friend_profile.profile_pic;
                            }

                            var chat_detail_button = (<div></div>);
                            if (this.state.active_chat === portal.session_id &&
                                Object.keys(portal.participant_ids).length > 2)
                                chat_detail_button = (
                                    <button className="chat_detail_button"
                                            onClick={(e) => {
                                                this.goto_session_detail(portal.session_id);
                                            }}>
                                        <svg id="i-settings" viewBox="0 0 32 32" width="20" height="20" fill="none"
                                             stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"
                                             strokeWidth="2">
                                            <path d="M4 8 L28 8 M4 16 L28 16 M4 24 L28 24"/>
                                        </svg>
                                    </button>
                                );


                            /*filter out the ones that do not match search key*/
                            if (title.toLowerCase().startsWith(this.state.search_key.toLowerCase())) return (

                                <div className={portal_class}
                                     key={"portal-" + index}
                                     onClick={() => {
                                         if (portal.session_id !== this.state.active_chat)
                                             this.goto_chat_session(portal.session_id);
                                     }}>

                                    <div className={chat_icon_class}>
                                        <img src={profile_pic} alt="profile_image" className="chat_icon"/>
                                    </div>

                                    <div className="portal_text_container">
                                        <div className="portal_title"> {title} </div>
                                        <div className="portal_time">{this.get_timestring(portal.time)}</div>

                                        {chat_detail_button}
                                    </div>

                                </div>

                            )

                            else return(<div> </div>)
                        })
                    }
                </div>


                {/*<pre>{JSON.stringify(this.state, null, 2)}</pre>*/}
            </div>

        )
    }

}


export default ChatPortalView;