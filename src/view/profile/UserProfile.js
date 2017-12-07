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


                <table className="table4" align="center">
                    <tbody>
                    <tr>
                        <td className=".td3">
                            <span className="glyphicon glyphicon-user">  </span>
                            <label className=".l1">                 Name:               {this.state.profile_obj.first_name + " " + this.state.profile_obj.last_name} </label>
                        </td>
                    </tr>
                    <tr>
                        <td className=".td3">
                            <span className="glyphicon glyphicon-screenshot"> </span>
                            <label className=".l1">                 Major:               {this.state.profile_obj.major} </label>
                        </td>

                    </tr>
                    <tr>
                        <td className=".td3">
                            <span className="glyphicon glyphicon-star"></span>

                            <label className=".l1">                 Current year:     {this.state.profile_obj.current_year} </label>
                        </td>

                    </tr>
                    <tr>
                        <td className=".td3">
                            <span className="glyphicon glyphicon-zoom-in"></span>
                            <label className=".l">                  Description:   {this.state.profile_obj.description} </label>
                        </td>
                    </tr>
                    <tr>
                        <td className=".td3">
                        <a href={this.state.profile_obj.fb_link}><img className="td4" src={facebook_icon} alt="" width='100px' height='20px'/></a>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <button className=".edit" onClick={this.handle_edit_profile.bind(this)}>
                    Edit profile
                </button>

                <br/>
                <br/>

            </div>

        )
    }
}

export default UserProfile;
