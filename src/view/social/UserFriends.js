import React, {Component} from 'react';
import {lookup_profile_by_user_id} from "../../dao/ProfileManager";
import firebase from 'firebase';


class UserFriends extends Component{

    constructor(props){
        super(props);
        this.title = "UserFriends.js";
        this.state = {
            profile_obj: {}
        }
    }


    componentWillMount(){
        lookup_profile_by_user_id(firebase.auth().currentUser.uid, (err, profile_obj) =>{
            this.setState({
                profile_obj: profile_obj
            });
        })
    }

    render(){
        return(

            <div >

                <img src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"}
                     alt={""} width={"300"}/>
                <h1>{this.title}</h1>

                <h4>うまるの友達!</h4>

                <pre>{JSON.stringify(this.state,null,2)}</pre>

            </div>

        )
    }
}

export default UserFriends;