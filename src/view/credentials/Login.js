import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import SignUp from './SignUp';
import './MainLoginSignup.css'
import './Login.css'
import facebook_icon from '../../image/FacebookIcon.png'
import gmail_icon from '../../image/GmailIcon.png'
import blue_line from '../../image/BlueLine.png'
import {handle_facebook_login} from '../credentials/thirdparty/HandleFacebook'

class Login extends Component {

    constructor(props){
        super(props);
        this.title = "Login.js";
        this.state = {
            user_email:'',
            password:'',
            err_msg: "",
            success_msg:""
        };
    }


    goto_signup(){
        ReactDOM.render(<SignUp />, document.getElementById('root'));
    }


    handle_login_button(event) {
        event.preventDefault(); /* to make react happy */

        firebase.auth().signInWithEmailAndPassword(this.state.user_email, this.state.password) /* login with firebase */

            /* handles login success */
            .then(function(){
                this.setState({
                   success_msg:"login success!",
                   err_msg:""
                });
            }.bind(this))

            /* handles failure, show err message*/
            .catch(function(error){
                this.setState({
                    err_msg:error.message
                });
            }.bind(this));

    }

    handle_facebook(event) {
        event.preventDefault();

        handle_facebook_login( function(error, user) {
            if (error) {
                alert("user is null, message: " + error.message);
                this.setState({
                    err_msg:error.message
                });

            // TODO somehow this chunk still execute when there is an error
            } else {

                alert("Logging in... user.providerData: " + user.providerData);
                user.providerData.forEach(function (profile) {
                    alert("Sign-in provider: " + profile.providerId + "Provider-specific UID: " + profile.uid
                        + "  Name: " + profile.displayName
                        + "  Email: " + profile.email
                        + "  Photo URL: " + profile.photoURL);
                });

                this.setState({
                    success_msg:"login success!",
                    err_msg:""
                });

                // TODO somehow the website render<UserSchedule/> automatically without the following
                //ReactDOM.render(<UserSchedule/>, document.getElementById('root'));
            }
        }.bind(this));
    }

    render() {
        return(

            <div className="body">
                <div className="mid-container">

                    <div className="mid-column-left">
                        <img className="image-strip"
                             src="https://umad.com/img/2015/7/city-light-blur-wallpaper-background-2709-2855-hd-wallpapers.jpg"
                             alt="left-strip"/>
                    </div>

                    <div className="mid-column-right">
                        <div className="right-middle" align={"center"}>

                            <div className="logo"> FriendZone </div>
                            <br/>

                            <div className="subtitle-text">
                                Use your email and password to log in to FriendZone.
                            </div>
                            <br/>

                            <div className="email-password-container">
                                <div className="email-password-left" align={"right"}>
                                    <text className="label-text"> Email </text>
                                    <br/>
                                    <br/>
                                    <text className="label-text"> Password </text>
                                </div>

                                <div className="email-password-right" align={"left"}>
                                    <input className="transparent-text-box" type="text"
                                           value={this.state.user_email}
                                           onChange={e=> this.setState({user_email: e.target.value})}/>
                                    <br/>
                                    <br/>
                                    <input className="transparent-text-box" type={"password"}
                                           value={this.state.password}
                                           onChange={ e=> this.setState({password: e.target.value})}/>
                                </div>
                            </div>

                            <br/>
                            <br/>
                            <br/>

                            <div className="error-message">{this.state.err_msg}</div>

                            <button className="button-text"
                                  onClick={this.handle_login_button.bind(this)}>
                                Log in
                            </button>
                            <br/>
                            <img className="separator" src={blue_line} alt=""/>
                            <br/>

                            <div className="subtitle-text">Or, log in with</div>
                            <img src={gmail_icon} alt=""/>
                            <button onClick={this.handle_facebook.bind(this)}>
                                <img src={facebook_icon} alt=""/>
                            </button>
                            <br/>
                            <br/>

                            <button className="button-text"
                                  onClick={this.goto_signup.bind(this)}>
                                Don't have an account? Sign up here.
                            </button>
                            <br/>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;