import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp';
import firebase from 'firebase';


class Main extends Component{

    constructor(props){

        /*the following is firebase config*/
        var config = {
            apiKey: "AIzaSyABmBOMLTEGtBLrjkwcDu9ab0ExE208R-4",
            authDomain: "friend-zone-9219b.firebaseapp.com",
            databaseURL: "https://friend-zone-9219b.firebaseio.com",
            projectId: "friend-zone-9219b",
            storageBucket: "",
            messagingSenderId: "1002501074461"
        };
        firebase.initializeApp(config);
        /*the above is firebase config*/

        super(props);
        this.title = "Main.js";
    }

    goto_signup(){
        ReactDOM.render(<SignUp />, document.getElementById('root'));
    }

    render(){
        return(
            <div>
                <h1>{this.title}</h1>

                <form>
                    <button onClick={this.goto_signup.bind(this)}>Sign Up</button>
                </form>

            </div>
        );
    }
}

export default Main;