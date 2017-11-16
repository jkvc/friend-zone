import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import UserProfile from '../profile/UserProfile';
import SignUp from './SignUp';
import './MainLoginSignup.css'
import './Login.css'
import facebook_icon from '../../image/FacebookIcon.png'
import gmail_icon from '../../image/GmailIcon.png'
import blue_line from '../../image/BlueLine.png'

class Login extends Component{

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


    handle_login_button(event){
        event.preventDefault(); /* to make react happy */

        firebase.auth().signInWithEmailAndPassword(this.state.user_email, this.state.password) /* login with firebase */

            /* handles login success */
            .then(function(){
                this.setState({
                   success_msg:"login success!",
                   err_msg:""
                });
                ReactDOM.render(<UserProfile />, document.getElementById('root'))
            }.bind(this))

            /* handles failure, show err message*/
            .catch(function(error){
                this.setState({
                    err_msg:error.message
                });
            }.bind(this));
    }

    handle_facebook_login() {


        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().useDeviceLanguage();
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function(result) {

            // This gives you a Facebook access token. you can use it to access the facebook api.
            //var token = result.credential.accessToken; // result.credential is null

            // the signed-in user info.
            var user = result.user;

            if (user != null) {
                alert("user.providerData: " + user.providerData);
                user.providerData.forEach(function (profile) {
                    alert("Sign-in provider: "+profile.providerId);
                    alert("  Provider-specific UID: "+profile.uid);
                    alert("  Name: "+profile.displayName);
                    alert("  Email: "+profile.email);
                    alert("  Photo URL: "+profile.photoURL);
                });
            } else {
                alert("user is null");
            }

        }).catch(function(error) {
            throw error;
            /*
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            */
        });

    }

    render(){
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
                            <button onClick={this.handle_facebook_login.bind(this)}>
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