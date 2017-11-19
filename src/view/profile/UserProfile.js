import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import EditProfile from './EditProfile'
import {get_self_profile} from "../../api/StaticData";

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

            <div>

                <img src={this.state.profile_obj.profile_pic}
                     alt={""} width={"500"}/>
                <h1>{this.title}</h1>
                <h4>これがうまるのプロファイルだ！</h4>

                <br/>
                state:
                <pre>{JSON.stringify(this.state,null,2)}</pre>


                <button onClick={this.handle_edit_profile.bind(this)} >Edit profile</button>

            </div>

        )
    }
}

export default UserProfile;