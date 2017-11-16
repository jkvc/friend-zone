import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import EditProfile from './EditProfile'
import Profile from '../../dao/Profile'
import {lookup_profile_by_user_id} from '../../dao/ProfileManager'
import firebase from 'firebase';
import InitProfile from "./InitProfile";

class UserProfile extends Component{


    constructor(props){
        super(props);
        this.title = "UserProfile.js";
        this.state = {
            profile_obj: new Profile("","","","","","","")
        };
        this.initialized = false;
        lookup_profile_by_user_id(firebase.auth().currentUser.uid, (err,data)=>{
            if (err){
                /*in case user does not have a profile yet, force them to sign up for one*/
                ReactDOM.render(<InitProfile />, document.getElementById('main-layout'));
            } else {
                this.setState({profile_obj:data})
            }
        })
    }

    handle_edit_profile(){
        ReactDOM.render(<EditProfile />, document.getElementById('main-layout'));
    }

    render(){


        return(

            <div>

                <img src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"}
                     alt={""} width={"300"}/>
                <h1>{this.title}</h1>
                <h4>これがうまるのプロファイルだ！</h4>

                <br/>
                profile_obj:
                <pre>{JSON.stringify(this.state.profile_obj,null,2)}</pre>


                <button onClick={this.handle_edit_profile.bind(this)} >Edit profile</button>

            </div>

        )
    }
}

export default UserProfile;