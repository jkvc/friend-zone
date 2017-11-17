import React, {Component} from 'react';
import {lookup_profile_by_user_id} from "../../dao/ProfileManager";
import firebase from 'firebase';


class UserFriends extends Component{

    constructor(props){
        super(props);
        this.title = "UserFriends.js";
        this.state = {
            profile_obj: {},
            friend_profiles: []
        }
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

    render(){
        return(

            <div >

                <img src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"}
                     alt={""} width={"300"}/>
                <h1>{this.title}</h1>

                <h4>うまるの友達!</h4>

                {
                    this.state.friend_profiles.map((friend_profile)=>{
                        return(
                            <div key={"friend-profile-"+friend_profile.user_id}>
                                Friend: {friend_profile.first_name} {friend_profile.last_name}
                            </div>
                        )
                    })
                }

                <pre>{JSON.stringify(this.state,null,2)}</pre>

            </div>

        )
    }
}

export default UserFriends;