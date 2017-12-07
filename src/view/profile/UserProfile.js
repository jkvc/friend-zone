import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import EditProfile from './EditProfile'
import {get_self_profile} from "../../api/StaticData";
import PageTitle from "../components/PageTitle";
import default_profile_pic from '../../image/DefaultProfilePic.jpg'
import facebook_icon from '../../image/FacebookIcon.png'


import './UserProfile.css'

class UserProfile extends Component {


    constructor(props) {
        super(props);
        this.title = "UserProfile.js";
        this.state = {
            profile_obj: get_self_profile()
        };

    }

    handle_edit_profile() {
        ReactDOM.render(<EditProfile/>, document.getElementById('main-layout'));
    }

    render() {

        var profile_pic = this.state.profile_obj.profile_pic || default_profile_pic;
        if (profile_pic === "") profile_pic = default_profile_pic;


        return (


            <div align="center">

                <PageTitle title="My Profile"/>
                <br/>
                <div className='profile-pic-container'>
                    <img src={profile_pic} alt="" className='profile-pic'/>
                </div>
                <br/>


                <table className="table3">
                    <tbody>
                    <tr>
                        <td className="td3">Name:</td>
                        <td className="td3">{this.state.profile_obj.first_name + " " + this.state.profile_obj.last_name}</td>
                    </tr>
                    <tr>
                        <td className="td3">Major:</td>
                        <td className="td3">{this.state.profile_obj.major}</td>
                    </tr>
                    <tr>
                        <td className="td3">Current year:</td>
                        <td className="td3">{this.state.profile_obj.current_year}</td>
                    </tr>
                    <tr>
                        <td className="td3">Description:</td>
                        <td className="td3">{this.state.profile_obj.description}</td>
                    </tr>
                    <tr>
                        <a href={this.state.profile_obj.fb_link}><img className="td4" src={facebook_icon} alt="" width='40px'/></a>
                    </tr>
                    </tbody>
                </table>

                <button id="edit" onClick={this.handle_edit_profile.bind(this)}>
                    Edit profile
                </button>

                <br/>
                <br/>

            </div>

        )
    }
}

export default UserProfile;
