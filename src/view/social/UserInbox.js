import React, {Component} from 'react';
import {accept_friend_request, decline_friend_request, lookup_profile_by_user_id} from "../../dao/ProfileManager";
import firebase from 'firebase';


class UserInbox extends Component{

    constructor(props){
        super(props);
        this.title = "UserInbox.js";
        this.state = {
            incoming_request: [],
            incoming_profiles: []
        }
    }

    componentWillMount(){
        lookup_profile_by_user_id(firebase.auth().currentUser.uid, (err,profile_obj)=>{
            var incoming_request = Object.keys(profile_obj.incoming_request);
            this.setState({incoming_request:incoming_request});

            var profile_list = [];
            incoming_request.forEach((id)=>{
                lookup_profile_by_user_id( id, (err,other_profile)=>{
                    profile_list.push(other_profile);
                    this.setState({incoming_profiles: profile_list}, ()=>{
                        this.forceUpdate();
                    })
                })
            })
        })
    }


    /*kill an entry after accept or decline*/
    remove_request(user_id){
        var index = this.state.incoming_request.indexOf(user_id);
        var new_incoming_request = [];
        var new_incoming_profile = [];

        new_incoming_request.splice(index,1);
        new_incoming_profile.splice(index,1) ;

        this.setState({
            incoming_request: new_incoming_request,
            incoming_profiles: new_incoming_profile
        })
    }

    render(){
        return(

            <div >

                <h1>{this.title}</h1>

                <h4>うまるの受信トレイ</h4>

                {
                    this.state.incoming_profiles.map((incoming_profile)=>{

                        return(
                            <div key={"incoming-friend-request-"+incoming_profile.user_id}>
                                Incoming friend request: {incoming_profile.first_name} {incoming_profile.last_name}

                                <button onClick={ ()=>{
                                    accept_friend_request(incoming_profile.user_id, firebase.auth().currentUser.uid);
                                    this.remove_request(incoming_profile.user_id)
                                } }> accept </button>

                                <button onClick={ ()=>{
                                    decline_friend_request(incoming_profile.user_id, firebase.auth().currentUser.uid);
                                    this.remove_request(incoming_profile.user_id)
                                } } > decline </button>


                            </div>
                        )
                    })
                }

                {/*<pre>{JSON.stringify(this.state,null,2)}</pre>*/}

            </div>

        )
    }
}

export default UserInbox;