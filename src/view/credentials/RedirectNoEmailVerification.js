import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';
import firebase from 'firebase';
import './RedirectNodEmailVerification.css'
class RedirectNoEmailVerification extends Component {
    constructor( props){
        super(props);
        this.state = {
            title: 'RedirectNoEmailVerification.js'
        }
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
            <div class="hero-bkg-animated" align="center">
                <h2>You have not verified your e-mail yet,</h2>
                <h3>Please come back when you have done so.</h3>
                <button className="buttonStyle1" onClick={this.goto_welcome}>Go back to MainPage</button>
                <button className="buttonStyle1" onClick={this.send_verification}>Send Verification Email</button>
                <h4>--------Powered by FriendZone--------</h4>
            </div>
        )
    }
}
 export default RedirectNoEmailVerification;