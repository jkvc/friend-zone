import React, {Component} from 'react';
import firebase from 'firebase';
import ReactDOM from 'react-dom';
import Login from './Login';

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
        
        auth.sendPasswordResetEmail(emailAddress);
        alert("Password Recovery Email sent!")
    }

   
    render() {
        return (

            <div align={"center"}>

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

            </div>

        );
    }
}

export default PasswordRecovery;
