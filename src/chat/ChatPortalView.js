import React, {Component} from 'react';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import StartNewChatView from "./StartNewChatView";
import ChatSessionView from "./ChatSessionView";
import "./ChatPortalView.css"
import {read_portal, sort_portal_by_time} from "./ChatPortalManager";
import default_profile_pic from "../image/DefaultProfilePic.jpg"
import default_group_chat_pic from "../image/DefaultGroupChatPic.jpg"
import {get_friend_profiles} from "../api/StaticData";

class ChatPortalView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            portals: [],
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
            this.setState({portals: portal_list})

        });

        ref.once('value').then((snapshot) => {
            var portals_obj = snapshot.val() || {};
            var portal_keys = Object.keys(portals_obj);
            var portals_list = [];
            for (var i = 0; i < portal_keys.length; i += 1) {
                portals_list.push(portals_obj[portal_keys[i]])
            }
            /*sort it by time*/
            portals_list.sort(sort_portal_by_time);
            this.setState({portals: portals_list})
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
        this.setState({active_chat: session_id});
        read_portal(firebase.auth().currentUser.uid, session_id);
        ReactDOM.render(<ChatSessionView session_id={session_id}
                                         key={"chat_session-" + session_id}/>, document.getElementById('session-container'));
    }

    get_timestring(millis) {
        let time = new Date();
        time.setTime(millis);
        var hr = time.getHours()
        var min = time.getMinutes()
        var sec = time.getSeconds()
        return "" + hr + ":" + min + ":" + sec;
    }

    render() {

        if (!this.state.initialized) return (<div>loading</div>)

        return (

                <div className="chat_portal_inner">

                    <div className="search_box_bar">

                        <input type="text" className="portal-search-box"
                               placeholder="Search chat"/>


                        <button className="portal-new-chat-button"
                                onClick={this.goto_start_chat.bind(this)}>
                            New
                        </button>

                    </div>


                    <div className="below_search_chat_bar">
                        {
                            this.state.portals.map((portal, index) => {


                                var portal_class = "portal_entry";
                                var chat_icon_class = "chat_icon_container"
                                if (portal.unread) portal_class = "portal_entry_unread";
                                if (portal.session_id === this.state.active_chat) {
                                    portal_class = "portal_entry_active";
                                    chat_icon_class= "chat_icon_container_active"
                                }

                                var title = portal.title;
                                var profile_pic = default_group_chat_pic;

                                /*handle if is a single chat and replace the name*/
                                var participant_ids = Object.keys(portal.participant_ids || {});
                                if (participant_ids.length === 2) {
                                    var self_id = firebase.auth().currentUser.uid;
                                    var other_id = participant_ids[0] === self_id ? participant_ids[1] : participant_ids[0];
                                    var friend_profile = this.state.friend_profiles[other_id];
                                    title = friend_profile.first_name + " " + friend_profile.last_name;
                                    profile_pic = friend_profile.profile_pic === "" ? default_profile_pic : friend_profile.profile_pic;
                                }


                                return (

                                    <div className={portal_class}
                                         key={"portal-" + index} onClick={() => {
                                        this.goto_chat_session(portal.session_id)
                                    }}>

                                        <div className={chat_icon_class}>
                                            <img src={profile_pic} alt="profile_image" className="chat_icon"/>
                                        </div>

                                        <div className="portal_text_container">
                                            <div className="portal_title"> {title}</div>
                                            <div className="portal_time">{this.get_timestring(portal.time)}</div>
                                        </div>

                                    </div>

                                )
                            })
                        }
                    </div>



                {/*<pre>{JSON.stringify(this.state, null, 2)}</pre>*/}
            </div>

        )
    }

}


export default ChatPortalView;