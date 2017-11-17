import React, {Component} from 'react';
import firebase from 'firebase';
import {create_chat_session} from "./ChatSessionManager";
import {lookup_profile_by_user_id} from "../dao/ProfileManager";

class StartNewChatView extends Component{

    constructor(props){
        super(props);
        this.state = {
            profile_obj: null,
            friend_profiles: [],
            selected_friend_id: [],
            selected_friend_name: [],
            chat_title: ""
        };

        lookup_profile_by_user_id(firebase.auth().currentUser.uid, (err, profile_obj)=>{
            this.setState({
                profile_obj: profile_obj
            })
        })
    }

    componentWillMount(){
        lookup_profile_by_user_id(firebase.auth().currentUser.uid, (err, profile_obj) =>{
            this.setState({
                profile_obj: profile_obj
            }, this.get_friend_profiles.bind(this));
        })
    }

    /*called after getting this users profile*/
    get_friend_profiles(){
        var friend_id_list = Object.keys(this.state.profile_obj.friend_list);
        var aggregated_friend_profiles = [];
        friend_id_list.forEach((friend_id)=>{
            lookup_profile_by_user_id(friend_id, (err,data)=>{
                if (!err){
                    aggregated_friend_profiles.push(data);
                    this.setState({
                        friend_profiles: aggregated_friend_profiles
                    })
                }
            })
        })
    }

    /*add selection to start a chat*/
    add_select(friend_id, friend_name){
        let new_id_list = this.state.selected_friend_id;
        new_id_list.push(friend_id);
        this.setState({selected_friend_id:new_id_list})

        let new_name_list = this.state.selected_friend_name;
        new_name_list.push(friend_name);
        this.setState({selected_friend_name:new_name_list})
    }

    start_chat(){
        var my_name = this.state.profile_obj.first_name+ " " + this.state.profile_obj.last_name;
        var participants = this.state.selected_friend_id;
        participants.push(firebase.auth().currentUser.uid);
        create_chat_session(my_name, participants, this.state.chat_title)
    }


    render(){
        return(
            <div>

                chat title
                <input type="text"
                       value={this.state.chat_title}
                       onChange={e => this.setState({chat_title: e.target.value})}/>

                <button onClick={this.start_chat.bind(this)} >start chat</button>


                <br/>
                selected friends
                <br/>
                {
                    this.state.selected_friend_name.map((friend_name)=>{
                        return(
                            <div key={"friend-selected-"+friend_name}>{friend_name}</div>
                        )
                    })
                }


                <br/>
                {
                    this.state.friend_profiles.map((friend_profile)=>{
                        return(
                            <div key={"friend-profile-"+friend_profile.user_id}>
                                Friend: {friend_profile.first_name} {friend_profile.last_name}

                                <button onClick={()=>{
                                    this.add_select(friend_profile.user_id, friend_profile.first_name+friend_profile.last_name)
                                }} > select </button>

                            </div>
                        )
                    })
                }

                <pre>{JSON.stringify(this.state,null,2)}</pre>
            </div>

        )
    }


}

export default StartNewChatView;