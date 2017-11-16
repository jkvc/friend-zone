import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import EditProfile from './EditProfile'
import InitProfile from './InitProfile'
import Profile from '../../dao/Profile'
import {lookup_profile_by_user_id} from '../../dao/ProfileManager'
import firebase from 'firebase';

class UserProfile extends Component{


    constructor(props){
        super(props);
        this.title = "UserProfile.js";
        this.state = {
            profile_obj: new Profile("","","","","","","")
        };
        this.initialized = false;
    }

    handle_edit_profile(){
        ReactDOM.render(<EditProfile />, document.getElementById('main-layout'));
    }

    render(){

        if (!this.initialized){
            let user_id = firebase.auth().currentUser.uid;
            lookup_profile_by_user_id(user_id, function(err,data){

                if (err)
                    ReactDOM.render(<InitProfile />, document.getElementById('main-layout'));
                else{
                    this.initialized = true;
                    this.setState({
                        profile_obj: data
                    });
                }

            }.bind(this))
        }

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