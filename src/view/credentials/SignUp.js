import React, {Component} from 'react';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import Login from './Login';
import InitProfile from "../profile/InitProfile";
import facebook_icon from '../../image/FacebookIcon.png'
import google_icon from '../../image/GoogleIcon.png'
import {handle_third_party_auth} from './thirdparty/HandleThirdParty'

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_email:'',
            password:'',
            err_msg: "",
            success_msg:""
        };
        this.title = "SignUp.js";
    }


    goto_login() {
        ReactDOM.render(<Login />, document.getElementById('root'));
    }

    handle_signup_button(event) {
        event.preventDefault(); /* make react happy */

        firebase.auth().createUserWithEmailAndPassword(this.state.user_email, this.state.password) /*create account*/

            /* handle create success, log in, go to profile */
            .then( function() {
                this.setState({
                    success_msg:"signup success!",
                    err_msg:""
                });
                ReactDOM.render(<InitProfile />, document.getElementById('root'));
            }.bind(this) )

            /* handle create failure, show err message */
            .catch(function(error){
                // var error_code = error.code;
                var error_msg = error.message;
                this.setState({err_msg:error_msg});
            }.bind(this));
    }

    handle_third_party(authProvider) {

        handle_third_party_auth(authProvider, function(error, user) {
            if (error) {
                alert("error: " + error.message);
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

                // no need to ReactDOM render since index.js can somehow detect onAuthStateChanged
            }
        }.bind(this));
    }

    render() {
        return (

            <div align={"center"}>

                <img src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"}
                     alt={""} width={"300"}/>
                <h1>{this.title}</h1>
                <form >
                    <label>user_email </label>
                    <input type={"text"} placeholder="put user email here" value={this.state.user_email}
                           onChange={e=> this.setState({user_email: e.target.value})}/>
                    <label>{this.state.err_msg}</label>
                </form>
                <form>
                    <label>password </label>
                    <input type={"text"} placeholder="put password here" value={this.state.password}
                           onChange={ e=> this.setState({password: e.target.value})}/>
                    <label>{this.state.success_msg}</label>
                </form>
                <br/>

                <form>
                    <button onClick={this.handle_signup_button.bind(this)}>Signup and login</button>
                </form>

                {/* 3rd party log signup */}
                <div className="subtitle-text">Or, sign up with</div>
                <button className="third-party-button"
                        onClick={(e) => {e.preventDefault(); this.handle_third_party("google")}}>
                    <img src={google_icon} alt="" width='40px'/>
                </button>

                &nbsp;

                <button className="third-party-button"
                        onClick={(e) => {e.preventDefault(); this.handle_third_party("facebook")}}>
                    <img src={facebook_icon} alt="" width='40px'/>
                </button>

                <br/>
                <form>
                    <button onClick={this.goto_login.bind(this)}>goto login instead</button>
                </form>

            </div>

        );
    }
}

export default SignUp;
