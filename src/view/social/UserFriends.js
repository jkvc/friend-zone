import React, {Component} from 'react';
import {get_friend_profiles, get_self_profile} from "../../api/StaticData";


class UserFriends extends Component{

    constructor(props){
        super(props);
        this.title = "UserFriends.js";
        this.state = {
            profile_obj: get_self_profile(),
            friend_profiles: get_friend_profiles()
        }
    }


    render(){
        return(

            <div >

                <img src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"}
                     alt={""} width={"300"}/>
                <h1>{this.title}</h1>

                <h4>うまるの友達!</h4>

                {
                    Object.keys(this.state.friend_profiles).map((friend_id, index)=>{
                        return(
                            <div key={"friend-profile-"+index}>
                                Friend:
                                {this.state.friend_profiles[friend_id].first_name}
                                {this.state.friend_profiles[friend_id].last_name}
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