import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';
import firebase from 'firebase';
import './RedirectNoEmailVerification.css'
class RedirectNoEmailVerification extends Component {
    constructor( props){
        super(props);
        this.title = 'RedirectNoEmailVerification.js'
        this.state = {
            success_msg : ""
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
        this.setState({success_msg:"Verification E-mail has been resent!" })
        let user = firebase.auth().currentUser;

        user.sendEmailVerification();



    }
    render() {
        return (
            <div class="hero-bkg-animated" align="center">
                <h2>You have not verified your e-mail yet</h2>
                <h4>Please come back when you have done so.</h4>
                <button className="buttonStyle1" onClick={this.goto_welcome}>Go back to MainPage</button>
                <button className="buttonStyle1" onClick={this.send_verification.bind(this)}>Send Verification Email</button>
                <div className="success-message-redirect">{this.state.success_msg}</div>
                <h6>--------Powered by FriendZone--------</h6>
            </div>
        )
    }
}
 export default RedirectNoEmailVerification;