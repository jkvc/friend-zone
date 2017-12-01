import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';
import firebase from 'firebase';
import {lookup_profile_by_user_id} from "../../dao/ProfileManager";

class RedirectNoEmailVerification extends Component {
    constructor( props){
        super(props);
    }
    goto_welcome(){
        firebase.auth().signOut()
            .then(function () {
                ReactDOM.render(<Welcome/>, document.getElementById('root'));
            })
            .catch(function (error) {
                alert(error.message);
            });
    }
    send_verification(){
        let user = firebase.auth().currentUser;
        user.sendEmailVerification();
        window.alert("Verification has been sent again!")


    }
    render() {
        return (
            <div>
                <h2>You have not verified your e-mail yet,</h2>
                <h3>Please come back when you have done so.</h3>
                <button onClick={this.goto_welcome}>Go back to MainPage</button>
                <button onClick={this.send_verification}>Send Verification Email</button>
            </div>
        )
    }
}
 export default RedirectNoEmailVerification;