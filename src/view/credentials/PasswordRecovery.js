import React, {Component} from 'react';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import Login from './Login';
import blue_line from '../../image/BlueLine.png'
import './MainLoginSignup.css'
import './SignUp.css'
class PasswordRecovery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_email:''
        };
        this.title = "PasswordRecovery.js";
    }


    goto_login() {
        ReactDOM.render(<Login />, document.getElementById('root'));
    }

    handle_update_password(event) {
        event.preventDefault(); /* make react happy */

        var auth = firebase.auth();
        var emailAddress = this.state.user_email;
        if( emailAddress === null ){
            alert("Please provide us your Email.")
        }
        else {
            //check if provided email exists
            firebase.auth().fetchProvidersForEmail(emailAddress)
                .then(providers => {
                    if (providers.length === 0) {
                        // this email hasn't signed up yet
                        alert("Invalid Email. Please try again.")
                    } else {
                        // has signed up
                        auth.sendPasswordResetEmail(emailAddress);
                        alert("Password Recovery Email sent!")
                    }
                });


        }
    }

   
    render() {
        return (

            /*<div align={"center"}>

                <img src={"https://res.cloudinary.com/teepublic/image/private/s--8-dGDDZg--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1470902298/production/designs/627022_1.jpg"}
                     alt={""} width={"300"}/>
                <h1>{this.title}</h1>
                <form >
                    <label>user_email </label>
                    <input type={"text"} placeholder="enter your email" value={this.state.user_email}
                           onChange={e=> this.setState({user_email: e.target.value})}/>
                    <label>{this.state.password_action_msg}</label>
                </form>
                <br/>

                <form>
                    <button onClick={this.handle_update_password.bind(this)}>Send Password Recovery E-mail</button>
                </form>

         

                <br/>
                <form>
                    <button onClick={this.goto_login.bind(this)}>Go To Login</button>
                </form>

            </div>*/
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


                            <br/>

                            <form >
                                <div className="email-password-container">
                                    <div className="email-password-left" align={"right"}>
                                        <text className="label-text"> Email:  </text>
                                        <br/>
                                        <br/>

                                    </div>

                                    <div className="email-password-right" align={"left"}>
                                        <input className="transparent-text-box" type="text"
                                               value={this.state.user_email}
                                               onChange={e=> this.setState({user_email: e.target.value})}/>


                                        <label>{this.state.success_msg}</label>

                                    </div>
                                    <br/>
                                    <br/>

                                </div>
                                <div className="wrapper">
                                    <div className="error-message">{this.state.err_msg}</div>
                                    <button className="button-text"onClick={this.handle_update_password.bind(this)}>Send Password Recovery E-mail</button>
                                    <br/>
                                    <img className="separator" src={blue_line} alt=""/>
                                    <br/>
                                    <button className="button-text" onClick={this.goto_login.bind(this)}>Go Back to Log in</button>
                                    <br/>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default PasswordRecovery;
