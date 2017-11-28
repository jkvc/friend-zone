import React, {Component} from 'react';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import Login from './Login';
import InitProfile from "../profile/InitProfile";
import {handle_third_party_auth} from './thirdparty/HandleThirdParty'
import './MainLoginSignup.css'
import blue_line from '../../image/BlueLine.png'
class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_email:'',
            password:'',
            err_msg: "",
            success_msg:"",
            verify_password:""
        };
        this.title = "SignUp.js";
    }


    goto_login() {
        ReactDOM.render(<Login />, document.getElementById('root'));
    }

    handle_signup_button(event) {
        event.preventDefault(); /* make react happy */

        // Check password strength
        let uppercase_count = 0;
        let lowercase_count = 0;
        let numeric = 0;
        let total = 0;
        let password = this.state.password;

        for (let i = 0; i < password.length; i++)
        {
            if (password[i] >= 'A' && password[i] <= 'Z')
            {
                uppercase_count++;
            }
            else if (password[i] >= 'a' && password[i] <= 'z')
            {
                lowercase_count++;
            }
            else if (password[i] >= '0' && password[i] <= '9')
            {
                numeric++;
            }
            total++;
        }

        // Check if they are valid passwords or not
        if (uppercase_count < 1)
        {
            let error_msg = "There must be at least one uppercase letter in the password";
            this.setState({err_msg:error_msg, password:"", verify_password:""});
            return;
        }
        else if (lowercase_count < 1)
        {
            let error_msg = "There must be at least one lowercase letter in the password";
            this.setState({err_msg:error_msg, password:"", verify_password:""});
            return;
        }
        else if (numeric< 1)
        {
            let error_msg = "There must be at least one number in the password";
            this.setState({err_msg:error_msg, password:"", verify_password:""});
            return;
        }
        else if (total < 8)
        {
            let error_msg = "The password is not long enough";
            this.setState({err_msg:error_msg, password:"", verify_password:""});
            return;
        }
        else if (password !== this.state.verify_password)
        {
            let error_msg = "The passwords entered do not match each other";
            this.setState({err_msg:error_msg, password:"", verify_password:""});
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.user_email, this.state.password) /*create account*/

            /* handle create success, log in, go to profile */
            .then( function() {
                this.setState({
                    success_msg:"signup success!",
                    err_msg:""
                });

                //send email verification
                firebase.auth().onAuthStateChanged(function once(user) {
                    if(user.emailVerified === false ) {
                        window.alert("Confirmation email sent!");
                        user.sendEmailVerification();
                    }
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

    handle_keyPress(event)
    {
        if (event.key === 'Enter')
        {
            this.handle_signup_button(event);
        }
    }

   render() {
       /* return (

            <div align={"center"}>
                <h1>{this.title}</h1>
                <form >
                    <label>User email:  </label>
                    <input type={"text"} placeholder="put user email here" value={this.state.user_email}
                           onChange={e=> this.setState({user_email: e.target.value})}/>
                    {/*<label>{this.state.err_msg}</label> */
                /*</form>
                <form>
                    <label>Password:  </label>
                    <input type={"text"} placeholder="put password here" value={this.state.password}
                           onChange={ e=> this.setState({password: e.target.value})}/>
                    <label>{this.state.success_msg}</label>
                </form>
                <form>
                    <label>Verify Password:  </label>
                    <input type={"text"} placeholder="Type password again" value={this.state.verify_password}
                           onChange={ e=> this.setState({verify_password: e.target.value})}/>
                    <label>{this.state.success_msg}</label>
                </form>
                <br/>
                <h4> {this.state.err_msg} </h4>

                <br/>

                <form>
                    <button onClick={this.handle_signup_button.bind(this)}>Signup and login</button>
                </form>



                <br/>
                <form>
                    <button onClick={this.goto_login.bind(this)}>goto login instead</button>
                </form>

            </div>

        );*/
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
                               Get your Friendzone account and see who is also in your class!
                           </div>
                           <br/>

                           <form onKeyPress={this.handle_keyPress.bind(this)}>
                               <div className="email-password-container">
                                   <div className="email-password-left" align={"right"}>
                                       <text className="label-text"> Email:  </text>
                                       <br/>
                                       <br/>
                                       <text className="label-text"> Password: </text>
                                       <br/>
                                       <br/>
                                       <text className="label-text"> Verify Password: </text>
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
                                       <br/>
                                       <br/>
                                       <input className="transparent-text-box" type={"password"}
                                              value={this.state.verify_password}
                                              onChange={ e=> this.setState({verify_password: e.target.value})}/>
                                       <label>{this.state.success_msg}</label>
                                   </div>

                               </div>
                           </form>

                           <br/>
                           <div className="error-message">{this.state.err_msg}</div>
                           <br/>
                               <h4>  </h4>
                                   <button className="button-text" onClick={this.handle_signup_button.bind(this)}>Sign up and Log In</button>
                               <br/>
                               <img className="separator" src={blue_line} alt=""/>
                               <br/>
                                   <button className="button-text" onClick={this.goto_login.bind(this)}>Go Back to Log in</button>
                               <br/>
                               <p className="thirdpartymenssage">----You can log in with third party account on log in page----</p>
                       </div>
                   </div>
               </div>
           </div>

       )
    }

}

export default SignUp;
