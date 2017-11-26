import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import EditProfile from './EditProfile'
import {get_self_profile} from "../../api/StaticData";

import './UserProfile.css'
class UserProfile extends Component{


    constructor(props){
        super(props);
        this.title = "UserProfile.js";
        this.state = {
            profile_obj: get_self_profile()
        };

    }

    handle_edit_profile(){
        ReactDOM.render(<EditProfile />, document.getElementById('main-layout'));
    }

    render(){


        return(

            <div id="content">

                <h1>My Profile</h1>
                <img src={this.state.profile_obj.profile_pic}
                     alt={""} width={"250"}/>
                <h1>{this.title}</h1>
                <h4>これがうまるのプロファイルだ！</h4>

                <div id="infolist">
                  <br/>
                  <a>first name: </a>
                  <a>{JSON.stringify(this.state.profile_obj.first_name,null,2)}</a>
                  <br/>
                  <a>last name: </a>
                  <a>{JSON.stringify(this.state.profile_obj.last_name,null,2)}</a>
                  <br/>
                  <a>major: </a>
                  <a>{JSON.stringify(this.state.profile_obj.major,null,2)}</a>
                  <br/>
                  <a>current year: </a>
                  <a>{JSON.stringify(this.state.profile_obj.current_year,null,2)}</a>
                  <br/>
                  <a>description: </a>
                  <a>{JSON.stringify(this.state.profile_obj.description,null,2)}</a>
                  <br/>
                </div>

                <button id="edit" onClick={this.handle_edit_profile.bind(this)} >Edit profile</button>

            </div>

        )
    }
}

export default UserProfile;
